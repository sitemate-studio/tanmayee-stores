import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/store/Breadcrumbs";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import RelatedProducts from "@/components/store/RelatedProducts";
import ProductImageGallery from "@/components/store/ProductImageGallery";
import {
  getProductName,
  getProductDescription,
  getWhatsAppProductURL,
  getCategoryName,
  STORE_CONFIG,
} from "@/lib/storeData";
import { PRODUCTS } from "@/data/products";
import { getRelatedProducts } from "@/lib/productUtils";
import { RELATED_PRODUCTS_LIMIT } from "@/lib/uiConstants";
import { findProductBySlugs } from "@/lib/productRouting";

export default function ProductDetail() {
  const { categorySlug, productSlug } = useParams();
  const { lang, setLang } = useLang();

  const product = useMemo(() => {
    return findProductBySlugs(PRODUCTS, { categorySlug, productSlug });
  }, [categorySlug, productSlug]);

  const related = useMemo(() => {
    return getRelatedProducts(PRODUCTS, {
      category: product?.category,
      excludeId: product?.id,
      limit: RELATED_PRODUCTS_LIMIT,
      fallbackToLatest: false,
    });
  }, [product?.category, product?.id]);

  if (!product) {
    return (
      <div style={{ background: "#fdf6ed", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 14, color: "#b09080" }}>Product not found.</p>
        <Link to="/collections" style={{ fontSize: 13, color: "#8b6320", textDecoration: "underline" }}>Back to Collections</Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [];
  const primaryName = getProductName(product, lang);
  const description = getProductDescription(product, lang);
  const categoryName = getCategoryName(product.category, lang);
  const waUrl = getWhatsAppProductURL(product.name_en);
  const waIcon = <WhatsAppIcon fill="#fff" size={20} />;

  return (
    <div style={{ background: "#fdf6ed", minHeight: "100vh", paddingBottom: 72 }}>
      {/* Breadcrumb */}
      <div style={{ padding: "14px 24px", borderBottom: "0.5px solid #e8d5b0", background: "#fdf6ed" }}>
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Collections", to: "/collections" },
            { label: product.name_en },
          ]}
        />
      </div>

      {/* Product layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 1100, margin: "0 auto" }} className="max-[720px]:!grid-cols-1">
        {/* Image panel */}
        <div
          style={{ padding: 24, borderRight: "0.5px solid #e8d5b0" }}
          className="max-[720px]:!border-r-0 max-[720px]:!border-b max-[720px]:![border-bottom:0.5px_solid_#e8d5b0] max-[720px]:!p-4"
        >
          <ProductImageGallery key={product.id} images={images} alt={product.name_en} />
        </div>

        {/* Info panel */}
        <div style={{ padding: "28px 28px 24px" }} className="max-[720px]:!p-4">
          {/* Category pill */}
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

          {/* Name */}
          <span style={{ fontSize: 26, fontWeight: 600, color: "#2d0a1c", lineHeight: 1.3, display: "block", marginBottom: 4 }}>
            {primaryName}
          </span>
          {lang === "en" && product.name_te && (
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 18, color: "#8b6320", display: "block", marginBottom: 16 }}>
              {product.name_te}
            </span>
          )}

          {/* Price */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 20, borderBottom: "0.5px solid #e8d5b0" }}>
            <span style={{ fontSize: 28, fontWeight: 600, color: "#2d0a1c" }}>₹{product.price?.toLocaleString("en-IN")}</span>
            {product.is_new_arrival && (
              <span style={{ background: "#2d0a1c", color: "#f0c96e", fontSize: 10, padding: "3px 10px", borderRadius: 10, fontWeight: 500 }}>New</span>
            )}
          </div>

          {/* Lang toggle */}
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

          {/* Description */}
          {description && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, color: "#4a2a1a", lineHeight: 1.8 }}>{description}</p>
            </div>
          )}

          {/* Details list */}
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
              <span style={{ fontSize: 12, color: product.in_stock ? "#3a8a4a" : "#c0a090", fontWeight: 500 }}>{product.in_stock ? "In stock" : "Out of stock"}</span>
            </div>
          </div>

          {/* CTA stack — desktop only */}
          <div className="max-[720px]:!hidden" style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#25d366", color: "#fff", border: "none", padding: "15px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none", letterSpacing: 0.3 }}
            >
              {waIcon}
              Enquire on WhatsApp
            </a>
            <a
              href={`tel:${STORE_CONFIG.phoneTel || STORE_CONFIG.phone}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#fdf6ed", color: "#2d0a1c", border: "0.5px solid #c9a84c", padding: "13px 24px", borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: "none" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#2d0a1c" strokeWidth="2" strokeLinecap="round" style={{ width: 16, height: 16, flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z" />
              </svg>
              Call the store
            </a>
          </div>
        </div>
      </div>

      <div style={{ height: 0.5, background: "#e8d5b0" }} />

      {/* Full description */}
      {description && (
        <>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px", borderBottom: "0.5px solid #e8d5b0" }} className="max-[720px]:!px-4">
            <div style={{ fontSize: 14, fontWeight: 600, color: "#2d0a1c", marginBottom: 14, letterSpacing: 0.3 }}>About this product</div>
            <p style={{ fontSize: 13, color: "#4a2a1a", lineHeight: 1.9, maxWidth: 640 }}>{description}</p>
          </div>
          <div style={{ height: 0.5, background: "#e8d5b0" }} />
        </>
      )}

      {/* Related products */}
      <RelatedProducts products={related} lang={lang} />

      {/* Mobile sticky CTA */}
      <div
        className="max-[720px]:flex hidden"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fdf6ed", borderTop: "0.5px solid #e8d5b0", padding: "12px 16px", zIndex: 200, gap: 10 }}
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25d366", color: "#fff", padding: 13, borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", border: "none" }}
        >
          {waIcon}
          Enquire on WhatsApp
        </a>
        <a
          href={`tel:${STORE_CONFIG.phoneTel || STORE_CONFIG.phone}`}
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#fdf6ed", color: "#2d0a1c", border: "0.5px solid #c9a84c", padding: 13, borderRadius: 8, fontSize: 12, fontWeight: 500, textDecoration: "none" }}
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