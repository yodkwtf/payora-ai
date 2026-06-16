"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (t: {
    title: string;
    description?: string;
    variant?: ToastVariant;
  }) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const VARIANT = {
  success: { icon: CheckCircle2, accent: "text-emerald-400", ring: "ring-emerald-500/20" },
  error: { icon: AlertTriangle, accent: "text-destructive", ring: "ring-destructive/20" },
  info: { icon: Info, accent: "text-[hsl(var(--cyan))]", ring: "ring-[hsl(var(--cyan))]/20" },
} as const;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const remove = React.useCallback((id: string) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback<ToastContextValue["toast"]>(
    ({ title, description, variant = "success" }) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : String(Date.now() + Math.random());
      setToasts((list) => [...list, { id, title, description, variant }]);
      window.setTimeout(() => remove(id), 4000);
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {mounted &&
        createPortal(
          <div
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:bottom-auto sm:right-0 sm:top-0 sm:items-end"
            role="region"
            aria-label="Notifications"
          >
            <AnimatePresence initial={false}>
              {toasts.map((t) => {
                const meta = VARIANT[t.variant];
                const Icon = meta.icon;
                return (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 40, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    role="status"
                    aria-live="polite"
                    className={cn(
                      "glass pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl p-4 shadow-2xl ring-1",
                      meta.ring
                    )}
                  >
                    <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", meta.accent)} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{t.title}</p>
                      {t.description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{t.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => remove(t.id)}
                      aria-label="Dismiss notification"
                      className="rounded-md p-0.5 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-ring"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}
