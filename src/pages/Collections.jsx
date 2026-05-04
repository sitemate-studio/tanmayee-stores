

import {
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  CATEGORIES,
  getProductName,
} from "@/lib/storeData";

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
        style={{
          padding: 10,
          opacity:
            product.in_stock
              ? 1
              : 0.6,
        }}
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

        <div
          style={{
            fontSize: 13,
            color: "#8b6320",
            fontWeight: 600,
            marginTop: 6,
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
    <div
      ref={rangeRef}
      style={{
        position:
          "relative",
        height: 20,
      }}
    >
      <div
        style={{
          position:
            "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 4,
          transform:
            "translateY(-50%)",
          background:
            "#e8d5b0",
          borderRadius: 2,
        }}
      />

      <div
        style={{
          position:
            "absolute",
          top: "50%",
          left: `${minPct}%`,
          right: `${
            100 -
            maxPct
          }%`,
          height: 4,
          transform:
            "translateY(-50%)",
          background:
            "#c9a84c",
          borderRadius: 2,
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={
          handleMin
        }
        style={{
          position:
            "absolute",
          width: "100%",
          opacity: 0,
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={
          handleMax
        }
        style={{
          position:
            "absolute",
          width: "100%",
          opacity: 0,
        }}
      />
    </div>
  );
}

export default function Collections() {
  const { lang } =
    useLang();

  const [
    searchParams,
  ] =
    useSearchParams();

  const [
    activeCategory,
    setActiveCategory,
  ] = useState(
    searchParams.get(
      "category"
    ) || "all"
  );

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    showFilters,
    setShowFilters,
  ] =
    useState(false);

  const [
    showSort,
    setShowSort,
  ] =
    useState(false);

  const [
    quickFilter,
    setQuickFilter,
  ] =
    useState("all");

  const [
    sortBy,
    setSortBy,
  ] =
    useState("default");

  const [
    priceRange,
    setPriceRange,
  ] =
    useState([
      0,
      5000,
    ]);

  const [
    priceRangeActive,
    setPriceRangeActive,
  ] =
    useState(false);

  const products =
    PRODUCTS;

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

  useEffect(() => {
    setPriceRange(
      priceBounds
    );
  }, [
    priceBounds,
  ]);

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

      if (
        search.trim()
      ) {
        const q =
          search.toLowerCase();

        result =
          result.filter(
            (p) =>
              (
                p.name_en ||
                ""
              )
                .toLowerCase()
                .includes(
                  q
                )
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
              p.price >=
                priceRange[0] &&
              p.price <=
                priceRange[1]
          );
      }

      if (
        sortBy ===
        "price_asc"
      ) {
        result.sort(
          (
            a,
            b
          ) =>
            a.price -
            b.price
        );
      }

      if (
        sortBy ===
        "price_desc"
      ) {
        result.sort(
          (
            a,
            b
          ) =>
            b.price -
            a.price
        );
      }

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

  return (
    <div
      style={{
        background:
          "#fdf6ed",
        minHeight:
          "100vh",
      }}
    >
      {/* Search + Filter */}
      <div
        style={{
          padding: 20,
        }}
      >
        <input
          value={search}
          onChange={(
            e
          ) =>
            setSearch(
              e.target
                .value
            )
          }
          placeholder="Search products..."
          style={{
            width:
              "100%",
            padding: 12,
            borderRadius: 20,
            border:
              "1px solid #d4b896",
          }}
        />

        <button
          onClick={() =>
            setShowFilters(
              !showFilters
            )
          }
          style={{
            marginTop: 12,
            ...PILL_STYLE(
              showFilters
            ),
          }}
        >
          Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div
          style={{
            padding:
              "0 20px 20px",
          }}
        >
          <PriceSlider
            min={
              priceBounds[0]
            }
            max={
              priceBounds[1]
            }
            value={
              priceRange
            }
            onChange={
              (
                v
              ) => {
                setPriceRangeActive(
                  true
                );

                setPriceRange(
                  v
                );
              }
            }
          />
        </div>
      )}

      {/* Categories */}
      <div
        style={{
          display:
            "flex",
          gap: 8,
          overflowX:
            "auto",
          padding:
            "0 20px 20px",
        }}
      >
        <button
          onClick={() =>
            setActiveCategory(
              "all"
            )
          }
          style={PILL_STYLE(
            activeCategory ===
              "all"
          )}
        >
          All
        </button>

        {CATEGORIES.map(
          (cat) => (
            <button
              key={
                cat.slug
              }
              onClick={() =>
                setActiveCategory(
                  cat.slug
                )
              }
              style={PILL_STYLE(
                activeCategory ===
                  cat.slug
              )}
            >
              {lang ===
                "te" &&
              cat.name_te
                ? cat.name_te
                : cat.name_en}
            </button>
          )
        )}
      </div>

      {/* Products */}
      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
          padding: 20,
        }}
      >
        {filtered.map(
          (
            product,
            i
          ) => (
            <ProductCard
              key={
                product.id
              }
              product={
                product
              }
              index={
                i
              }
            />
          )
        )}
      </div>
    </div>
  );
}