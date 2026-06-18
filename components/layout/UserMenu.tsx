"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserRound, LogIn } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-context";

export function UserMenu() {
  const { displayName, user, isGuest, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const initial = (displayName || "U").charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.replace("/login");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Account menu"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[hsl(var(--cyan))] text-sm font-semibold text-white shadow-md shadow-primary/30 focus-ring"
        >
          {initial}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-60">
        <div className="flex items-center gap-3 border-b border-border/60 pb-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <UserRound className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{displayName || "User"}</p>
            <p className="truncate text-xs text-muted-foreground">
              {isGuest ? "Guest mode" : user?.email}
            </p>
          </div>
        </div>

        {isGuest ? (
          <div className="pt-3">
            <p className="mb-2 text-xs text-muted-foreground">
              Sign in to save your data and sync across devices.
            </p>
            <Link href="/login" className="block" onClick={() => setOpen(false)}>
              <Button variant="secondary" className="w-full gap-2">
                <LogIn className="h-4 w-4" /> Sign in / Sign up
              </Button>
            </Link>
          </div>
        ) : (
          <div className="pt-3">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
