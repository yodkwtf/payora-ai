import { cn } from "@/lib/utils";

export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Payfool"
    >
      <defs>
        <linearGradient
          id="payfool-grad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
        >
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#payfool-grad)" />
      <rect x="15" y="12" width="6" height="24" rx="3" fill="#fff" />
      <rect x="15" y="12" width="16" height="14" rx="7" fill="#fff" />
      <rect x="21" y="17" width="7" height="4" rx="2" fill="url(#payfool-grad)" />
    </svg>
  );
}

export function Logo({
  className,
  markSize = 32,
}: {
  className?: string;
  markSize?: number;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark size={markSize} className="shadow-lg shadow-primary/30" />
      <span className="text-lg font-bold tracking-tight">Payfool</span>
    </span>
  );
}
