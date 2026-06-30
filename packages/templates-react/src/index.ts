import type { ComponentSchema, PropDefinition } from "@component-forge/schema";
import {
  generateBinaryControlFile,
  generateBinaryControlStyles,
  generateFormFile,
  generateFormStyles,
  generateNavigationFile,
  generateNavigationStyles,
  generateTableFile,
  generateTableStyles,
  generateVirtualTableFile,
  generateVirtualTableStyles,
  inferInputType,
  isBinaryControl,
  isTextareaControl,
  shouldUseFormGenerator,
  shouldUseNavigationGenerator,
  shouldUseTableGenerator,
  shouldUseVirtualTable,
} from "./specialized.js";

export interface GeneratedFile {
  filename: string;
  content: string;
}

export function getComponentFolderName(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function tsTypeForProp(prop: PropDefinition): string {
  switch (prop.type) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "enum":
      return prop.values?.map((v) => `"${v}"`).join(" | ") ?? "string";
    default:
      return "unknown";
  }
}

function defaultValueForProp(prop: PropDefinition): string | undefined {
  if (prop.default === undefined) return undefined;
  if (prop.type === "string" || prop.type === "enum") return `"${prop.default}"`;
  return String(prop.default);
}

export function buildPropsInterface(schema: ComponentSchema): string {
  const entries = Object.entries(schema.props ?? {});
  if (entries.length === 0 && schema.slots.length === 0 && schema.events.length === 0) {
    return "export interface {name}Props {}\n".replace("{name}", schema.name);
  }

  const lines: string[] = [];

  for (const [propName, prop] of entries) {
    const optional = prop.required ? "" : "?";
    const comment = prop.description ? `  /** ${prop.description} */\n` : "";
    lines.push(`${comment}  ${propName}${optional}: ${tsTypeForProp(prop)};`);
  }

  for (const slot of schema.slots) {
    const optional = slot.required ? "" : "?";
    const comment = slot.description ? `  /** ${slot.description} */\n` : "";
    lines.push(`${comment}  ${slot.name}${optional}: React.ReactNode;`);
  }

  for (const event of schema.events) {
    if (event === "onChange" && schema.name === "Select") {
      lines.push(`  ${event}?: (event: React.ChangeEvent<HTMLSelectElement>) => void;`);
    } else if (event === "onChange") {
      lines.push(`  ${event}?: (event: React.ChangeEvent<HTMLInputElement>) => void;`);
    } else if (event === "onBlur") {
      lines.push(`  ${event}?: (event: React.FocusEvent<HTMLInputElement>) => void;`);
    } else if (event === "onClose") {
      lines.push(`  ${event}?: () => void;`);
    } else if (event === "onSubmit") {
      lines.push(`  ${event}?: (event: React.FormEvent<HTMLFormElement>) => void;`);
    } else {
      lines.push(`  ${event}?: (event: React.MouseEvent<HTMLElement>) => void;`);
    }
  }

  return `export interface ${schema.name}Props {\n${lines.join("\n")}\n}`;
}

export function buildDefaultProps(schema: ComponentSchema): string | undefined {
  const defaults = Object.entries(schema.props ?? {})
    .map(([name, prop]) => {
      const value = defaultValueForProp(prop);
      return value !== undefined ? `  ${name}: ${value},` : null;
    })
    .filter(Boolean);

  if (defaults.length === 0) return undefined;

  return `const defaultProps: Partial<${schema.name}Props> = {\n${defaults.join("\n")}\n};`;
}

export function buildDestructuredProps(schema: ComponentSchema): string {
  const propNames = Object.keys(schema.props ?? {});
  const slotNames = schema.slots.map((s) => s.name);
  const eventNames = schema.events ?? [];
  const all = [...propNames, ...slotNames, ...eventNames];

  if (all.length === 0) return "";

  const withDefaults = Object.entries(schema.props ?? {}).map(([name, prop]) => {
    const def = defaultValueForProp(prop);
    return def !== undefined ? `${name} = ${def}` : name;
  });

  const slots = schema.slots.map((s) => s.name);
  const events = schema.events ?? [];

  return [...withDefaults, ...slots, ...events].join(", ");
}

export function buildA11yAttributes(schema: ComponentSchema): string {
  const attrs: string[] = [];
  const a11y = schema.a11y;

  if (a11y?.role) {
    attrs.push(`role="${a11y.role}"`);
  }

  if (a11y?.aria?.includes("aria-disabled") && schema.props?.disabled) {
    attrs.push(`aria-disabled={disabled}`);
  }

  if (a11y?.keyboard?.length) {
    attrs.push(`onKeyDown={handleKeyDown}`);
  }

  return attrs.length > 0 ? `\n      ${attrs.join("\n      ")}` : "";
}

export function buildKeyboardHandler(schema: ComponentSchema): string {
  const keyboard = schema.a11y?.keyboard ?? [];
  if (keyboard.length === 0) return "";
  if (!schema.events.includes("onClick")) return "";

  const keys = keyboard.map((k) => (k === "Space" ? '" "' : `"${k}"`)).join(", ");

  return `
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if ([${keys}].includes(event.key) && onClick) {
      event.preventDefault();
      onClick(event as unknown as React.MouseEvent<HTMLElement>);
    }
  };`;
}

function getRootElement(schema: ComponentSchema): string {
  if (schema.events.includes("onSubmit") || schema.name.endsWith("Form")) {
    return "form";
  }
  if (isTextareaControl(schema)) {
    return "textarea";
  }
  if (isBinaryControl(schema)) {
    return "input";
  }
  if (schema.events.includes("onClick") || schema.a11y?.role === "button") {
    return "button";
  }
  if (schema.a11y?.role === "textbox" || schema.name === "Input" || schema.category === "forms") {
    return "input";
  }
  if (schema.a11y?.role === "status") {
    return "span";
  }
  return "div";
}

function buildClassNameExpr(schema: ComponentSchema): string {
  const parts = ["styles.root"];
  if (schema.props?.variant) parts.push("variant && styles[variant]");
  if (schema.props?.size) parts.push("size && styles[size]");
  return `[${parts.join(", ")}].filter(Boolean).join(" ")`;
}

function buildElementBody(
  schema: ComponentSchema,
  element: string,
  hasChildren: boolean,
): string {
  if (element === "input") {
    const labelBlock = schema.props?.label
      ? `<label className={styles.label} htmlFor={inputId}>
        {label}
      </label>`
      : "";

    const inputType = inferInputTypeFromSchema(schema);

    return `${labelBlock}
      <input
        id={inputId}
        type="${inputType}"
        className={${buildClassNameExpr(schema)}}
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        required={required}
        aria-required={required || undefined}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}`;
  }

  if (element === "textarea") {
    const labelBlock = schema.props?.label
      ? `<label className={styles.label} htmlFor={inputId}>
        {label}
      </label>`
      : "";

    return `${labelBlock}
      <textarea
        id={inputId}
        className={${buildClassNameExpr(schema)}}
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        onChange={onChange}
        rows={4}
      />`;
  }

  const open = `<${element}`;
  const close = `</${element}>`;
  const attrs = [
    `className={${buildClassNameExpr(schema)}}`,
    schema.events.includes("onClick") ? "type=\"button\"" : "",
    schema.events.includes("onClick") ? "onClick={onClick}" : "",
    schema.props?.disabled ? "disabled={disabled}" : "",
    schema.props?.loading ? "aria-busy={loading}" : "",
    schema.a11y?.role && element !== "button" ? `role="${schema.a11y.role}"` : "",
    schema.a11y?.aria?.includes("aria-disabled") && schema.props?.disabled
      ? "aria-disabled={disabled}"
      : "",
    schema.a11y?.keyboard?.length ? "onKeyDown={handleKeyDown}" : "",
  ]
    .filter(Boolean)
    .map((a) => `      ${a}`)
    .join("\n");

  return `${open}
${attrs}
    >
      ${hasChildren ? "{children}" : null}
    ${close}`;
}

function inferInputTypeFromSchema(schema: ComponentSchema): string {
  for (const [name, prop] of Object.entries(schema.props ?? {})) {
    if (prop.type === "string" || prop.type === "number") {
      const t = inferInputType(name, prop);
      if (t !== "text") return t;
    }
  }
  const n = schema.name.toLowerCase();
  if (n.includes("password")) return "password";
  if (n.includes("email")) return "email";
  if (n.includes("phone")) return "tel";
  if (n.includes("search")) return "search";
  if (n.includes("number")) return "number";
  if (isBinaryControl(schema)) return "checkbox";
  return "text";
}

export function generateComponentFile(schema: ComponentSchema): GeneratedFile {
  if (schema.name === "Modal") return generateModalFile(schema);
  if (schema.name === "Card") return generateCardFile(schema);
  if (schema.name === "Select" || schema.options?.length) return generateSelectFile(schema);
  if (shouldUseFormGenerator(schema)) return generateFormFile(schema);
  if (shouldUseTableGenerator(schema)) {
    return shouldUseVirtualTable(schema)
      ? generateVirtualTableFile(schema)
      : generateTableFile(schema);
  }
  if (shouldUseNavigationGenerator(schema)) return generateNavigationFile(schema);
  if (isBinaryControl(schema)) return generateBinaryControlFile(schema);

  const propsInterface = buildPropsInterface(schema);
  const destructured = buildDestructuredProps(schema);
  const keyboardHandler = buildKeyboardHandler(schema);
  const element = getRootElement(schema);
  const hasChildren = schema.slots.some((s) => s.name === "children");
  const isInput = element === "input" || element === "textarea";

  const inputHelpers = isInput
    ? `
  const inputId = React.useId();
  const errorId = \`\${inputId}-error\`;`
    : "";

  const wrapperOpen = isInput ? `<div className={styles.wrapper}>` : "";
  const wrapperClose = isInput ? `</div>` : "";

  const content = `import React from "react";
import styles from "./${schema.name}.module.css";

${propsInterface}

/**
 * ${schema.description ?? `${schema.name} component`}
 * @generated by Component Forge — edit schema and re-run forge generate
 */
export function ${schema.name}({ ${destructured} }: ${schema.name}Props) {
${inputHelpers}${keyboardHandler}
  return (
    ${wrapperOpen}
      ${buildElementBody(schema, element, hasChildren)}
    ${wrapperClose}
  );
}

${schema.name}.displayName = "${schema.name}";
`;

  return { filename: `${schema.name}.tsx`, content };
}

function generateModalFile(schema: ComponentSchema): GeneratedFile {
  const propsInterface = buildPropsInterface(schema);
  const destructured = buildDestructuredProps(schema);

  const content = `import React, { useEffect, useRef } from "react";
import styles from "./${schema.name}.module.css";

${propsInterface}

export function ${schema.name}({ ${destructured} }: ${schema.name}Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = React.useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <header className={styles.header}>
            <h2 id={titleId} className={styles.title}>{title}</h2>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close dialog">
              ×
            </button>
          </header>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

${schema.name}.displayName = "${schema.name}";
`;

  return { filename: `${schema.name}.tsx`, content };
}

function generateCardFile(schema: ComponentSchema): GeneratedFile {
  const propsInterface = buildPropsInterface(schema);
  const destructured = buildDestructuredProps(schema);
  const hasTitle = schema.slots.some((s) => s.name === "title");
  const hasFooter = schema.slots.some((s) => s.name === "footer");

  const content = `import React from "react";
import styles from "./${schema.name}.module.css";

${propsInterface}

export function ${schema.name}({ ${destructured} }: ${schema.name}Props) {
  return (
    <article
      className={[styles.root, variant && styles[variant]].filter(Boolean).join(" ")}
      role="region"
    >
      ${hasTitle ? "{title && <header className={styles.header}>{title}</header>}" : ""}
      <div className={styles.body}>{children}</div>
      ${hasFooter ? "{footer && <footer className={styles.footer}>{footer}</footer>}" : ""}
    </article>
  );
}

${schema.name}.displayName = "${schema.name}";
`;

  return { filename: `${schema.name}.tsx`, content };
}

function generateSelectFile(schema: ComponentSchema): GeneratedFile {
  const propsInterface = buildPropsInterface(schema);
  const destructured = buildDestructuredProps(schema);
  const options = schema.options ?? [];

  const optionsJsx = options
    .map((o) => `        <option value="${o.value}">${o.label}</option>`)
    .join("\n");

  const content = `import React from "react";
import styles from "./${schema.name}.module.css";

${propsInterface}

export function ${schema.name}({ ${destructured} }: ${schema.name}Props) {
  const selectId = React.useId();

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={selectId}>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={styles.root}
        value={value}
        disabled={disabled}
        onChange={onChange}
        aria-label={label}
      >
        <option value="" disabled>
          {placeholder}
        </option>
${optionsJsx}
      </select>
    </div>
  );
}

${schema.name}.displayName = "${schema.name}";
`;

  return { filename: `${schema.name}.tsx`, content };
}

export function generateStylesFile(schema: ComponentSchema): GeneratedFile {
  if (schema.name === "Modal") return generateModalStyles(schema);
  if (schema.name === "Card") return generateCardStyles(schema);
  if (schema.name === "Select") return generateSelectStyles(schema);
  if (shouldUseFormGenerator(schema)) return generateFormStyles(schema);
  if (shouldUseTableGenerator(schema)) {
    return shouldUseVirtualTable(schema)
      ? generateVirtualTableStyles(schema)
      : generateTableStyles(schema);
  }
  if (shouldUseNavigationGenerator(schema)) return generateNavigationStyles(schema);
  if (isBinaryControl(schema)) return generateBinaryControlStyles(schema);

  const variants = schema.props?.variant?.values ?? [];
  const sizes = schema.props?.size?.values ?? [];
  const isInput =
    schema.name === "Input" ||
    schema.a11y?.role === "textbox" ||
    schema.category === "forms" ||
    isTextareaControl(schema);

  const variantRules = variants
    .map((v) => `.${v} {\n  /* ${v} variant */\n}`)
    .join("\n\n");

  const sizeRules = sizes
    .map((s) => `.${s} {\n  /* ${s} size */\n}`)
    .join("\n\n");

  const rootStyles = isInput
    ? `.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
}

.root {
  padding: 0.5rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
}

.root:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.error {
  font-size: 0.75rem;
  color: #dc2626;
}`
    : `.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  font-family: inherit;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.15s ease, opacity 0.15s ease;
}

.root:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background: #2563eb;
  color: #fff;
}

.primary:hover:not(:disabled) {
  background: #1d4ed8;
}

.secondary {
  background: #e5e7eb;
  color: #111827;
}

.ghost {
  background: transparent;
  color: #374151;
  border-color: #d1d5db;
}

.danger {
  background: #dc2626;
  color: #fff;
}

.success {
  background: #dcfce7;
  color: #166534;
}

.warning {
  background: #fef3c7;
  color: #92400e;
}

.error {
  background: #fee2e2;
  color: #991b1b;
}

.neutral {
  background: #f3f4f6;
  color: #374151;
}

.sm {
  padding: 0.25rem 0.625rem;
  font-size: 0.875rem;
}

.md {
  padding: 0.5rem 1rem;
  font-size: 0.9375rem;
}

.lg {
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
}`;

  const content = `${rootStyles}

${variantRules}

${sizeRules}
`;

  return { filename: `${schema.name}.module.css`, content };
}

function generateModalStyles(schema: ComponentSchema): GeneratedFile {
  return {
    filename: `${schema.name}.module.css`,
    content: `.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.dialog {
  background: #fff;
  border-radius: 0.75rem;
  max-width: 28rem;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  outline: none;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
}

.body {
  padding: 1.25rem;
}
`,
  };
}

function generateCardStyles(schema: ComponentSchema): GeneratedFile {
  return {
    filename: `${schema.name}.module.css`,
    content: `.root {
  border-radius: 0.75rem;
  overflow: hidden;
  background: #fff;
}

.elevated {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.outlined {
  border: 1px solid #e5e7eb;
}

.flat {
  background: #f9fafb;
}

.header {
  padding: 1rem 1.25rem;
  font-weight: 600;
  border-bottom: 1px solid #f3f4f6;
}

.body {
  padding: 1.25rem;
}

.footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid #f3f4f6;
  background: #f9fafb;
}
`,
  };
}

function generateSelectStyles(schema: ComponentSchema): GeneratedFile {
  return {
    filename: `${schema.name}.module.css`,
    content: `.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
}

.root {
  padding: 0.5rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  outline: none;
}

.root:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
`,
  };
}

export function generateStoriesFile(schema: ComponentSchema): GeneratedFile {
  if (schema.name === "Modal") {
    const content = `import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal isOpen={open} title="Confirm action" onClose={() => setOpen(false)}>
          <p>Are you sure you want to continue?</p>
        </Modal>
      </>
    );
  },
};
`;
    return { filename: `${schema.name}.stories.tsx`, content };
  }

  const variantValues = schema.props?.variant?.values ?? ["primary"];
  const sizeValues = schema.props?.size?.values ?? ["md"];
  const hasChildren = schema.slots.some((s) => s.name === "children");

  const content = `import type { Meta, StoryObj } from "@storybook/react";
import { ${schema.name} } from "./${schema.name}";

const meta: Meta<typeof ${schema.name}> = {
  title: "Components/${schema.name}",
  component: ${schema.name},
  tags: ["autodocs"],
  argTypes: {
${Object.entries(schema.props ?? {})
  .map(([name, prop]) => {
    if (prop.type === "enum" && prop.values) {
      return `    ${name}: { control: "select", options: ${JSON.stringify(prop.values)} },`;
    }
    if (prop.type === "boolean") {
      return `    ${name}: { control: "boolean" },`;
    }
    return `    ${name}: { control: "text" },`;
  })
  .join("\n")}
  },
};

export default meta;
type Story = StoryObj<typeof ${schema.name}>;

export const Default: Story = {
  args: {
${Object.entries(schema.props ?? {})
  .map(([name, prop]) => {
    const def = defaultValueForProp(prop);
    return def !== undefined ? `    ${name}: ${def},` : null;
  })
  .filter(Boolean)
  .join("\n")}
    ${hasChildren ? `children: "${schema.name}",` : ""}
  },
};

export const AllVariants: Story = {
  ${schema.props?.variant ? `render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
${variantValues
  .map(
    (v) =>
      `      <${schema.name} variant="${v}"${hasChildren ? `>${schema.name} ${v}</${schema.name}>` : " />"}`,
  )
  .join("\n")}
    </div>
  ),` : "args: {}"}
};

export const AllSizes: Story = {
  ${schema.props?.size ? `render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
${sizeValues
  .map(
    (s) =>
      `      <${schema.name} size="${s}"${hasChildren ? `>Size ${s}</${schema.name}>` : " />"}`,
  )
  .join("\n")}
    </div>
  ),` : "args: {}"}
};
`;

  return { filename: `${schema.name}.stories.tsx`, content };
}

export function generateTestFile(schema: ComponentSchema): GeneratedFile {
  if (schema.name === "Modal") {
    const content = `import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders dialog when open", () => {
    render(
      <Modal isOpen title="Test modal" onClose={() => {}}>
        Hello
      </Modal>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        Hidden
      </Modal>,
    );
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen title="Close me" onClose={onClose}>
        Content
      </Modal>,
    );
    await user.click(screen.getByLabelText("Close dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
`;
    return { filename: `${schema.name}.test.tsx`, content };
  }

  const hasChildren = schema.slots.some((s) => s.name === "children");
  const hasOnClick = schema.events.includes("onClick");
  const role = getTestRole(schema);
  const name = schema.name;
  const open = hasChildren ? `<${name}>Hello</${name}>` : `<${name} />`;
  const openClick = hasChildren ? `<${name} onClick={handleClick}>Click</${name}>` : `<${name} onClick={handleClick} />`;
  const openDisabled = hasChildren ? `<${name} disabled>Disabled</${name}>` : `<${name} disabled />`;
  const openKeyboard = hasChildren ? `<${name} onClick={handleClick}>Press</${name}>` : `<${name} onClick={handleClick} />`;

  const content = `import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ${name} } from "./${name}";

describe("${name}", () => {
  it("renders without crashing", () => {
    render(${open});
    ${hasChildren ? 'expect(screen.getByText("Hello")).toBeInTheDocument();' : `expect(screen.getByRole("${role}")).toBeInTheDocument();`}
  });

${
  hasOnClick
    ? `  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(${openClick});
    await user.click(screen.getByRole("${role}"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });`
    : ""
}

${
  schema.props?.disabled
    ? `  it("respects disabled state", () => {
    render(${openDisabled});
    expect(screen.getByRole("${role}")).toBeDisabled();
  });`
    : ""
}
${
  schema.a11y?.keyboard?.length
    ? `
  it("handles keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(${openKeyboard});
    screen.getByRole("${role}").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });`
    : ""
}
});
`;

  return { filename: `${schema.name}.test.tsx`, content };
}

function getTestRole(schema: ComponentSchema): string {
  if (schema.a11y?.role === "textbox" || schema.name === "Input") return "textbox";
  if (schema.a11y?.role === "combobox" || schema.name === "Select") return "combobox";
  if (schema.a11y?.role === "status") return "status";
  if (schema.a11y?.role === "region") return "region";
  if (schema.events.includes("onClick") || schema.a11y?.role === "button") return "button";
  return schema.a11y?.role ?? "button";
}

export function generateIndexFile(schema: ComponentSchema): GeneratedFile {
  return {
    filename: "index.ts",
    content: `export { ${schema.name} } from "./${schema.name}";
export type { ${schema.name}Props } from "./${schema.name}";
`,
  };
}

export function generateReadmeFile(schema: ComponentSchema): GeneratedFile {
  const propsTable = Object.entries(schema.props ?? {})
    .map(([name, prop]) => {
      const type =
        prop.type === "enum" ? prop.values?.join(" \\| ") ?? "enum" : prop.type;
      const def = prop.default !== undefined ? String(prop.default) : "—";
      return `| \`${name}\` | \`${type}\` | ${def} | ${prop.description ?? "—"} |`;
    })
    .join("\n");

  const content = `# ${schema.name}

${schema.description ?? `Generated ${schema.name} component.`}

> Generated by [Component Forge](https://github.com) — edit the schema and re-run \`forge generate\`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
${propsTable || "| — | — | — | — |"}

## Accessibility

${schema.a11y?.role ? `- Role: \`${schema.a11y.role}\`` : "- No explicit role"}
${schema.a11y?.keyboard?.length ? `- Keyboard: ${schema.a11y.keyboard.join(", ")}` : ""}
${schema.a11y?.aria?.length ? `- ARIA: ${schema.a11y.aria.join(", ")}` : ""}

## Usage

\`\`\`tsx
import { ${schema.name} } from "@component-forge/ui/${getComponentFolderName(schema.name)}";

<${schema.name}${schema.slots.some((s) => s.name === "children") ? ">Content</${schema.name}>" : " />"}
\`\`\`
`;

  return { filename: "README.md", content };
}

export function generateAllTemplates(schema: ComponentSchema): GeneratedFile[] {
  return [
    generateComponentFile(schema),
    generateStylesFile(schema),
    generateStoriesFile(schema),
    generateTestFile(schema),
    generateIndexFile(schema),
    generateReadmeFile(schema),
  ];
}
