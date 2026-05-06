/**
 * Sort products by “latest” first.
 * Prefers `sort_order` (higher = newer), falls back to `id`.
 * @param {Array<any>} products
 */
export function sortLatestFirst(products) {
  return [...(products || [])].sort((a, b) => {
    const aSort = typeof a?.sort_order === "number" ? a.sort_order : null;
    const bSort = typeof b?.sort_order === "number" ? b.sort_order : null;

    if (aSort !== null && bSort !== null && aSort !== bSort) {
      return bSort - aSort;
    }

    const aId = typeof a?.id === "number" ? a.id : Number(a?.id) || 0;
    const bId = typeof b?.id === "number" ? b.id : Number(b?.id) || 0;

    return bId - aId;
  });
}

/**
 * Returns related products: same category (excluding current). If none exist,
 * falls back to the latest products overall (excluding current).
 *
 * @param {Array<any>} products
 * @param {{ category?: string, excludeId?: string | number, limit?: number }} opts
 */
export function getRelatedProducts(products, opts) {
  const category = opts?.category;
  const excludeId = opts?.excludeId;
  const limit = typeof opts?.limit === "number" ? opts.limit : 6;
  const fallbackToLatest = Boolean(opts?.fallbackToLatest);

  const isExcluded = (p) => String(p?.id) === String(excludeId);

  const sameCategory = (products || []).filter(
    (p) => !isExcluded(p) && !!category && p?.category === category
  );

  const sortedSameCategory = sortLatestFirst(sameCategory).slice(0, limit);
  if (sortedSameCategory.length > 0) return sortedSameCategory;

  if (!fallbackToLatest) return [];

  const overall = (products || []).filter((p) => !isExcluded(p));
  return sortLatestFirst(overall).slice(0, limit);
}
