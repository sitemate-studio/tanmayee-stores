/**
 * Creates an SEO-friendly English slug.
 * - Lowercase
 * - Hyphen-separated
 * - Strips non-alphanumerics
 * - Strips digits (no numbers in URLs)
 *
 * @param {string} input
 */
export function slugifyEnglish(input) {
  const raw = String(input || "");

  const normalized = raw
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const withoutDigits = normalized.replace(/[0-9]+/g, "");

  const slug = withoutDigits
    .replace(/&/g, " and ")
    .replace(/[^a-z]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "item";
}
