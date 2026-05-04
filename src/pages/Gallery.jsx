import { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { GALLERY_IMAGES } from "../data/gallery";
import { PRODUCTS } from "../data/products";
import { CATEGORIES } from "@/lib/storeData";
import { useLang } from "@/context/LanguageContext";

const CARD_COLORS = ["#fbeaf2", "#eeeaf8", "#eaf5ee", "#faf0e4", "#fbeaf2", "#eaf5f5", "#f0eaf8", "#eaf5ee", "#fbeaf2", "#faf0e4", "#eeeaf8", "#eaf5f5"];
const ASPECT_RATIOS = ["1/1", "3/4", "4/5", "2/3", "3/4", "4/5", "1/1", "2/3", "3/4", "1/1", "4/5", "3/4"];

function GalleryLightbox({ images, index, onClose, onNav }) {
  const { lang } = useLang();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  const img = images[index];
  if (!img) return null;

  const caption =
  lang === "te" && img.caption_te
    ? img.caption_te
    : lang === "hi" && img.caption_hi
    ? img.caption_hi
    : img.caption_en || "";

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(20,4,12,0.92)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div style={{ position: "relative", maxWidth: 680, width: "100%" }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: -14, right: -14, width: 36, height: 36, background: "#fdf6ed", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
          className="max-[600px]:!top-2 max-[600px]:!right-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#2d0a1c" strokeWidth="2" strokeLinecap="round" style={{ width: 16, height: 16 }}>
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Prev */}
        <button
          onClick={() => onNav(-1)}
          style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: -54, background: "rgba(253,246,237,0.15)", border: "0.5px solid rgba(253,246,237,0.3)", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          className="max-[600px]:!left-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#fdf6ed" strokeWidth="2" strokeLinecap="round" style={{ width: 18, height: 18 }}>
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* Image */}
        <div style={{ width: "100%", borderRadius: 12, overflow: "hidden", background: "#fdf6ed", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
          {img.image_url ? (
            <img src={img.image_url} alt={captionEn} style={{ width: "100%", display: "block" }} />
          ) : (
            <div style={{ fontSize: 80, color: "#c9a84c", padding: 60 }}>✦</div>
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onNav(1)}
          style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: -54, background: "rgba(253,246,237,0.15)", border: "0.5px solid rgba(253,246,237,0.3)", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          className="max-[600px]:!right-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#fdf6ed" strokeWidth="2" strokeLinecap="round" style={{ width: 18, height: 18 }}>
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Caption */}
        <div style={{ marginTop: 14, textAlign: "center" }}>
          <span style={{ fontFamily: "inherit", fontSize: 16, color: "#f0c96e", display: "block", marginBottom: 3 }}>{caption}</span>
          {lang !== "en" && captionEn && (
            <span style={{ fontSize: 12, color: "#9a6878" }}>{captionEn}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const { lang } = useLang();
  const galleryImages = GALLERY_IMAGES;
  const products = PRODUCTS;

  const images = useMemo(() => {
    if (galleryImages?.length > 0) return galleryImages;
    return (products || [])
      .filter((p) => p.images?.[0])
      .map((p) => ({
        image_url: p.images[0],
        caption_en: p.name_en,
        caption_te: p.name_te,
        caption_hi: p.name_hi,
        category: p.category,
      }));
  }, [galleryImages, products]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  const handleNav = useCallback((dir) => {
    setLightboxIndex((prev) => (prev + dir + filtered.length) % filtered.length);
  }, [filtered.length]);

  return (
    <div style={{ background: "#fdf6ed", minHeight: "100vh" }}>

      {/* Page header */}
      <div style={{ background: "#fdf6ed", padding: "18px 24px 0", borderBottom: "0.5px solid #e8d5b0" }}
        className="max-[480px]:!px-4">
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Link to="/" style={{ fontSize: 11, color: "#8b6320", textDecoration: "none" }}>Home</Link>
          <span style={{ fontSize: 11, color: "#d4b896" }}>›</span>
          <span style={{ fontSize: 11, color: "#b09080" }}>Gallery</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingBottom: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#2d0a1c", letterSpacing: -0.3 }}>Our Gallery</div>
          <div style={{ fontSize: 11, color: "#b09080", marginBottom: 2 }}>Tap any photo to view</div>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ background: "#fdf6ed", padding: "10px 24px", borderBottom: "0.5px solid #e8d5b0", overflowX: "auto", scrollbarWidth: "none" }}
        className="[&::-webkit-scrollbar]:hidden max-[480px]:!px-4">
        <div style={{ display: "flex", gap: 8, width: "max-content" }}>
          <button
            onClick={() => setActiveCategory("all")}
            style={{
              padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500,
              whiteSpace: "nowrap", cursor: "pointer",
              background: activeCategory === "all" ? "#2d0a1c" : "#fff9f2",
              color: activeCategory === "all" ? "#f0c96e" : "#6b3a2a",
              border: activeCategory === "all" ? "0.5px solid #2d0a1c" : "0.5px solid #d4b896",
            }}
          >All</button>
          {CATEGORIES.map((cat) => {
            const name = lang === "te" && cat.name_te ? cat.name_te : lang === "hi" && cat.name_hi ? cat.name_hi : cat.name_en;
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                style={{
                  padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                  whiteSpace: "nowrap", cursor: "pointer",
                  background: isActive ? "#2d0a1c" : "#fff9f2",
                  color: isActive ? "#f0c96e" : "#6b3a2a",
                  border: isActive ? "0.5px solid #2d0a1c" : "0.5px solid #d4b896",
                }}
              >{name}</button>
            );
          })}
        </div>
      </div>

      {/* Masonry gallery */}
      <div style={{ padding: "20px 24px 32px" }} className="max-[480px]:!px-4">
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#b09080", fontSize: 14 }}>
            No images in this category yet.
          </div>
        ) : (
          <div style={{ columns: 3, columnGap: 12 }} className="max-[700px]:![columns:2] max-[400px]:![column-gap:8px]">
            {filtered.map((img, i) => {
              const captionPrimary =
              lang === "te" && img.caption_te
                ? img.caption_te
                : lang === "hi" && img.caption_hi
                ? img.caption_hi
                : img.caption_en || "";
              const captionSecondary = lang === "te" && img.caption_te && img.caption_en ? img.caption_en : (lang === "en" && img.caption_te ? img.caption_te : null);
              const bg = CARD_COLORS[i % CARD_COLORS.length];
              const ratio = ASPECT_RATIOS[i % ASPECT_RATIOS.length];

              return (
                <div
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  style={{ breakInside: "avoid", marginBottom: 12, borderRadius: 10, overflow: "hidden", border: "0.5px solid #e8d5b0", cursor: "pointer", position: "relative", display: "block" }}
                  className="group"
                >
                  {/* Image */}
                  <div style={{ width: "100%", aspectRatio: ratio, background: bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {img.image_url ? (
                      <img src={img.image_url} alt={img.caption_en || ""} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    ) : (
                      <div style={{ fontSize: 32, color: "#c9a84c" }}>✦</div>
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="group-hover:opacity-100"
                    style={{ position: "absolute", inset: 0, background: "rgba(45,10,28,0.55)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s", pointerEvents: "none" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f0c96e" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </div>

                  {/* Caption */}
                  <div style={{ padding: "8px 10px", background: "#fff9f2" }}>
                    <span style={{ fontSize: 12, color: "#2d0a1c", display: "block", lineHeight: 1.3 }}>{captionPrimary}</span>
                    {captionSecondary && (
                      <span style={{ fontSize: 10, color: "#b09080", display: "block", marginTop: 1 }}>{captionSecondary}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA strip */}
      <div style={{ background: "#2d0a1c", padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
        className="max-[480px]:!flex-col max-[480px]:!items-start max-[480px]:!gap-3">
        <div style={{ color: "#9a6878", fontSize: 12, lineHeight: 1.8 }}>
          <strong style={{ color: "#f0c96e", display: "block", fontSize: 15, marginBottom: 2 }}>Like what you see?</strong>
          Browse our full collection and enquire on WhatsApp
        </div>
        <Link
          to="/collections"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0c96e", color: "#2d0a1c", fontSize: 12, fontWeight: 600, padding: "10px 18px", borderRadius: 6, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
          className="max-[480px]:!w-full max-[480px]:!justify-center"
        >
          View Collections →
        </Link>
      </div>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <GalleryLightbox
          images={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onNav={handleNav}
        />
      )}
    </div>
  );
}