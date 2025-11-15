import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className merger */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Type-Guard für optionale Arrays */
export function isNonEmptyArray<T>(val: T[] | undefined | null): val is T[] {
  return Array.isArray(val) && val.length > 0;
}

/** Kleines Helferlein für externe Links (Security/UX) */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** Simple Datumsformatierung (z. B. "2024-03" -> "03/2024") */
export function formatPeriod(raw: string) {
  // akzeptiert bereits formatiert; fallback auf raw
  if (/^\d{2}\/\d{4}\s*–\s*(heute|\d{2}\/\d{4})$/i.test(raw)) return raw;
  if (/^\d{4}-\d{2}$/.test(raw)) {
    const [y, m] = raw.split("-");
    return `${m}/${y}`;
  }
  return raw;
}

/** Nützlicher Type-Guard */
export function nonNullable<T>(v: T | null | undefined): v is T {
  return v !== null && v !== undefined;
}
