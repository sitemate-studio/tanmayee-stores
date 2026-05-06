

import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Breadcrumbs from "@/components/store/Breadcrumbs";
import CollectionProductCard from "@/components/collections/CollectionProductCard";
import CategorySelectGrid from "@/components/collections/CategorySelectGrid";
import PriceSlider from "@/components/collections/PriceSlider";
import { useLang } from "@/context/LanguageContext";
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

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const showProducts = Boolean(activeCategory);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [quickFilter, setQuickFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [priceRangeActive, setPriceRangeActive] = useState(false);
  const { lang } = useLang();

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
            <button
              onClick={() => setSearchParams({})}
              className="text-sm text-primary font-medium underline"
              style={{ fontFamily: "inherit", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              ← Back to categories
            </button>
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#8b6320", letterSpacing: 2, textTransform: "uppercase" }}>Price range</div>
                <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#6b3a2a", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={priceRangeActive}
                    onChange={(e) => {
                      setPriceRangeActive(e.target.checked);
                      if (e.target.checked) setPriceRange(priceBounds);
                    }}
                    style={{ accentColor: "#2d0a1c" }}
                  />
                  Enable
                </label>
              </div>

              <PriceSlider
                min={priceBounds[0]}
                max={priceBounds[1]}
                value={priceRangeActive ? priceRange : priceBounds}
                onChange={(v) => {
                  setPriceRangeActive(true);
                  setPriceRange(v);
                }}
              />
            </div>
          </div>

          {(quickFilter !== "all" || priceRangeActive || search) && (
            <button
              onClick={() => {
                setQuickFilter("all");
                setPriceRangeActive(false);
                setSearch("");
              }}
              style={{
                marginTop: 14,
                fontSize: 11,
                color: "#c9a84c",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                textDecoration: "underline",
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      <div
        style={{
          background: "#fdf6ed",
          padding: "10px 24px",
          borderBottom: "0.5px solid #e8d5b0",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        <div style={{ display: "flex", gap: 8, width: "max-content" }}>
          <button onClick={() => setSearchParams({})} style={PILL_STYLE(false)}>
            All Categories
          </button>

          {CATEGORIES.map((cat) => {
            const name =
              lang === "te" && cat.name_te ? cat.name_te : lang === "hi" && cat.name_hi ? cat.name_hi : cat.name_en;
            return (
              <button
                key={cat.slug}
                onClick={() => setSearchParams({ category: cat.slug })}
                style={PILL_STYLE(activeCategory === cat.slug)}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          borderBottom: "0.5px solid #e8d5b0",
          background: "#fdf6ed",
          position: "relative",
        }}
      >
        <button
          onClick={() => setShowSort((s) => !s)}
          style={{
            fontSize: 12,
            color: "#8b6320",
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3.5h12M3 7h8M5 10.5h4" stroke="#8b6320" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {sortLabels[sortBy]}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 3.5l3 3 3-3" stroke="#8b6320" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        {showSort && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 24,
              background: "#fff9f2",
              border: "0.5px solid #e8d5b0",
              borderRadius: 10,
              zIndex: 50,
              minWidth: 200,
              boxShadow: "0 4px 16px rgba(45,10,28,0.1)",
              overflow: "hidden",
            }}
          >
            {Object.entries(sortLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  setSortBy(key);
                  setShowSort(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 16px",
                  fontSize: 12,
                  color: sortBy === key ? "#2d0a1c" : "#6b3a2a",
                  fontWeight: sortBy === key ? 600 : 400,
                  background: sortBy === key ? "#f5efe4" : "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  borderBottom: "0.5px solid #f0e4d0",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {showSort && <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setShowSort(false)} />}

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 24px", color: "#b09080", fontSize: 14 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
          No products match your search.
          <br />
          <button
            onClick={() => {
              setSearch("");
              setQuickFilter("all");
              setPriceRangeActive(false);
            }}
            style={{
              marginTop: 12,
              fontSize: 12,
              color: "#c9a84c",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              textDecoration: "underline",
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className={COLLECTION_GRID_CLASS}>
          {filtered.map((product, i) => (
            <CollectionProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div style={{ padding: "4px 24px 32px" }} className="max-[480px]:!px-4">
          <div style={{ textAlign: "center", fontSize: 11, color: "#b09080", paddingBottom: 8 }}>
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      )}

        </>
      )}
    </div>
  );
}