import {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";

import { CATEGORIES } from "@/lib/storeData";
import { useLang } from "@/context/LanguageContext.jsx";
import { PRODUCTS } from "@/data/products.js";

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

const ASPECT_RATIOS = [
  "1/1",
  "3/4",
  "4/5",
  "2/3",
  "3/4",
  "4/5",
  "1/1",
  "2/3",
];

/**
 * @param {any} item
 * @param {string} lang
 * @returns {string}
 */
const getLocalizedText = (item, lang) => {
  if (lang === "te" && item.caption_te) {
    return item.caption_te;
  }

  if (lang === "hi" && item.caption_hi) {
    return item.caption_hi;
  }

  return item.caption_en || "";
};

/**
 * @param {any} item
 * @param {string} lang
 * @returns {string | null}
 */
const getSecondaryText = (item, lang) => {
  if (lang !== "en" && item.caption_en) {
    return item.caption_en;
  }

  if (lang === "en" && item.caption_te) {
    return item.caption_te;
  }

  return null;
};

/**
 * @param {boolean} active
 */
const pillStyle = (active) => ({
  padding: "7px 16px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  background: active ? "#2d0a1c" : "#fff9f2",
  color: active ? "#f0c96e" : "#6b3a2a",
  border: "0.5px solid #d4b896",
});

/**
 * @param {{
 * images: any[],
 * index: number,
 * onClose: () => void,
 * onNav: (dir: number) => void
 * }} props
 */
function GalleryLightbox({
  images,
  index,
  onClose,
  onNav,
}) {
  const { lang } = useLang();

  useEffect(() => {
    /**
     * @param {KeyboardEvent} e
     */
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowLeft") {
        onNav(-1);
      }

      if (e.key === "ArrowRight") {
        onNav(1);
      }
    };

    document.addEventListener(
      "keydown",
      handleKey
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, [onClose, onNav]);

  const image = images[index];

  if (!image) {
    return null;
  }

  const caption = getLocalizedText(
    image,
    lang
  );

  const secondary = getSecondaryText(
    image,
    lang
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.9)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "40px auto",
        }}
      >
        <img
          src={image.image_url}
          alt={caption}
          style={{
            width: "100%",
          }}
        />

        <div
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          <div>{caption}</div>

          {secondary && (
            <div>{secondary}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] =
    useState("all");

  const [lightboxIndex, setLightboxIndex] =
    useState(-1);

  const { lang } = useLang();

  const images = useMemo(() => {
    return PRODUCTS
      .filter((p) => p.images?.[0])
      .map((p) => ({
        image_url: p.images[0],
        caption_en: p.name_en,
        caption_te: p.name_te,
        caption_hi: p.name_hi,
        category: p.category,
      }));
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "all") {
      return images;
    }

    return images.filter(
      (img) =>
        img.category === activeCategory
    );
  }, [images, activeCategory]);

  useEffect(() => {
    if (
      lightboxIndex >= filtered.length &&
      lightboxIndex !== -1
    ) {
      setLightboxIndex(-1);
    }
  }, [
    filtered.length,
    lightboxIndex,
  ]);

  /**
   * @param {number} dir
   */
  /** @type {(dir: number) => void} */
    const handleNav = useCallback(
      (dir) => {
      if (!filtered.length) {
        return;
      }

      setLightboxIndex((prev) => {
        return (
          (prev + dir + filtered.length) %
          filtered.length
        );
      });
    },
    [filtered.length]
  );

  return (
    <div
      style={{
        background: "#fdf6ed",
        minHeight: "100vh",
      }}
    >
      <div style={{ padding: 24 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() =>
              setActiveCategory("all")
            }
            style={pillStyle(
              activeCategory === "all"
            )}
          >
            All
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setActiveCategory(cat.slug)
              }
              style={pillStyle(
                activeCategory === cat.slug
              )}
            >
              {cat.name_en}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 24 }}>
        {filtered.map((img, i) => (
          <img
            key={i}
            src={img.image_url}
            alt={img.caption_en}
            onClick={() =>
              setLightboxIndex(i)
            }
            style={{
              width: 220,
              margin: 8,
              cursor: "pointer",
              background:
                CARD_COLORS[
                  i % CARD_COLORS.length
                ],
              aspectRatio:
                ASPECT_RATIOS[
                  i % ASPECT_RATIOS.length
                ],
              objectFit: "cover",
            }}
          />
        ))}
      </div>

      {lightboxIndex >= 0 && (
        <GalleryLightbox
          images={filtered}
          index={lightboxIndex}
          onClose={() =>
            setLightboxIndex(-1)
          }
          onNav={handleNav}
        />
      )}
    </div>
  );
}