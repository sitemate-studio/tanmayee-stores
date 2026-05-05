

import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, getProductName } from "@/lib/storeData";
import { useLang } from "@/context/LanguageContext";
import { PRODUCTS } from "@/data/products";

const CARD_COLORS = [
  "#fbeaf2",
  "#eeeaf8",
  "#eaf5ee",
  "#faf0e4",
  "#fbeaf2",
  "#eaf5f5",
  "#f0eaf8",
  "#eaf5ee",
];

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

function ProductCard({
  product,
  index,
}) {
  const { lang } = useLang();

  const primaryName =
    getProductName(product, lang);

  const imgSrc =
    product.images?.[0];

  const bg =
    CARD_COLORS[
      index % CARD_COLORS.length
    ];

  return (
    <Link
      to={`/product/${product.id}`}
      style={{
        background: "#fff9f2",
        borderRadius: 12,
        overflow: "hidden",
        border:
          "0.5px solid #e8d5b0",
        textDecoration: "none",
        display: "block",
      }}
    >
      <div
        style={{
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!product.in_stock && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              background:
                "rgba(253,246,237,0.7)",
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "#9a6050",
                letterSpacing: 1,
                textTransform:
                  "uppercase",
                border:
                  "0.5px solid #d4b896",
                padding:
                  "4px 10px",
                borderRadius: 10,
                background:
                  "#fdf6ed",
              }}
            >
              Out of stock
            </span>
          </div>
        )}

        {product.is_new_arrival &&
          product.in_stock && (
            <div
              style={{
                position:
                  "absolute",
                top: 8,
                left: 8,
                background:
                  "#2d0a1c",
                color:
                  "#f0c96e",
                fontSize: 9,
                padding:
                  "3px 8px",
                borderRadius: 10,
                fontWeight: 500,
                zIndex: 2,
              }}
            >
              New
            </div>
          )}

        {imgSrc ? (
          <img
            src={imgSrc}
            alt={
              product.name_en
            }
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit:
                "cover",
              opacity:
                product.in_stock
                  ? 1
                  : 0.5,
            }}
          />
        ) : (
          <div
            style={{
              fontSize: 40,
              color:
                "#c9a84c",
            }}
          >
            ✦
          </div>
        )}
      </div>

      <div
        style={{ padding: "10px 10px 0", opacity: product.in_stock ? 1 : 0.6 }}
      >
        <span
          style={{
            fontSize: 13,
            color: "#2d0a1c",
            display: "block",
            lineHeight: 1.3,
          }}
        >
          {primaryName}
        </span>

        {lang === "en" && product.name_te && (
          <span style={{ fontSize: 10, color: "#b09080", display: "block", marginTop: 2 }}>
            {product.name_te}
          </span>
        )}

        <div
          style={{
            fontSize: 13,
            color: "#8b6320",
            fontWeight: 600,
            marginTop: 6,
            paddingBottom: 10,
          }}
        >
          ₹
          {product.price?.toLocaleString(
            "en-IN"
          )}
        </div>
      </div>
    </Link>
  );
}

function PriceSlider({
  min,
  max,
  value,
  onChange,
}) {
  const rangeRef =
    useRef(null);

  const handleMin = (e) => {
    const v = Math.min(
      Number(
        e.target.value
      ),
      value[1] - 1
    );

    onChange([
      v,
      value[1],
    ]);
  };

  const handleMax = (e) => {
    const v = Math.max(
      Number(
        e.target.value
      ),
      value[0] + 1
    );

    onChange([
      value[0],
      v,
    ]);
  };

  const minPct =
    ((value[0] - min) /
      (max - min)) *
    100;

  const maxPct =
    ((value[1] - min) /
      (max - min)) *
    100;

  return (
    <div style={{ padding: "0 4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: "#8b6320", fontWeight: 600 }}>
          ₹{value[0].toLocaleString("en-IN")}
        </span>
        <span style={{ fontSize: 11, color: "#8b6320", fontWeight: 600 }}>
          ₹{value[1].toLocaleString("en-IN")}
        </span>
      </div>

      <div ref={rangeRef} style={{ position: "relative", height: 20 }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 0,
            right: 0,
            height: 4,
            background: "#e8d5b0",
            borderRadius: 2,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: `${minPct}%`,
            right: `${100 - maxPct}%`,
            height: 4,
            background: "#c9a84c",
            borderRadius: 2,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleMin}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            zIndex: 2,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleMax}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            zIndex: 3,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${minPct}%`,
            transform: "translate(-50%, -50%)",
            width: 16,
            height: 16,
            background: "#2d0a1c",
            border: "2px solid #c9a84c",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${maxPct}%`,
            transform: "translate(-50%, -50%)",
            width: 16,
            height: 16,
            background: "#2d0a1c",
            border: "2px solid #c9a84c",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

export default function Collections() {
  const urlParams = new URLSearchParams(window.location.search);
  const [activeCategory, setActiveCategory] = useState(urlParams.get("category") || "all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [quickFilter, setQuickFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [priceRangeActive, setPriceRangeActive] = useState(false);
  const { lang } = useLang();

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

      if (
        activeCategory !==
        "all"
      ) {
        result =
          result.filter(
            (p) =>
              p.category ===
              activeCategory
          );
      }

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
      search,
      quickFilter,
      sortBy,
      priceRange,
      priceRangeActive,
    ]);

  const activeLabel =
    activeCategory === "all"
      ? "All Collections"
      : CATEGORIES.find((c) => c.slug === activeCategory)?.name_en || "Collections";

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
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Link to="/" style={{ fontSize: 11, color: "#8b6320", textDecoration: "none" }}>
            Home
          </Link>
          <span style={{ fontSize: 11, color: "#d4b896" }}>›</span>
          <span style={{ fontSize: 11, color: "#b09080" }}>Collections</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingBottom: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#2d0a1c", letterSpacing: -0.3 }}>{activeLabel}</div>
          <div style={{ fontSize: 11, color: "#b09080", marginBottom: 2 }}>{filtered.length} items</div>
        </div>
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
          <button onClick={() => setActiveCategory("all")} style={PILL_STYLE(activeCategory === "all")}>
            All
          </button>

          {CATEGORIES.map((cat) => {
            const name =
              lang === "te" && cat.name_te ? cat.name_te : lang === "hi" && cat.name_hi ? cat.name_hi : cat.name_en;
            return (
              <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)} style={PILL_STYLE(activeCategory === cat.slug)}>
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
              setActiveCategory("all");
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
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, padding: "20px 24px" }}
          className="max-[700px]:!grid-cols-2 max-[700px]:!gap-3 max-[700px]:!p-4"
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
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
    </div>
  );
}