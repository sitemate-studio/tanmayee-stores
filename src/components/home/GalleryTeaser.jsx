import { Link } from "react-router-dom";

const FALLBACK_COLORS = [
  "#fbeaf2",
  "#eeeaf8",
  "#eaf5ee",
  "#faf0e4",
  "#eaf5f5",
  "#f0eaf8",
];

/**
 * @param {{
 *   images?: Array<{
 *     image_url?: string,
 *     caption_en?: string
 *   }>
 * }} props
 */
export default function GalleryTeaser({
  images = [],
}) {
  const cells = images.slice(0, 6);

  return (
    <section
      style={{
        background: "#fdf6ed",
        padding: "28px 24px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {FALLBACK_COLORS.map(
          (bg, i) => {
            const img = cells[i];

            return (
              <div
                key={i}
                style={{
                  borderRadius: 10,
                  aspectRatio: "1",
                  border:
                    "0.5px solid #e8d5b0",
                  overflow: "hidden",
                  background:
                    img?.image_url
                      ? undefined
                      : bg,
                }}
              >
                {img?.image_url && (
                  <img
                    src={img.image_url}
                    alt={
                      img.caption_en ||
                      ""
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit:
                        "cover",
                      display: "block",
                    }}
                  />
                )}
              </div>
            );
          }
        )}
      </div>

      <Link
        to="/gallery"
        style={{
          display: "block",
          textAlign: "center",
          color: "#8b6320",
          fontSize: 12,
          letterSpacing: 1,
          border:
            "0.5px solid #c9a84c",
          borderRadius: 6,
          padding: 10,
          textDecoration: "none",
        }}
      >
        View full gallery →
      </Link>
    </section>
  );
}