import type { Category, BillingCycle, Status, CurrencyCode, Subscription } from "./types";

export const CATEGORIES: Category[] = [
  "Streaming",
  "Music",
  "Gaming",
  "SaaS",
  "AI Tools",
  "Developer Tools",
  "Productivity",
  "Design",
  "Cloud",
  "Storage",
  "Domain",
  "Security",
  "Education",
  "Health & Fitness",
  "News",
  "Finance",
  "Shopping",
  "Food",
  "Social",
  "Utilities",
  "Other",
];

export const BILLING_CYCLES: BillingCycle[] = ["Monthly", "Quarterly", "Annually"];

export const STATUSES: Status[] = ["Active", "Paused", "Cancelled"];

export const CURRENCIES: {
  code: CurrencyCode;
  symbol: string;
  label: string;
  flag: string;
}[] = [
  { code: "INR", symbol: "₹", label: "Indian Rupee", flag: "🇮🇳" },
  { code: "USD", symbol: "$", label: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", label: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", label: "British Pound", flag: "🇬🇧" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar", flag: "🇨🇦" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar", flag: "🇸🇬" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham", flag: "🇦🇪" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan", flag: "🇨🇳" },
  { code: "CHF", symbol: "CHF", label: "Swiss Franc", flag: "🇨🇭" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real", flag: "🇧🇷" },
  { code: "ZAR", symbol: "R", label: "South African Rand", flag: "🇿🇦" },
  { code: "NZD", symbol: "NZ$", label: "New Zealand Dollar", flag: "🇳🇿" },
];

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c.symbol])
) as Record<CurrencyCode, string>;

export const CURRENCY_FLAGS: Record<CurrencyCode, string> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c.flag])
) as Record<CurrencyCode, string>;

export const DEFAULT_CURRENCY: CurrencyCode = "INR";

export const REMINDER_THRESHOLDS: (3 | 7 | 14)[] = [3, 7, 14];

export const CATEGORY_COLORS: Record<Category, string> = {
  Streaming: "#6366F1",
  Music: "#F472B6",
  Gaming: "#8B5CF6",
  SaaS: "#22D3EE",
  "AI Tools": "#14B8A6",
  "Developer Tools": "#A78BFA",
  Productivity: "#0EA5E9",
  Design: "#EC4899",
  Cloud: "#34D399",
  Storage: "#10B981",
  Domain: "#F59E0B",
  Security: "#EF4444",
  Education: "#FB923C",
  "Health & Fitness": "#4ADE80",
  News: "#94A3B8",
  Finance: "#FBBF24",
  Shopping: "#F87171",
  Food: "#FB7185",
  Social: "#38BDF8",
  Utilities: "#64748B",
  Other: "#9CA3AF",
};

export const CATEGORY_EMOJI: Record<Category, string> = {
  Streaming: "🎬",
  Music: "🎧",
  Gaming: "🎮",
  SaaS: "🧩",
  "AI Tools": "🤖",
  "Developer Tools": "🛠️",
  Productivity: "✅",
  Design: "🎨",
  Cloud: "☁️",
  Storage: "🗄️",
  Domain: "🌐",
  Security: "🔐",
  Education: "📚",
  "Health & Fitness": "💪",
  News: "📰",
  Finance: "💳",
  Shopping: "🛍️",
  Food: "🍔",
  Social: "💬",
  Utilities: "⚙️",
  Other: "📦",
};

export const SEED_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    logo: "netflix",
    category: "Streaming",
    amount: 649,
    currency: "INR",
    billingCycle: "Monthly",
    nextRenewalDate: "2026-06-22",
    startDate: "2023-01-12",
    status: "Active",
    url: "https://netflix.com/account",
    notes: "Premium 4K plan.",
  },
  {
    id: "2",
    name: "Amazon Prime",
    logo: "amazonprime",
    category: "Shopping",
    amount: 1499,
    currency: "INR",
    billingCycle: "Annually",
    nextRenewalDate: "2026-11-10",
    startDate: "2021-11-10",
    status: "Active",
    url: "https://amazon.in/prime",
  },
  {
    id: "3",
    name: "GitHub Pro",
    logo: "github",
    category: "Developer Tools",
    amount: 399,
    currency: "INR",
    billingCycle: "Monthly",
    nextRenewalDate: "2026-06-18",
    startDate: "2022-03-01",
    status: "Active",
    url: "https://github.com/settings/billing",
  },
  {
    id: "4",
    name: "Vercel Pro",
    logo: "vercel",
    category: "Cloud",
    amount: 1699,
    currency: "INR",
    billingCycle: "Monthly",
    nextRenewalDate: "2026-07-01",
    startDate: "2023-08-15",
    status: "Active",
    url: "https://vercel.com/account",
  },
  {
    id: "5",
    name: "Figma",
    logo: "figma",
    category: "Design",
    amount: 1015,
    currency: "INR",
    billingCycle: "Monthly",
    nextRenewalDate: "2026-06-30",
    startDate: "2022-06-30",
    status: "Active",
    url: "https://figma.com/settings",
  },
  {
    id: "6",
    name: "myapp.io",
    category: "Domain",
    amount: 1499,
    currency: "INR",
    billingCycle: "Annually",
    nextRenewalDate: "2027-01-15",
    startDate: "2024-01-15",
    status: "Active",
  },
  {
    id: "7",
    name: "Spotify",
    logo: "spotify",
    category: "Music",
    amount: 119,
    currency: "INR",
    billingCycle: "Monthly",
    nextRenewalDate: "2026-06-25",
    startDate: "2020-05-20",
    status: "Active",
    url: "https://spotify.com/account",
  },
  {
    id: "8",
    name: "Linear",
    logo: "linear",
    category: "Productivity",
    amount: 699,
    currency: "INR",
    billingCycle: "Monthly",
    nextRenewalDate: "2026-07-05",
    startDate: "2024-02-10",
    status: "Paused",
    url: "https://linear.app/settings",
  },
];

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/subscriptions", label: "Subscriptions", icon: "CreditCard" },
  { href: "/analytics", label: "Analytics", icon: "BarChart3" },
  { href: "/settings", label: "Settings", icon: "Settings" },
] as const;
