import { CATEGORIES } from "@/data/products";
import { sortLatestFirst } from "@/lib/productUtils";
import { slugifyEnglish } from "@/lib/slugify";

/**
 * @param {string} internalCategorySlug
 */
export function getCategoryUrlSlug(internalCategorySlug) {
  const category = CATEGORIES.find((c) => c.slug === internalCategorySlug);
  if (!category) return slugifyEnglish(internalCategorySlug);
  return slugifyEnglish(category.name_en);
}

/**
 * @param {string} categoryUrlSlug
 */
export function getInternalCategorySlug(categoryUrlSlug) {
  const normalized = slugifyEnglish(categoryUrlSlug);

  const match = CATEGORIES.find(
    (c) => slugifyEnglish(c.name_en) === normalized
  );

  return match?.slug || null;
}

/**
 * @param {{ slug?: string, name_en?: string }} product
 */
export function getProductUrlSlug(product) {
  if (product?.slug) return slugifyEnglish(product.slug);
  return slugifyEnglish(product?.name_en);
}

/**
 * @param {{ category?: string }} product
 */
export function getProductPath(product) {
  const categoryUrlSlug = getCategoryUrlSlug(product?.category);
  const productUrlSlug = getProductUrlSlug(product);
  return `/${categoryUrlSlug}/${productUrlSlug}`;
}

/**
 * @param {Array<any>} products
 * @param {{ categorySlug?: string, productSlug?: string }} params
 */
export function findProductBySlugs(products, params) {
  const internalCategory = getInternalCategorySlug(params?.categorySlug || "");
  if (!internalCategory) return null;

  const normalizedProductSlug = slugifyEnglish(params?.productSlug || "");

  const candidates = (products || []).filter(
    (p) =>
      p?.category === internalCategory &&
      getProductUrlSlug(p) === normalizedProductSlug
  );

  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];

  return sortLatestFirst(candidates)[0] || null;
}
