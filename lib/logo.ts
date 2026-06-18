import { BRAND_MAP, detectBrandSlug, letterFromLogo, type Brand } from "./brands";
import {
  EXTRA_BRAND_MAP,
  detectExtraBrandSlug,
  type ExtraBrand,
} from "./brand-extra";

export type ResolvedLogo =
  | { kind: "brand"; brand: Brand }
  | { kind: "extra"; brand: ExtraBrand }
  | { kind: "letter"; char: string };

/**
 * Decides how a subscription's icon should render: a colored Simple Icons mark,
 * an uncolored react-icons mark, or a monogram. An explicit `logo` always wins
 * over name-based detection.
 */
export function resolveLogo(sub: { name: string; logo?: string }): ResolvedLogo {
  const explicitLetter = letterFromLogo(sub.logo);
  if (explicitLetter) return { kind: "letter", char: explicitLetter };

  if (sub.logo) {
    if (BRAND_MAP[sub.logo]) return { kind: "brand", brand: BRAND_MAP[sub.logo] };
    if (EXTRA_BRAND_MAP[sub.logo]) return { kind: "extra", brand: EXTRA_BRAND_MAP[sub.logo] };
  }

  const simple = detectBrandSlug(sub.name);
  if (simple) return { kind: "brand", brand: BRAND_MAP[simple] };

  const extra = detectExtraBrandSlug(sub.name);
  if (extra) return { kind: "extra", brand: EXTRA_BRAND_MAP[extra] };

  return { kind: "letter", char: sub.name.trim().charAt(0).toUpperCase() || "?" };
}
