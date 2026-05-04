import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import {
  getProductName,
  getSecondaryName,
} from "@/lib/storeData";

export default function ProductCard({
  product,
  showPrice = true,
}) {
  const { lang } = useLang();

  const primaryName = getProductName(
    product,
    lang
  );

  const secondaryName =
    getSecondaryName(
      product,
      lang
    );

  const imgSrc =
    product.images?.[0] || "";

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imgSrc}
          alt={product.name_en}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {!product.in_stock && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="bg-background text-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="font-display font-semibold text-foreground text-base leading-snug">
          {primaryName}
        </h3>

        {secondaryName && (
          <p className="text-muted-foreground text-xs mt-0.5">
            {secondaryName}
          </p>
        )}

        {showPrice && (
          <p className="text-primary font-bold mt-2 text-lg">
            ₹
            {product.price?.toLocaleString(
              "en-IN"
            )}
          </p>
        )}
      </div>
    </Link>
  );
}