// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only, disabled here for Vercel),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// Vercel: Cloudflare worker output is incompatible; use Nitro (TanStack + Vercel official path).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  cloudflare: false,
  plugins: [nitro()],
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
        },
      },
    },
  },
});
