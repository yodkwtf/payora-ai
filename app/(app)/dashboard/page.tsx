"use client";

import dynamic from "next/dynamic";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { UpcomingRenewals } from "@/components/dashboard/UpcomingRenewals";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/auth/auth-context";

const AiInsightsPanel = dynamic(
  () => import("@/components/ai/AiInsightsPanel").then((m) => m.AiInsightsPanel),
  {
    ssr: false,
    loading: () => <Skeleton className="h-48 rounded-2xl" />,
  }
);

export default function DashboardPage() {
  const { displayName } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
          {displayName ? `Welcome back, ${displayName}. ` : "Welcome back. "}
          Here&apos;s where your money is going.
        </p>
      </div>

      <StatsRow />

      <AiInsightsPanel />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <UpcomingRenewals />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
