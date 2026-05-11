"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { getProductName } from "@/lib/storeData";
import { getProductPath } from "@/lib/productRouting";
import { cn } from "@/lib/utils";
import {
  COLLECTION_CARD_BODY_CLASS,
  COLLECTION_CARD_CLASS,
  COLLECTION_CARD_MEDIA_CLASS,
} from "@/components/collections/collectionClasses";

export default function CollectionProductCard({ product, index: _index }) {
  const { lang } = useLang();

  const primaryName = getProductName(product, lang);
  const imgSrc = product.images?.[0];
  const isInStock = Boolean(product.in_stock);

  return (
    <Link
      href={getProductPath(product)}
      prefetch={true}
      className={COLLECTION_CARD_CLASS}
    >
      <div className={COLLECTION_CARD_MEDIA_CLASS}>
        {!isInStock && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center z-10">
            <span className="bg-background text-foreground text-[10px] font-semibold px-3 py-1.5 rounded-full border border-border uppercase tracking-widest">
              Out of stock
            </span>
          </div>
        )}

        {product.is_new_arrival && isInStock && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-1 rounded-full z-10">
            New
          </div>
        )}

        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.name_en}
            loading="lazy"
            className={cn(
              "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
              !isInStock && "opacity-60"
            )}
          />
        ) : (
          <div className={cn("w-full h-full flex items-center justify-center text-4xl", !isInStock && "opacity-60")}>
            ✦
          </div>
        )}
      </div>

      <div className={cn(COLLECTION_CARD_BODY_CLASS, !isInStock && "opacity-70")}>
        <h3 className="font-display font-semibold text-foreground text-[13px] sm:text-sm leading-snug">
          {primaryName}
        </h3>

        {lang === "en" && product.name_te && (
          <p className="text-muted-foreground text-[11px] sm:text-xs mt-0.5">{product.name_te}</p>
        )}

        <p className="text-primary font-bold mt-1.5 sm:mt-2 text-sm sm:text-base">
          ₹{product.price?.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}
