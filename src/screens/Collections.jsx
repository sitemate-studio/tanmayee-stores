"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/store/Breadcrumbs";
import CollectionProductCard from "@/components/collections/CollectionProductCard";
import CategorySelectGrid from "@/components/collections/CategorySelectGrid";
import PriceSlider from "@/components/collections/PriceSlider";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { COLLECTION_GRID_CLASS } from "@/components/collections/collectionClasses";

const PILL_STYLE = (active) => ({
  padding: "7px 16px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 500,
  whiteSpace: "nowrap",
  cursor: "pointer",

  background: active
    ? "#2d0a1c"
    : "#fff9f2",

  color: active
    ? "#f0c96e"
    : "#6b3a2a",

  border: active
    ? "0.5px solid #2d0a1c"
    : "0.5px solid #d4b896",
});

export default function Collections({ searchParams = {} }) {
  // router replaced by Link-based navigation for faster client transitions
  const activeCategory = searchParams.category;
  const showProducts = Boolean(activeCategory);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [quickFilter, setQuickFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [priceRangeActive, setPriceRangeActive] = useState(false);

  useEffect(() => {
    if (!showProducts) {
      setSearch("");
      setSortBy("default");
      setShowSort(false);
      setShowFilters(false);
      setQuickFilter("all");
      setPriceRange([0, 5000]);
      setPriceRangeActive(false);
      return;
    }

    setSearch("");
    setSortBy("default");
    setShowSort(false);
    setShowFilters(false);
    setQuickFilter("all");
    setPriceRangeActive(false);
  }, [showProducts, activeCategory]);

  const products = PRODUCTS;

  const priceBounds =
    useMemo(() => {
      if (
        !products.length
      ) {
        return [
          0,
          5000,
        ];
      }

      const prices =
        products.map(
          (p) =>
            p.price ||
            0
        );

      return [
        Math.min(
          ...prices
        ),
        Math.max(
          ...prices
        ),
      ];
    }, [products]);

  const filtered =
    useMemo(() => {
      let result = [
        ...products,
      ];

      if (!showProducts) {
        return [];
      }

      result = result.filter((p) => p.category === activeCategory);

      if (search.trim()) {
        const q = search.toLowerCase();
        result = result.filter(
          (p) =>
            (p.name_en || "").toLowerCase().includes(q) ||
            (p.name_te || "").toLowerCase().includes(q) ||
            (p.name_hi || "").toLowerCase().includes(q)
        );
      }

      if (
        quickFilter ===
        "new"
      ) {
        result =
          result.filter(
            (p) =>
              p.is_new_arrival
          );
      }

      if (
        quickFilter ===
        "in_stock"
      ) {
        result =
          result.filter(
            (p) =>
              p.in_stock
          );
      }

      if (
        priceRangeActive
      ) {
        result =
          result.filter(
            (p) =>
              (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]
          );
      }

      if (sortBy === "price_asc") result.sort((a, b) => (a.price || 0) - (b.price || 0));
      if (sortBy === "price_desc") result.sort((a, b) => (b.price || 0) - (a.price || 0));
      if (sortBy === "name_asc") result.sort((a, b) => (a.name_en || "").localeCompare(b.name_en || ""));
      if (sortBy === "newest") result.sort((a, b) => (b.is_new_arrival ? 1 : 0) - (a.is_new_arrival ? 1 : 0));

      return result;
    }, [
      products,
      activeCategory,
      showProducts,
      search,
      quickFilter,
      sortBy,
      priceRange,
      priceRangeActive,
    ]);

  const activeLabel =
    showProducts
      ? CATEGORIES.find((c) => c.slug === activeCategory)?.name_en || "Collections"
      : "Collections";

  const sortLabels = {
    default: "Default",
    price_asc: "Price: Low to High",
    price_desc: "Price: High to Low",
    name_asc: "Name A–Z",
    newest: "New Arrivals First",
  };

  return (
    <div
      style={{
        background:
          "#fdf6ed",
        minHeight:
          "100vh",
      }}
    >
      <div style={{ background: "#fdf6ed", padding: "18px 24px 0", borderBottom: "0.5px solid #e8d5b0" }}>
        <Breadcrumbs
          style={{ marginBottom: 12 }}
          items={[{ label: "Home", to: "/" }, { label: "Collections" }]}
        />

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingBottom: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#2d0a1c", letterSpacing: -0.3 }}>{activeLabel}</div>
          {showProducts ? (
            <div style={{ fontSize: 11, color: "#b09080", marginBottom: 2 }}>{filtered.length} items</div>
          ) : (
            <div style={{ fontSize: 11, color: "#b09080", marginBottom: 2 }}>{CATEGORIES.length} categories</div>
          )}
        </div>
      </div>

      {!showProducts ? (
        <CategorySelectGrid />
      ) : (
        <>
          <div style={{ background: "#fdf6ed", padding: "10px 24px", borderBottom: "0.5px solid #e8d5b0" }}>
            <Link
              href="/collections"
              className="text-sm text-primary font-medium underline"
              style={{ fontFamily: "inherit", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              prefetch={true}
            >
              ← Back to categories
            </Link>
          </div>

      <div
        style={{
          background: "#fdf6ed",
          padding: "10px 24px",
          borderBottom: "0.5px solid #e8d5b0",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b09080"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{
              width: "100%",
              padding: "8px 12px 8px 34px",
              border: "0.5px solid #d4b896",
              borderRadius: 20,
              fontSize: 12,
              background: "#fff9f2",
              color: "#2d0a1c",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#b09080",
                fontSize: 14,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters((f) => !f)}
          style={{
            padding: "8px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            background: showFilters ? "#2d0a1c" : "#fff9f2",
            color: showFilters ? "#f0c96e" : "#6b3a2a",
            border: showFilters ? "0.5px solid #2d0a1c" : "0.5px solid #d4b896",
            display: "flex",
            alignItems: "center",
            gap: 5,
            whiteSpace: "nowrap",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filters
        </button>
      </div>

      {/* Quick filter pills - always visible above the grid */}
      {showProducts && (
        <div style={{ padding: "12px 24px", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 10, color: "#8b6320", letterSpacing: 2, textTransform: "uppercase", marginRight: 8 }}>Filter</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[{ val: "all", label: "All" }, { val: "new", label: "✦ New Arrivals" }, { val: "in_stock", label: "In Stock" }].map((f) => (
              <button key={f.val} onClick={() => setQuickFilter(f.val)} style={PILL_STYLE(quickFilter === f.val)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {showFilters && (
        <div style={{ background: "#fff9f2", borderBottom: "0.5px solid #e8d5b0", padding: "16px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="max-[500px]:!grid-cols-1">
            <div>
              <div style={{ fontSize: 10, color: "#8b6320", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
                Filter by
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[{ val: "all", label: "All" }, { val: "new", label: "✦ New Arrivals" }, { val: "in_stock", label: "In Stock" }].map((f) => (
                  <button key={f.val} onClick={() => setQuickFilter(f.val)} style={PILL_STYLE(quickFilter === f.val)}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 10, color: "#8b6320", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
                Sort by
              </div>
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowSort((s) => !s)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "0.5px solid #d4b896",
                    background: "#fdf6ed",
                    color: "#2d0a1c",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {sortLabels[sortBy] || sortLabels.default}
                </button>
                {showSort && (
                  <div style={{ position: "absolute", left: 0, right: 0, top: "calc(100% + 6px)", background: "#fff9f2", border: "0.5px solid #e8d5b0", borderRadius: 10, overflow: "hidden", zIndex: 20 }}>
                    {Object.entries(sortLabels).map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => {
                          setSortBy(value);
                          setShowSort(false);
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "10px 14px",
                          background: sortBy === value ? "#f5efe4" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 12,
                          color: "#2d0a1c",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 10, color: "#8b6320", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
              Price range
            </div>
            <PriceSlider
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={priceRange}
              onChange={setPriceRange}
              active={priceRangeActive}
              onActiveChange={setPriceRangeActive}
            />
          </div>
        </div>
      )}

      <div style={{ padding: "16px 24px 28px" }}>
        {filtered.length > 0 ? (
          <div className={COLLECTION_GRID_CLASS}>
            {filtered.map((product, index) => (
              <CollectionProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "#b09080", padding: "40px 0" }}>
            No products found.
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
}
