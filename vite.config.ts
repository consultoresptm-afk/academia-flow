// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: {
      hmr: {
        overlay: true,
      },
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "tanstack": ["@tanstack/react-router", "@tanstack/react-query"],
            "supabase": ["@supabase/supabase-js"],
            "ui-icons": ["lucide-react"],
            "charts": ["recharts"],
          },
        },
      },
    },
  },
});
