import { defineConfig } from "@component-forge/plugin-sdk";
import { testIdPlugin } from "@component-forge/plugin-testid";

/**
 * Component Forge configuration.
 * Plugins run during `forge generate` and Studio "Save & Generate".
 */
export default defineConfig({
  plugins: [
    testIdPlugin(),
    // testIdPlugin({ prefix: "cf", includeStories: true }),
  ],
});
