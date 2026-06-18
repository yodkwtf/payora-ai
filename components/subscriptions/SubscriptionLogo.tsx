import { resolveLogo } from "@/lib/logo";
import { CATEGORY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface Props {
  sub: { name: string; logo?: string; category: Category };
  size?: number;
  className?: string;
}

export function SubscriptionLogo({ sub, size = 40, className }: Props) {
  const resolved = resolveLogo(sub);
  const radius = size >= 48 ? "rounded-2xl" : size >= 28 ? "rounded-xl" : "rounded-lg";

  if (resolved.kind === "brand") {
    return (
      <span
        aria-hidden
        className={cn("flex shrink-0 items-center justify-center bg-white", radius, className)}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 24 24"
          role="img"
          fill={`#${resolved.brand.hex}`}
          style={{ width: size * 0.56, height: size * 0.56 }}
        >
          <path d={resolved.brand.path} />
        </svg>
      </span>
    );
  }

  if (resolved.kind === "extra") {
    const Icon = resolved.brand.Icon;
    return (
      <span
        aria-hidden
        className={cn(
          "flex shrink-0 items-center justify-center bg-secondary text-foreground",
          radius,
          className
        )}
        style={{ width: size, height: size }}
      >
        <Icon size={Math.round(size * 0.56)} />
      </span>
    );
  }

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
      {resolved.char}
    </span>
  );
}
