import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Copy index.html to 404.html so client-side routes work on GitHub Pages if you add routing later. */
function spaFallback404() {
  return {
    name: "spa-fallback-404",
    apply: "build",
    // Run after Vite's build plugins so dist/index.html exists before closeBundle.
    enforce: "post",
    closeBundle: {
      order: "post",
      // Rollup runs non-sequential closeBundle hooks in parallel; wait so index.html is written first.
      sequential: true,
      handler() {
        const dist = resolve(process.cwd(), "dist");
        const indexPath = resolve(dist, "index.html");
        if (!existsSync(indexPath)) {
          throw new Error(
            `[spa-fallback-404] Expected ${indexPath} after build; check build.outDir.`,
          );
        }
        copyFileSync(indexPath, resolve(dist, "404.html"));
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback404()],
  base: "/",
});
