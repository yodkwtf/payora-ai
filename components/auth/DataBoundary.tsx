"use client";

import * as React from "react";
import { useStore } from "@/lib/store";
import { useCloudSync } from "./use-cloud-sync";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Waits for local store rehydration and (for signed-in users) the initial cloud
 * load before revealing data-dependent UI, preventing flashes of stale data.
 */
export function DataBoundary({ children }: { children: React.ReactNode }) {
  const hydrated = useStore((s) => s.hydrated);
  const { ready } = useCloudSync();

  if (!hydrated || !ready) {
    return (
      <div className="space-y-6" aria-busy="true" aria-label="Loading">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return <>{children}</>;
}
