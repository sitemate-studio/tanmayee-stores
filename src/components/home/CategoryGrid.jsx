"use client";

import Link from "next/link";
import { CATEGORIES } from "@/data/products";
import { useLang } from "@/context/LanguageContext.jsx";

/** @type {Record<string, string>} */
const CAT_COLORS = {
  necklace_sets: "#fbeaf2",
  bangles: "#eeeaf8",
  sarees: "#eaf5ee",
  handbags: "#faf0e4",
  earrings: "#fbeaf2",
  hair_accessories: "#eaf5f5",
  dress_materials: "#eaf5ee",
  ready_to_wear: "#f0eaf8",
};

export default function CategoryGrid() {
  const { lang } = useLang();

  return (
    <section
      style={{
        background: "#fff9f2",
        padding: "28px 24px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {CATEGORIES.map((cat) => {
          const name =
            lang === "te" && cat.name_te
              ? cat.name_te
              : lang === "hi" && cat.name_hi
              ? cat.name_hi
              : cat.name_en;

          return (
            <Link
              key={cat.slug}
              href={`/collections?category=${cat.slug}`}
              prefetch={true}
              style={{
                background: "#fdf6ed",
                borderRadius: 10,
                padding: "14px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                border: "0.5px solid #e8d5b0",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background:
                    CAT_COLORS[cat.slug] || "#fdf6ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {cat.image_url ? (
                  <img
                    src={cat.image_url}
                    alt={name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : null}
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: "#6b3a2a",
                  textAlign: "center",
                }}
              >
                {name}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}