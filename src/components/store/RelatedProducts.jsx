import Link from "next/link";
import { getProductName } from "@/lib/storeData";
import {
  PRODUCT_CARD_COLORS,
  RELATED_PRODUCTS_UI,
  STORE_UI_COLORS,
} from "@/lib/uiConstants";
import { getProductPath } from "@/lib/productRouting";

export default function RelatedProducts({ products = [], lang, title = "You may also like" }) {
  if (!products?.length) return null;

  return (
    <>
      <div
        style={{
          background: STORE_UI_COLORS.headerStripBg,
          padding: `8px ${RELATED_PRODUCTS_UI.stripPaddingX}px`,
          display: "flex",
          alignItems: "center",
          gap: 14,
          borderTop: `0.5px solid ${STORE_UI_COLORS.divider}`,
          borderBottom: `0.5px solid ${STORE_UI_COLORS.divider}`,
        }}
        className="max-[480px]:!px-4"
      >
        <div style={{ flex: 1, height: 0.5, background: STORE_UI_COLORS.dividerSoft }} />
        <div
          style={{
            fontSize: 10,
            color: STORE_UI_COLORS.headingText,
            letterSpacing: 3,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
        <div style={{ flex: 1, height: 0.5, background: STORE_UI_COLORS.dividerSoft }} />
      </div>

      <div
        style={{
          padding: `20px 0 20px ${RELATED_PRODUCTS_UI.carouselPaddingLeft}px`,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
        className="[&::-webkit-scrollbar]:hidden max-[480px]:!pl-4"
      >
        <div
          style={{
            display: "flex",
            gap: RELATED_PRODUCTS_UI.itemGap,
            width: "max-content",
            paddingRight: RELATED_PRODUCTS_UI.carouselPaddingRight,
          }}
        >
          {products.map((p, i) => (
            <Link
              key={p.id}
              href={getProductPath(p)}
              prefetch={true}
              style={{
                width: RELATED_PRODUCTS_UI.cardWidth,
                borderRadius: 12,
                overflow: "hidden",
                background: STORE_UI_COLORS.cardBg,
                border: `0.5px solid ${STORE_UI_COLORS.divider}`,
                flexShrink: 0,
                textDecoration: "none",
                display: "block",
              }}
            >
              <div
                style={{
                  height: RELATED_PRODUCTS_UI.imageHeight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    PRODUCT_CARD_COLORS[i % PRODUCT_CARD_COLORS.length],
                  overflow: "hidden",
                }}
              >
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    alt={p.name_en}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      fontSize: 32,
                      color: STORE_UI_COLORS.accentGold,
                    }}
                  >
                    ✦
                  </div>
                )}
              </div>
              <div style={{ padding: 10 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: STORE_UI_COLORS.bodyText,
                    display: "block",
                    lineHeight: 1.3,
                  }}
                >
                  {getProductName(p, lang)}
                </span>

                {lang === "en" && p.name_te && (
                  <span
                    style={{
                      fontSize: 10,
                      color: STORE_UI_COLORS.mutedText,
                      display: "block",
                      marginTop: 2,
                    }}
                  >
                    {p.name_te}
                  </span>
                )}

                <span
                  style={{
                    fontSize: 12,
                    color: STORE_UI_COLORS.accent,
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
  );
}
