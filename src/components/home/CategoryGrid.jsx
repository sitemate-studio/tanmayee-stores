import { Link } from "react-router-dom";
import { CATEGORIES } from "@/lib/storeData";
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

/**
 * @param {{ slug: string }} props
 */
function CatIcon({ slug }) {
  const color = "#c9a84c";

  const iconStyle = {
    width: 22,
    height: 22,
  };

  if (slug === "necklace_sets") {
    return (
      <svg {...iconStyle} viewBox="0 0 20 20">
        <path
          d="M 2 6 Q 10 14 18 6"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
        <circle cx="10" cy="14" r="2.5" fill={color} />
      </svg>
    );
  }

  if (slug === "bangles") {
    return (
      <svg {...iconStyle} viewBox="0 0 20 20">
        <circle
          cx="10"
          cy="10"
          r="7"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (slug === "sarees") {
    return (
      <svg {...iconStyle} viewBox="0 0 20 20">
        <rect
          x="4"
          y="3"
          width="12"
          height="15"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (slug === "handbags") {
    return (
      <svg {...iconStyle} viewBox="0 0 20 20">
        <rect
          x="4"
          y="6"
          width="12"
          height="10"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg {...iconStyle} viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="6" fill={color} />
    </svg>
  );
}

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
              to={`/collections?category=${cat.slug}`}
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
                }}
              >
                <CatIcon slug={cat.slug} />
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