import { resolveBrand, letterFromLogo } from "@/lib/brands";
import { CATEGORY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface Props {
  sub: { name: string; logo?: string; category: Category };
  /** Tile size in px */
  size?: number;
  className?: string;
}

/**
 * Renders a real brand logo (Simple Icons SVG on a white chip) when the
 * subscription maps to a known brand, otherwise a colored monogram tile.
 */
export function SubscriptionLogo({ sub, size = 40, className }: Props) {
  const brand = resolveBrand(sub);
  const radius = size >= 48 ? "rounded-2xl" : size >= 28 ? "rounded-xl" : "rounded-lg";

  if (brand) {
    return (
      <span
        aria-hidden
        className={cn("flex shrink-0 items-center justify-center bg-white", radius, className)}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 24 24"
          role="img"
          fill={`#${brand.hex}`}
          style={{ width: size * 0.56, height: size * 0.56 }}
        >
          <path d={brand.path} />
        </svg>
      </span>
    );
  }

  // An explicit letter:X choice overrides the auto first-letter monogram.
  const letter =
    letterFromLogo(sub.logo) ?? (sub.name.trim().charAt(0).toUpperCase() || "?");
  const color = CATEGORY_COLORS[sub.category] ?? "#94A3B8";

  return (
    <span
      aria-hidden
      className={cn("flex shrink-0 items-center justify-center font-semibold", radius, className)}
      style={{
        width: size,
        height: size,
        backgroundColor: `${color}22`,
        color,
        fontSize: size * 0.42,
      }}
    >
      {letter}
    </span>
  );
}
