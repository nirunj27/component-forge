import type { Config } from "tailwindcss";
import appUiPreset from "@component-forge/app-ui/tailwind.preset";

export default {
  presets: [appUiPreset as Config],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/app-ui/src/**/*.{ts,tsx}",
  ],
} satisfies Config;
