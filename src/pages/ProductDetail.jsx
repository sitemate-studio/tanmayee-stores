import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import {
  STORE_CONFIG,
  getCategoryName,
  getProductDescription,
  getProductName,
  getWhatsAppProductURL,
} from "@/lib/storeData";
import { PRODUCTS } from "@/data/products";

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="#fff" style={{ width: 20, height: 20, flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path
      d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.43a.5.5 0 0 0 .608.61l5.7-1.49A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.887 9.887 0 0 1-5.031-1.378l-.36-.214-3.733.977.999-3.645-.235-.374A9.862 9.862 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.466 0 9.9 4.434 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z"
      fillRule="evenodd"
    />
  </svg>
);

const CARD_COLORS = ["#fbeaf2", "#eeeaf8", "#eaf5ee", "#faf0e4", "#eaf5f5", "#f0eaf8"];

export default function ProductDetail() {
  const { id } = useParams();
  const productId = id;
  const { lang, setLang } = useLang();
  const [activeImage, setActiveImage] = useState(0);

  const isLoading = false;

  const product = useMemo(() => {
    if (!productId) return null;
    return PRODUCTS.find((p) => String(p.id) === String(productId)) || null;
  }, [productId]);

  const relatedProducts = useMemo(() => {
    if (!product?.category) return [];
    return PRODUCTS.filter((p) => p.category === product.category);
  }, [product?.category]);

  useEffect(() => {
    setActiveImage(0);
  }, [productId]);

  if (isLoading) {
    return (
      <div style={{ background: "#fdf6ed", minHeight: "100vh", padding: 24 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          <div style={{ aspectRatio: "1", background: "#f5efe4", borderRadius: 12, margin: 24 }} />
          <div style={{ padding: 28 }}>
            <div style={{ height: 20, background: "#f5efe4", borderRadius: 10, width: "40%", marginBottom: 12 }} />
            <div style={{ height: 32, background: "#f5efe4", borderRadius: 10, width: "70%", marginBottom: 8 }} />
            <div style={{ height: 20, background: "#f5efe4", borderRadius: 10, width: "50%", marginBottom: 20 }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          background: "#fdf6ed",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <p style={{ fontSize: 14, color: "#b09080" }}>Product not found.</p>
        <Link to="/collections" style={{ fontSize: 13, color: "#8b6320", textDecoration: "underline" }}>
          Back to Collections
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [];
  const safeActiveImage = Math.min(activeImage, Math.max(images.length - 1, 0));
  const primaryName = getProductName(product, lang);
  const description = getProductDescription(product, lang);
  const categoryName = getCategoryName(product.category, lang);
  const waUrl = getWhatsAppProductURL(product.name_en);
  const related = relatedProducts.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <div style={{ background: "#fdf6ed", minHeight: "100vh", paddingBottom: 72 }}>
      <div style={{ padding: "14px 24px", borderBottom: "0.5px solid #e8d5b0", background: "#fdf6ed" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <Link to="/" style={{ fontSize: 11, color: "#8b6320", textDecoration: "none" }}>
            Home
          </Link>
          <span style={{ fontSize: 11, color: "#d4b896" }}>›</span>
          <Link to="/collections" style={{ fontSize: 11, color: "#8b6320", textDecoration: "none" }}>
            Collections
          </Link>
          <span style={{ fontSize: 11, color: "#d4b896" }}>›</span>
          <span style={{ fontSize: 11, color: "#b09080" }}>{product.name_en}</span>
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 1100, margin: "0 auto" }}
        className="max-[720px]:!grid-cols-1"
      >
        <div
          style={{ padding: 24, borderRight: "0.5px solid #e8d5b0" }}
          className="max-[720px]:!border-r-0 max-[720px]:!border-b max-[720px]:![border-bottom:0.5px_solid_#e8d5b0] max-[720px]:!p-4"
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "1",
              background: "#fbeaf2",
              borderRadius: 12,
              border: "0.5px solid #e8d5b0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
              overflow: "hidden",
            }}
          >
            {images.length > 0 ? (
              <img
                src={images[safeActiveImage]}
                alt={product.name_en}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <div style={{ fontSize: 60, color: "#c9a84c" }}>✦</div>
            )}
          </div>

          {images.length > 1 && (
            <div style={{ display: "flex", gap: 8 }}>
              {images.map((img, i) => (
                <div
                  key={img}
                  onClick={() => setActiveImage(i)}
                  style={{
                    flex: 1,
                    aspectRatio: "1",
                    borderRadius: 8,
                    overflow: "hidden",
                    border: safeActiveImage === i ? "1.5px solid #2d0a1c" : "0.5px solid #e8d5b0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: "28px 28px 24px" }} className="max-[720px]:!p-4">
          <Link
            to={`/collections?category=${product.category}`}
            style={{
              fontSize: 10,
              color: "#8b6320",
              letterSpacing: 3,
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: 10,
              background: "#f5efe4",
              padding: "4px 12px",
              borderRadius: 20,
              border: "0.5px solid #e8d5b0",
              textDecoration: "none",
            }}
          >
            {categoryName}
          </Link>

          <span
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "#2d0a1c",
              lineHeight: 1.3,
              display: "block",
              marginBottom: 4,
            }}
          >
            {primaryName}
          </span>

          {lang === "en" && product.name_te && (
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: 18,
                color: "#8b6320",
                display: "block",
                marginBottom: 16,
              }}
            >
              {product.name_te}
            </span>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              paddingBottom: 20,
              borderBottom: "0.5px solid #e8d5b0",
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 600, color: "#2d0a1c" }}>₹{product.price?.toLocaleString("en-IN")}</span>
            {product.is_new_arrival && (
              <span
                style={{
                  background: "#2d0a1c",
                  color: "#f0c96e",
                  fontSize: 10,
                  padding: "3px 10px",
                  borderRadius: 10,
                  fontWeight: 500,
                }}
              >
                New
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <span style={{ fontSize: 11, color: "#b09080" }}>Description in:</span>
            {[{ code: "en", label: "EN" }, { code: "te", label: "తె" }, { code: "hi", label: "हि" }].map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={{
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 12,
                  border: lang === l.code ? "0.5px solid #2d0a1c" : "0.5px solid #d4b896",
                  background: lang === l.code ? "#2d0a1c" : "#fff9f2",
                  color: lang === l.code ? "#f0c96e" : "#6b3a2a",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {description && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, color: "#4a2a1a", lineHeight: 1.8 }}>{description}</p>
            </div>
          )}

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 0", borderBottom: "0.5px solid #f0e4d0" }}>
              <span style={{ fontSize: 11, color: "#b09080", minWidth: 90, paddingTop: 1 }}>Category</span>
              <span style={{ fontSize: 12, color: "#2d0a1c", fontWeight: 500 }}>
                <Link to={`/collections?category=${product.category}`} style={{ color: "#8b6320", textDecoration: "none" }}>
                  {categoryName}
                </Link>
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 0" }}>
              <span style={{ fontSize: 11, color: "#b09080", minWidth: 90, paddingTop: 1 }}>Availability</span>
              <span style={{ fontSize: 12, color: product.in_stock ? "#3a8a4a" : "#c0a090", fontWeight: 500 }}>
                {product.in_stock ? "In stock" : "Out of stock"}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: product.in_stock ? "#3a8a4a" : "#c0a090" }} />
            <span style={{ fontSize: 12, color: product.in_stock ? "#3a8a4a" : "#c0a090", fontWeight: 500 }}>
              {product.in_stock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <div
            className="max-[720px]:hidden"
            style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}
          >
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: "#25d366",
                color: "#fff",
                border: "none",
                padding: "15px 24px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
                letterSpacing: 0.3,
              }}
            >
              {WA_ICON}
              Enquire on WhatsApp
            </a>

            <a
              href={`tel:${STORE_CONFIG.phone}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: "#fdf6ed",
                color: "#2d0a1c",
                border: "0.5px solid #c9a84c",
                padding: "13px 24px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2d0a1c"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ width: 16, height: 16, flexShrink: 0 }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z" />
              </svg>
              Call the store
            </a>

            <p style={{ fontSize: 11, color: "#b09080", textAlign: "center", lineHeight: 1.6 }}>
              WhatsApp message will be pre-filled with this product's name and price.
            </p>
          </div>
        </div>
      </div>

      <div style={{ height: 0.5, background: "#e8d5b0" }} />

      {description && (
        <>
          <div
            style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px", borderBottom: "0.5px solid #e8d5b0" }}
            className="max-[720px]:!px-4"
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: "#2d0a1c", marginBottom: 14, letterSpacing: 0.3 }}>
              About this product
            </div>
            <p style={{ fontSize: 13, color: "#4a2a1a", lineHeight: 1.9, maxWidth: 640 }}>{description}</p>
          </div>
          <div style={{ height: 0.5, background: "#e8d5b0" }} />
        </>
      )}

      {related.length > 0 && (
        <>
          <div
            style={{
              background: "#f5efe4",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              borderTop: "0.5px solid #e8d5b0",
              borderBottom: "0.5px solid #e8d5b0",
            }}
            className="max-[480px]:!px-4"
          >
            <div style={{ flex: 1, height: 0.5, background: "#d4b896" }} />
            <div
              style={{
                fontSize: 10,
                color: "#9a7060",
                letterSpacing: 3,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              You may also like
            </div>
            <div style={{ flex: 1, height: 0.5, background: "#d4b896" }} />
          </div>

          <div
            style={{ padding: "20px 0 20px 24px", overflowX: "auto", scrollbarWidth: "none" }}
            className="[&::-webkit-scrollbar]:hidden max-[480px]:!pl-4"
          >
            <div style={{ display: "flex", gap: 14, width: "max-content", paddingRight: 24 }}>
              {related.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  style={{
                    width: 140,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#fff9f2",
                    border: "0.5px solid #e8d5b0",
                    flexShrink: 0,
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  <div
                    style={{
                      height: 110,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: CARD_COLORS[i % CARD_COLORS.length],
                      overflow: "hidden",
                    }}
                  >
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name_en} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                    ) : (
                      <div style={{ fontSize: 32, color: "#c9a84c" }}>✦</div>
                    )}
                  </div>

                  <div style={{ padding: 10 }}>
                    <span style={{ fontSize: 12, color: "#2d0a1c", display: "block", lineHeight: 1.3 }}>
                      {getProductName(p, lang)}
                    </span>
                    {lang === "en" && p.name_te && (
                      <span style={{ fontSize: 10, color: "#b09080", display: "block", marginTop: 2 }}>{p.name_te}</span>
                    )}
                    <span
                      style={{
                        fontSize: 12,
                        color: "#8b6320",
                        fontWeight: 600,
                        marginTop: 5,
                        display: "block",
                      }}
                    >
                      ₹{p.price?.toLocaleString("en-IN")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      <div
        className="max-[720px]:flex hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fdf6ed",
          borderTop: "0.5px solid #e8d5b0",
          padding: "12px 16px",
          zIndex: 200,
          gap: 10,
        }}
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "#25d366",
            color: "#fff",
            padding: 13,
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            border: "none",
          }}
        >
          {WA_ICON}
          Enquire on WhatsApp
        </a>

        <a
          href={`tel:${STORE_CONFIG.phone}`}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            background: "#fdf6ed",
            color: "#2d0a1c",
            border: "0.5px solid #c9a84c",
            padding: 13,
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#2d0a1c" strokeWidth="2" strokeLinecap="round" style={{ width: 16, height: 16 }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z" />
          </svg>
          Call
        </a>
      </div>
    </div>
  );
}
