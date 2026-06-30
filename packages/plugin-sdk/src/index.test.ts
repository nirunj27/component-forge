import { describe, it, expect } from "vitest";
import { applyPlugins, definePlugin } from "./index.js";
import type { ComponentSchema } from "@component-forge/schema";

const sampleSchema: ComponentSchema = {
  name: "Widget",
  props: {},
  slots: [],
  events: [],
};

describe("applyPlugins", () => {
  it("runs beforeGenerate hooks", () => {
    const plugin = definePlugin({
      name: "desc-plugin",
      version: "1.0.0",
      hooks: {
        beforeGenerate(schema) {
          return { ...schema, description: "Updated" };
        },
      },
    });

    const { schema } = applyPlugins(
      sampleSchema,
      [{ filename: "Widget.tsx", content: "x" }],
      [plugin],
      "./out",
    );

    expect(schema.description).toBe("Updated");
  });

  it("runs transformFile hooks", () => {
    const plugin = definePlugin({
      name: "tag-plugin",
      version: "1.0.0",
      hooks: {
        transformFile(file) {
          if (file.filename.endsWith(".tsx")) {
            return { ...file, content: file.content + "\n// tagged" };
          }
          return file;
        },
      },
    });

    const { files } = applyPlugins(
      sampleSchema,
      [
        { filename: "Widget.tsx", content: "export {}" },
        { filename: "index.ts", content: "export {}" },
      ],
      [plugin],
      "./out",
    );

    expect(files[0]?.content).toContain("// tagged");
    expect(files[1]?.content).not.toContain("// tagged");
  });

  it("runs afterGenerate hooks", () => {
    const plugin = definePlugin({
      name: "extra-file",
      version: "1.0.0",
      hooks: {
        afterGenerate(ctx) {
          return [
            ...ctx.files,
            { filename: "EXTRA.md", content: "# Extra" },
          ];
        },
      },
    });

    const { files } = applyPlugins(
      sampleSchema,
      [{ filename: "Widget.tsx", content: "" }],
      [plugin],
      "./out",
    );

    expect(files).toHaveLength(2);
    expect(files[1]?.filename).toBe("EXTRA.md");
  });
});
