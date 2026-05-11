"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { getProductPath } from "@/lib/productRouting";

function normalize(q) {
  return (q || "").toString().trim().toLowerCase();
}

function getSearchResults(query) {
  const q = normalize(query);
  if (!q) return { collections: [], products: [] };

  const collections = CATEGORIES.filter((c) => {
    return (c.name_en || "").toLowerCase().includes(q) || (c.slug || "").toLowerCase().includes(q);
  }).slice(0, 6);

  const products = PRODUCTS.filter((p) => {
    const names = [p.name_en, p.name_te, p.name_hi].filter(Boolean).join(" ").toLowerCase();
    return names.includes(q);
  }).slice(0, 8);

  return { collections, products };
}

function highlightMatch(text = "", q = "") {
  const nq = normalize(q);
  if (!nq) return text;
  const lower = (text || "").toLowerCase();
  const idx = lower.indexOf(nq);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + nq.length);
  const after = text.slice(idx + nq.length);
  return (
    <>
      {before}
      <span style={{ background: "#f5e6c9", color: "#2d0a1c", fontWeight: 600 }}>{match}</span>
      {after}
    </>
  );
}

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ collections: [], products: [] });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const timer = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    function onClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }

    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const r = getSearchResults(query);
      setResults(r);
      setLoading(false);
      setOpen(Boolean(query));
      setActiveIndex(-1);
    }, 300);

    return () => clearTimeout(timer.current);
  }, [query]);

  const items = [...results.collections.map((c) => ({ type: "collection", id: c.slug, label: c.name_en })), ...results.products.map((p) => ({ type: "product", id: p.id, label: p.name_en }))];

  function onKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && items[activeIndex]) {
        const it = items[activeIndex];
        if (it.type === "collection") {
          router.push(`/collections?category=${it.id}`);
        } else {
          const p = PRODUCTS.find((x) => x.id === it.id);
          if (p) router.push(getProductPath(p));
        }
        setOpen(false);
      }
    }
  }

  return (
    <div ref={ref} style={{ position: "relative", minWidth: 220 }}>
      <div style={{ position: "relative" }}>
        <input
          aria-label="Search products and collections"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query) setOpen(true); }}
          onKeyDown={onKeyDown}
          placeholder="Search products, categories..."
          style={{
            padding: "8px 36px 8px 34px",
            borderRadius: 20,
            border: "0.5px solid #d4b896",
            background: "#fff9f2",
            color: "#2d0a1c",
            outline: "none",
            width: "100%",
            fontSize: 13,
          }}
        />

        {query && (
          <button
            onClick={() => { setQuery(""); setResults({ collections: [], products: [] }); setOpen(false); }}
            aria-label="Clear search"
            style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#b09080" }}
          >
            ✕
          </button>
        )}

        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b09080" strokeWidth="2" strokeLinecap="round" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {open && (
        <div style={{ position: "absolute", left: 0, right: 0, marginTop: 8, background: "#fff9f2", border: "0.5px solid #e8d5b0", borderRadius: 8, zIndex: 300, boxShadow: "0 6px 18px rgba(20,10,6,0.08)", maxHeight: 360, overflow: "auto" }}>
          <div style={{ padding: 10 }}>
            {loading ? (
              <div style={{ color: "#b09080" }}>Loading…</div>
            ) : (
              <>
                <div style={{ fontSize: 12, color: "#8b6320", marginBottom: 6 }}>Collections</div>
                {results.collections.length ? results.collections.map((c, i) => (
                  <Link key={c.slug} href={`/collections?category=${c.slug}`} prefetch={true} onClick={() => setOpen(false)} style={{ display: "block", padding: "8px 10px", borderRadius: 6, textDecoration: "none", color: "#2d0a1c", background: activeIndex === i ? "#f5efe4" : "transparent" }}>
                    {highlightMatch(c.name_en, query)}
                  </Link>
                )) : (
                  <div style={{ color: "#b09080", padding: "6px 0 12px" }}>No collections found</div>
                )}

                <div style={{ height: 10 }} />

                <div style={{ fontSize: 12, color: "#8b6320", marginBottom: 6 }}>Products</div>
                {results.products.length ? results.products.map((p, idx) => {
                  const index = results.collections.length + idx;
                  return (
                    <Link key={p.id} href={getProductPath(p)} prefetch={true} onClick={() => setOpen(false)} style={{ display: "block", padding: "8px 10px", borderRadius: 6, textDecoration: "none", color: "#2d0a1c", background: activeIndex === index ? "#f5efe4" : "transparent" }}>
                      <div style={{ fontSize: 13 }}>{highlightMatch(p.name_en, query)}</div>
                      <div style={{ fontSize: 11, color: "#9a6050" }}>₹{p.price?.toLocaleString("en-IN")}</div>
                    </Link>
                  );
                }) : (
                  <div style={{ color: "#b09080", padding: "6px 0 12px" }}>No products found</div>
                )}

                {results.collections.length === 0 && results.products.length === 0 && !loading && (
                  <div style={{ paddingTop: 8, color: "#b09080" }}>No results found</div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
