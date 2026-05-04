import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext.jsx";
import { getProductName } from "@/lib/storeData";

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

/**
 * @param {{
 *   products?: Array<{
 *     id: string,
 *     name_en?: string,
 *     name_te?: string,
 *     name_hi?: string,
 *     price?: number,
 *     images?: string[]
 *   }>
 * }} props
 */
export default function NewArrivals({
  products = [],
}) {
  const { lang } = useLang();

  if (!products.length) {
    return null;
  }

  return (
    <div
      className="[&::-webkit-scrollbar]:hidden"
      style={{
        background: "#fdf6ed",
        padding:
          "20px 0 20px 20px",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      <div
        className="flex gap-[14px]"
        style={{
          width: "max-content",
        }}
      >
        {products.map(
          (product, i) => {
            const primaryName =
              getProductName(
                product,
                lang
              );

            const imgSrc =
              product.images?.[0];

            const bg =
              CARD_COLORS[
                i %
                  CARD_COLORS.length
              ];

            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                style={{
                  width: 130,
                  borderRadius: 12,
                  overflow:
                    "hidden",
                  background:
                    "#fff9f2",
                  border:
                    "0.5px solid #e8d5b0",
                  flexShrink: 0,
                  textDecoration:
                    "none",
                  display:
                    "block",
                }}
              >
                <div
                  style={{
                    height: 110,
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    background:
                      bg,
                    overflow:
                      "hidden",
                  }}
                >
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={
                        product.name_en ||
                        ""
                      }
                      style={{
                        width:
                          "100%",
                        height:
                          "100%",
                        objectFit:
                          "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        fontSize: 32,
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
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color:
                        "#2d0a1c",
                      display:
                        "block",
                      lineHeight:
                        1.3,
                    }}
                  >
                    {
                      primaryName
                    }
                  </span>

                  {lang ===
                    "en" &&
                    product.name_te && (
                      <span
                        style={{
                          fontSize: 10,
                          color:
                            "#b09080",
                          display:
                            "block",
                          marginTop: 2,
                        }}
                      >
                        {
                          product.name_te
                        }
                      </span>
                    )}

                  <span
                    style={{
                      fontSize: 13,
                      color:
                        "#8b6320",
                      fontWeight:
                        600,
                      marginTop: 6,
                      display:
                        "block",
                    }}
                  >
                    ₹
                    {product.price?.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}