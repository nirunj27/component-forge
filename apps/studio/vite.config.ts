import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const appUiRoot = resolve(__dirname, "../../packages/app-ui");

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@component-forge/app-ui/styles.css": resolve(appUiRoot, "src/styles.css"),
      "@component-forge/app-ui/tailwind.preset": resolve(appUiRoot, "tailwind.preset.ts"),
      "@component-forge/app-ui": resolve(appUiRoot, "src"),
    },
  },
  server: {
    port: 5175,
    fs: {
      allow: [resolve(__dirname, "../..")],
    },
  },
});
