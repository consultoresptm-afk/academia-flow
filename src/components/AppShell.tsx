import { type ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-x-hidden">
        {/* Capa de contenido sobre el fondo degradado */}
        <div
          className="min-h-screen"
          style={{
            background: "rgba(10, 1, 1, 0.35)",
          }}
        >
          <div className="px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
