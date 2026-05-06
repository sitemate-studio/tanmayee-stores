import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { CATEGORIES } from "@/data/products";

export default function CategorySelectGrid() {
  const { lang } = useLang();

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
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
              className="group block bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="aspect-square bg-muted overflow-hidden">
                {cat.image_url ? (
                  <img
                    src={cat.image_url}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">✦</div>
                )}
              </div>

              <div className="p-3">
                <div className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                  {name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
