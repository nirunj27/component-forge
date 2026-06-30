import type { ComponentSchema, PropDefinition } from "@component-forge/schema";

interface GeneratedFile {
  filename: string;
  content: string;
}

const META_PROPS = new Set(["loading", "error"]);

const FORM_TITLES: Record<string, string> = {
  LoginForm: "Sign in",
  RegisterForm: "Create account",
  ForgotPassword: "Forgot password",
  ResetPassword: "Reset password",
  OtpVerification: "Verify your code",
};

const SUBMIT_LABELS: Record<string, string> = {
  LoginForm: "Sign in",
  RegisterForm: "Create account",
  ForgotPassword: "Send reset link",
  ResetPassword: "Update password",
  OtpVerification: "Verify",
  ForgotPasswordForm: "Send reset link",
};

export function shouldUseFormGenerator(schema: ComponentSchema): boolean {
  if (schema.name === "Select" || schema.options?.length) return false;
  if (isBinaryControl(schema)) return false;
  return (
    schema.events.includes("onSubmit") ||
    schema.category === "authentication" ||
    schema.name.endsWith("Form")
  );
}

export function shouldUseTableGenerator(schema: ComponentSchema): boolean {
  const n = schema.name.toLowerCase();
  return n.includes("table") || schema.category === "tables";
}

export function shouldUseVirtualTable(schema: ComponentSchema): boolean {
  const n = schema.name.toLowerCase();
  return n.includes("virtualized") || n.includes("infinite-scroll");
}

export function shouldUseNavigationGenerator(schema: ComponentSchema): boolean {
  return schema.category === "navigation" && !schema.name.includes("Drawer");
}

export function isBinaryControl(schema: ComponentSchema): boolean {
  const n = schema.name.toLowerCase();
  return (
    n.includes("checkbox") ||
    n === "toggle" ||
    n.includes("toggle switch") ||
    n.includes("switch") ||
    n.includes("radio")
  );
}

export function isTextareaControl(schema: ComponentSchema): boolean {
  return schema.name.toLowerCase().includes("textarea");
}

export function inferInputType(propName: string, prop: PropDefinition): string {
  const n = propName.toLowerCase();
  if (n.includes("password") || n.includes("confirm")) return "password";
  if (n.includes("email")) return "email";
  if (n.includes("phone") || n.includes("tel")) return "tel";
  if (n.includes("search") || n.includes("query")) return "search";
  if (n.includes("otp") || n.includes("code")) return "text";
  if (prop.type === "number" || n.includes("quantity") || n.includes("amount")) return "number";
  if (n.includes("url")) return "url";
  return "text";
}

function humanize(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
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

function buildPropsInterface(schema: ComponentSchema): string {
  const lines: string[] = [];
  for (const [propName, prop] of Object.entries(schema.props ?? {})) {
    const optional = prop.required ? "" : "?";
    const comment = prop.description ? `  /** ${prop.description} */\n` : "";
    lines.push(`${comment}  ${propName}${optional}: ${tsTypeForProp(prop)};`);
  }
  for (const slot of schema.slots) {
    const optional = slot.required ? "" : "?";
    lines.push(`  ${slot.name}${optional}: React.ReactNode;`);
  }
  for (const event of schema.events) {
    if (event === "onSubmit") {
      lines.push(`  ${event}?: (event: React.FormEvent<HTMLFormElement>) => void;`);
    } else if (event === "onChange") {
      lines.push(`  ${event}?: (event: React.ChangeEvent<HTMLInputElement>) => void;`);
    } else if (event === "onClick") {
      lines.push(`  ${event}?: (event: React.MouseEvent<HTMLElement>) => void;`);
    } else {
      lines.push(`  ${event}?: (event: React.MouseEvent<HTMLElement>) => void;`);
    }
  }
  return `export interface ${schema.name}Props {\n${lines.join("\n")}\n}`;
}

function buildDestructuredProps(schema: ComponentSchema): string {
  const withDefaults = Object.entries(schema.props ?? {}).map(([name, prop]) => {
    const def = defaultValueForProp(prop);
    return def !== undefined ? `${name} = ${def}` : name;
  });
  const slots = schema.slots.map((s) => s.name);
  const events = schema.events ?? [];
  return [...withDefaults, ...slots, ...events].join(", ");
}

function buildFormFieldsJsx(schema: ComponentSchema): string {
  const fields: string[] = [];

  for (const [name, prop] of Object.entries(schema.props ?? {})) {
    if (META_PROPS.has(name)) continue;

    const label = humanize(name);

    if (prop.type === "boolean") {
      fields.push(`      <label className={styles.fieldCheckbox}>
        <input type="checkbox" checked={${name}} readOnly className={styles.checkbox} />
        <span>${label}</span>
      </label>`);
      continue;
    }

    if (prop.type === "enum" && prop.values?.length) {
      const options = prop.values
        .map((v) => `          <option value="${v}">${v}</option>`)
        .join("\n");
      fields.push(`      <label className={styles.field}>
        <span className={styles.label}>${label}</span>
        <select className={styles.input} defaultValue={${name}} disabled>
${options}
        </select>
      </label>`);
      continue;
    }

    if (prop.type === "number") {
      fields.push(`      <label className={styles.field}>
        <span className={styles.label}>${label}</span>
        <input type="number" className={styles.input} defaultValue={${name}} name="${name}" placeholder="${label}" />
      </label>`);
      continue;
    }

    const inputType = inferInputType(name, prop);
    const extra =
      name.toLowerCase().includes("code") || name.toLowerCase().includes("otp")
        ? ' maxLength={6} autoComplete="one-time-code"'
        : "";

    fields.push(`      <label className={styles.field}>
        <span className={styles.label}>${label}</span>
        <input
          type="${inputType}"
          className={styles.input}
          defaultValue={${name}}
          name="${name}"
          placeholder="${label}"
          ${extra}
        />
      </label>`);
  }

  return fields.join("\n\n");
}

export function generateFormFile(schema: ComponentSchema): GeneratedFile {
  const propsInterface = buildPropsInterface(schema);
  const destructured = buildDestructuredProps(schema);
  const title = FORM_TITLES[schema.name] ?? humanize(schema.name.replace(/Form$/, ""));
  const submit = SUBMIT_LABELS[schema.name] ?? "Submit";
  const fields = buildFormFieldsJsx(schema);

  const content = `import React from "react";
import styles from "./${schema.name}.module.css";

${propsInterface}

/**
 * ${schema.description ?? `${schema.name} component`}
 * @generated by Component Forge — edit schema and re-run forge generate
 */
export function ${schema.name}({ ${destructured} }: ${schema.name}Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>${title}</h2>
      {error ? (
        <div className={styles.error} role="alert">
          {error}
        </div>
      ) : null}

${fields}

      <button type="submit" className={styles.submit} disabled={loading}>
        {loading ? "Please wait…" : "${submit}"}
      </button>
    </form>
  );
}

${schema.name}.displayName = "${schema.name}";
`;

  return { filename: `${schema.name}.tsx`, content };
}

export function generateFormStyles(schema: ComponentSchema): GeneratedFile {
  return {
    filename: `${schema.name}.module.css`,
    content: `.root {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 24rem;
  padding: 1.5rem;
  font-family: inherit;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.input {
  padding: 0.625rem 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
}

.input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.fieldCheckbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
}

.checkbox {
  width: 1rem;
  height: 1rem;
}

.error {
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  color: #b91c1c;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
}

.submit {
  margin-top: 0.25rem;
  padding: 0.625rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  color: #fff;
  cursor: pointer;
  background: #2563eb;
  border: none;
  border-radius: 0.5rem;
  transition: background 0.15s ease;
}

.submit:hover:not(:disabled) {
  background: #1d4ed8;
}

.submit:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
`,
  };
}

export function generateBinaryControlFile(schema: ComponentSchema): GeneratedFile {
  const propsInterface = buildPropsInterface(schema);
  const destructured = buildDestructuredProps(schema);
  const n = schema.name.toLowerCase();
  const isRadio = n.includes("radio");
  const inputType = isRadio ? "radio" : "checkbox";
  const labelExpr = schema.props?.label ? "{label}" : `"${humanize(schema.name)}"`;

  const content = `import React from "react";
import styles from "./${schema.name}.module.css";

${propsInterface}

export function ${schema.name}({ ${destructured} }: ${schema.name}Props) {
  const inputId = React.useId();

  return (
    <label className={styles.root} htmlFor={inputId}>
      <input
        id={inputId}
        type="${inputType}"
        className={styles.control}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={styles.label}>${labelExpr}</span>
    </label>
  );
}

${schema.name}.displayName = "${schema.name}";
`;

  return { filename: `${schema.name}.tsx`, content };
}

export function generateBinaryControlStyles(schema: ComponentSchema): GeneratedFile {
  return {
    filename: `${schema.name}.module.css`,
    content: `.root {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: inherit;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
}

.control {
  width: 1rem;
  height: 1rem;
  accent-color: #2563eb;
}

.label {
  user-select: none;
}
`,
  };
}

export function generateTableFile(schema: ComponentSchema): GeneratedFile {
  const propsInterface = buildPropsInterface(schema);
  const destructured = buildDestructuredProps(schema);

  const content = `import React from "react";
import styles from "./${schema.name}.module.css";

${propsInterface}

export function ${schema.name}({ ${destructured} }: ${schema.name}Props) {
  const rows = [
    { id: "1", name: "Alex Rivera", role: "Developer", status: "Active" },
    { id: "2", name: "Sam Chen", role: "Designer", status: "Active" },
    { id: "3", name: "Jordan Lee", role: "Viewer", status: "Pending" },
  ];

  return (
    <div className={styles.wrapper} role="region" aria-label="${schema.name}">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.role}</td>
              <td>
                <span className={styles.badge}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading ? <p className={styles.loading}>Loading…</p> : null}
      {empty ? <p className={styles.empty}>No data available</p> : null}
    </div>
  );
}

${schema.name}.displayName = "${schema.name}";
`;

  return { filename: `${schema.name}.tsx`, content };
}

export function generateVirtualTableFile(schema: ComponentSchema): GeneratedFile {
  const propsInterface = buildPropsInterface(schema);
  const destructured = buildDestructuredProps(schema);

  const content = `import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import styles from "./${schema.name}.module.css";

${propsInterface}

const DEMO_ROWS = Array.from({ length: 100 }, (_, i) => ({
  id: String(i + 1),
  name: \`User \${i + 1}\`,
  role: i % 3 === 0 ? "Developer" : i % 3 === 1 ? "Designer" : "Viewer",
  status: i % 4 === 0 ? "Pending" : "Active",
}));

export function ${schema.name}({ ${destructured} }: ${schema.name}Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const rows = empty ? [] : DEMO_ROWS;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 8,
  });

  return (
    <div className={styles.wrapper} role="region" aria-label="${schema.name}">
      <div className={styles.headerRow} role="row">
        <span role="columnheader">Name</span>
        <span role="columnheader">Role</span>
        <span role="columnheader">Status</span>
      </div>
      <div ref={parentRef} className={styles.scrollBody} role="rowgroup">
        <div
          className={styles.virtualInner}
          style={{ height: \`\${rowVirtualizer.getTotalSize()}px\` }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index]!;
            return (
              <div
                key={row.id}
                className={styles.row}
                role="row"
                style={{
                  transform: \`translateY(\${virtualRow.start}px)\`,
                  height: \`\${virtualRow.size}px\`,
                }}
              >
                <span role="cell">{row.name}</span>
                <span role="cell">{row.role}</span>
                <span role="cell">
                  <span className={styles.badge}>{row.status}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {loading ? <p className={styles.loading}>Loading…</p> : null}
      {empty ? <p className={styles.empty}>No data available</p> : null}
    </div>
  );
}

${schema.name}.displayName = "${schema.name}";
`;

  return { filename: `${schema.name}.tsx`, content };
}

export function generateVirtualTableStyles(schema: ComponentSchema): GeneratedFile {
  return {
    filename: `${schema.name}.module.css`,
    content: `.wrapper {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;
}

.headerRow,
.row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  border-bottom: 1px solid #f3f4f6;
}

.headerRow {
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
}

.scrollBody {
  max-height: 320px;
  overflow: auto;
}

.virtualInner {
  position: relative;
  width: 100%;
}

.row {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  align-items: center;
}

.badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #1d4ed8;
  background: #dbeafe;
  border-radius: 9999px;
}

.loading,
.empty {
  padding: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}
`,
  };
}

export function generateTableStyles(schema: ComponentSchema): GeneratedFile {
  return {
    filename: `${schema.name}.module.css`,
    content: `.wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #fff;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.table th,
.table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #f3f4f6;
}

.table th {
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
}

.badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #1d4ed8;
  background: #dbeafe;
  border-radius: 9999px;
}

.loading,
.empty {
  padding: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}
`,
  };
}

export function generateNavigationFile(schema: ComponentSchema): GeneratedFile {
  const propsInterface = buildPropsInterface(schema);
  const destructured = buildDestructuredProps(schema);
  const n = schema.name.toLowerCase();

  let body = "";
  if (n.includes("tabs")) {
    body = `      <div className={styles.tabs} role="tablist">
        {["Overview", "Details", "Settings"].map((tab, i) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            className={activeIndex === i ? styles.tabActive : styles.tab}
            onClick={onClick}
          >
            {tab}
          </button>
        ))}
      </div>`;
  } else if (n.includes("breadcrumb")) {
    body = `      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <a href="#">Home</a>
        <span>/</span>
        <a href="#">Projects</a>
        <span>/</span>
        <span aria-current="page">Current</span>
      </nav>`;
  } else if (n.includes("pagination")) {
    body = `      <nav className={styles.pagination} aria-label="Pagination">
        <button type="button" className={styles.pageBtn}>Prev</button>
        {[1, 2, 3].map((p) => (
          <button key={p} type="button" className={p === 2 ? styles.pageActive : styles.pageBtn}>{p}</button>
        ))}
        <button type="button" className={styles.pageBtn}>Next</button>
      </nav>`;
  } else if (n.includes("stepper")) {
    body = `      <ol className={styles.stepper}>
        {["Account", "Profile", "Review"].map((step, i) => (
          <li key={step} className={i <= activeIndex ? styles.stepDone : styles.step}>
            <span className={styles.stepNum}>{i + 1}</span>
            {step}
          </li>
        ))}
      </ol>`;
  } else {
    body = `      <nav className={styles.nav} aria-label="${schema.name}">
        {["Home", "Components", "Docs", "Settings"].map((item) => (
          <a key={item} href="#" className={styles.link} onClick={onClick}>{item}</a>
        ))}
      </nav>`;
  }

  const content = `import React from "react";
import styles from "./${schema.name}.module.css";

${propsInterface}

export function ${schema.name}({ ${destructured} }: ${schema.name}Props) {
  return (
    <div className={[styles.root, collapsed && styles.collapsed].filter(Boolean).join(" ")}>
${body}
      {children}
    </div>
  );
}

${schema.name}.displayName = "${schema.name}";
`;

  return { filename: `${schema.name}.tsx`, content };
}

export function generateNavigationStyles(schema: ComponentSchema): GeneratedFile {
  const n = schema.name.toLowerCase();
  const extra = n.includes("tabs")
    ? `.tabs { display: flex; gap: 0.25rem; border-bottom: 1px solid #e5e7eb; }
.tab, .tabActive { padding: 0.625rem 1rem; font-size: 0.875rem; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; }
.tabActive { color: #2563eb; border-bottom-color: #2563eb; font-weight: 600; }`
    : n.includes("breadcrumb")
      ? `.breadcrumb { display: flex; gap: 0.5rem; align-items: center; font-size: 0.875rem; color: #6b7280; }
.breadcrumb a { color: #2563eb; text-decoration: none; }`
      : n.includes("pagination")
        ? `.pagination { display: flex; gap: 0.25rem; align-items: center; }
.pageBtn, .pageActive { min-width: 2rem; padding: 0.375rem 0.625rem; font-size: 0.875rem; border: 1px solid #e5e7eb; border-radius: 0.375rem; background: #fff; cursor: pointer; }
.pageActive { color: #fff; background: #2563eb; border-color: #2563eb; }`
        : n.includes("stepper")
          ? `.stepper { display: flex; gap: 1rem; list-style: none; padding: 0; margin: 0; }
.step, .stepDone { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #9ca3af; }
.stepDone { color: #2563eb; font-weight: 500; }
.stepNum { display: inline-flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; font-size: 0.75rem; border-radius: 9999px; background: #e5e7eb; }
.stepDone .stepNum { color: #fff; background: #2563eb; }`
          : `.nav { display: flex; gap: 1rem; align-items: center; }
.link { font-size: 0.875rem; font-weight: 500; color: #374151; text-decoration: none; }
.link:hover { color: #2563eb; }`;

  return {
    filename: `${schema.name}.module.css`,
    content: `.root {
  width: 100%;
  font-family: inherit;
}

.collapsed {
  opacity: 0.85;
}

${extra}
`,
  };
}