import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind + conditional classes
 * @param {...(string | number | boolean | null | undefined | object | Array<any>)} inputs
 */
export function cn(...inputs) {
  return twMerge(
    clsx(...inputs)
  );
}

/**
 * Detect iframe safely
 */
export const isIframe =
  typeof window !== "undefined" &&
  window.self !== window.top;