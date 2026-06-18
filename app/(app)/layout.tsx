import { AuthGate } from "@/components/auth/AuthGate";
import { DataBoundary } from "@/components/auth/DataBoundary";
import { EditorProvider } from "@/components/editor-context";
import { AppShell } from "@/components/layout/AppShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <EditorProvider>
        <AppShell>
          <DataBoundary>{children}</DataBoundary>
        </AppShell>
      </EditorProvider>
    </AuthGate>
  );
}
