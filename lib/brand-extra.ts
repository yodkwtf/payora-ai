import type { IconType } from "react-icons";
import { FaAmazon, FaMicrosoft, FaXbox } from "react-icons/fa6";
import { SiCanva } from "react-icons/si";

/**
 * Brands that Simple Icons no longer ships (mostly for trademark reasons).
 * These render as uncolored (currentColor) marks from react-icons so the app
 * still shows a recognisable logo instead of a plain monogram.
 */
export interface ExtraBrand {
  slug: string;
  title: string;
  Icon: IconType;
}

export const EXTRA_BRANDS: ExtraBrand[] = [
  { slug: "amazon", title: "Amazon", Icon: FaAmazon },
  { slug: "amazonprime", title: "Amazon Prime", Icon: FaAmazon },
  { slug: "primevideo", title: "Prime Video", Icon: FaAmazon },
  { slug: "amazonmusic", title: "Amazon Music", Icon: FaAmazon },
  { slug: "microsoft", title: "Microsoft", Icon: FaMicrosoft },
  { slug: "microsoft365", title: "Microsoft 365", Icon: FaMicrosoft },
  { slug: "xbox", title: "Xbox", Icon: FaXbox },
  { slug: "canva", title: "Canva", Icon: SiCanva },
];

export const EXTRA_BRAND_MAP: Record<string, ExtraBrand> = Object.fromEntries(
  EXTRA_BRANDS.map((b) => [b.slug, b])
);

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const EXTRA_BY_TITLE: Record<string, string> = Object.fromEntries(
  EXTRA_BRANDS.map((b) => [norm(b.title), b.slug])
);

export function detectExtraBrandSlug(name: string): string | null {
  if (!name) return null;
  const whole = norm(name);
  if (EXTRA_BY_TITLE[whole]) return EXTRA_BY_TITLE[whole];
  const first = norm(name.split(/\s+/)[0] ?? "");
  if (first.length >= 2 && EXTRA_BY_TITLE[first]) return EXTRA_BY_TITLE[first];
  return null;
}
