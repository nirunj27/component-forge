import type { ComponentSchema } from "@component-forge/schema";

export type CatalogArchetype =
  | "button"
  | "form"
  | "form-select"
  | "overlay"
  | "display"
  | "navigation"
  | "layout"
  | "data"
  | "search"
  | "dashboard"
  | "auth"
  | "media"
  | "utility"
  | "ecommerce"
  | "admin"
  | "advanced";

export function slugFromName(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function authBase(name: string, description: string, category: string) {
  return {
    name,
    description,
    category,
    slots: [] as ComponentSchema["slots"],
    events: ["onSubmit"] as string[],
  };
}

function buildAuthSchema(name: string, description: string, category: string): ComponentSchema {
  const base = authBase(name, description, category);
  const meta = {
    loading: { type: "boolean" as const, default: false },
    error: { type: "string" as const, description: "Form-level error" },
  };

  switch (name) {
    case "LoginForm":
      return {
        ...base,
        props: {
          email: { type: "string", default: "", description: "Email address" },
          password: { type: "string", default: "", description: "Password" },
          rememberMe: { type: "boolean", default: false },
          ...meta,
        },
      };
    case "RegisterForm":
      return {
        ...base,
        props: {
          name: { type: "string", default: "", description: "Full name" },
          email: { type: "string", default: "", description: "Email address" },
          password: { type: "string", default: "", description: "Password" },
          confirmPassword: { type: "string", default: "", description: "Confirm password" },
          ...meta,
        },
      };
    case "ForgotPassword":
      return {
        ...base,
        props: {
          email: { type: "string", default: "", description: "Email address" },
          ...meta,
        },
      };
    case "ResetPassword":
      return {
        ...base,
        props: {
          password: { type: "string", default: "", description: "New password" },
          confirmPassword: { type: "string", default: "", description: "Confirm password" },
          ...meta,
        },
      };
    case "OtpVerification":
      return {
        ...base,
        props: {
          code: { type: "string", default: "", description: "6-digit verification code" },
          ...meta,
        },
      };
    default:
      return {
        ...base,
        props: {
          email: { type: "string", default: "", description: "Email address" },
          password: { type: "string", default: "", description: "Password" },
          ...meta,
        },
      };
  }
}

export function buildStarterSchema(
  name: string,
  description: string,
  category: string,
  archetype: CatalogArchetype,
): ComponentSchema {
  const base = { name, description, category };

  switch (archetype) {
    case "button":
      return {
        ...base,
        props: {
          variant: {
            type: "enum",
            values: ["primary", "secondary", "ghost", "danger"],
            default: "primary",
            description: "Visual style",
          },
          size: { type: "enum", values: ["sm", "md", "lg"], default: "md" },
          disabled: { type: "boolean", default: false },
          loading: { type: "boolean", default: false },
        },
        slots: [{ name: "children", required: false, description: "Button label" }],
        events: ["onClick"],
        a11y: { role: "button", keyboard: ["Enter", "Space"] },
      };

    case "form":
      return {
        ...base,
        props: {
          label: { type: "string", description: "Field label" },
          value: { type: "string", default: "" },
          placeholder: { type: "string", default: "" },
          disabled: { type: "boolean", default: false },
          required: { type: "boolean", default: false },
          error: { type: "string", description: "Validation error message" },
        },
        slots: [],
        events: ["onChange", "onBlur"],
        a11y: { role: "textbox", keyboard: ["Tab"] },
      };

    case "form-select":
      return {
        ...base,
        props: {
          label: { type: "string", description: "Field label" },
          value: { type: "string", default: "" },
          disabled: { type: "boolean", default: false },
          placeholder: { type: "string", default: "Select an option" },
        },
        slots: [],
        events: ["onChange"],
        options: [
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
          { value: "c", label: "Option C" },
        ],
        a11y: { role: "combobox" },
      };

    case "overlay":
      return {
        ...base,
        props: {
          isOpen: { type: "boolean", default: false, description: "Visibility" },
          title: { type: "string", description: "Title text" },
        },
        slots: [{ name: "children", required: true, description: "Body content" }],
        events: ["onClose"],
        a11y: { role: "dialog", keyboard: ["Escape"], aria: ["aria-modal"] },
      };

    case "navigation":
      return {
        ...base,
        props: {
          activeIndex: { type: "number", default: 0, description: "Active item index" },
          collapsed: { type: "boolean", default: false },
        },
        slots: [
          { name: "children", required: false, description: "Navigation items" },
        ],
        events: ["onClick"],
        a11y: { role: "region" },
      };

    case "layout":
      return {
        ...base,
        props: {
          variant: {
            type: "enum",
            values: ["default", "compact", "spacious"],
            default: "default",
          },
          gap: { type: "enum", values: ["sm", "md", "lg"], default: "md" },
        },
        slots: [
          { name: "children", required: true, description: "Layout content" },
        ],
        events: [],
        a11y: { role: "region" },
      };

    case "data":
      return {
        ...base,
        props: {
          variant: {
            type: "enum",
            values: ["default", "bordered", "striped"],
            default: "default",
          },
          loading: { type: "boolean", default: false },
          empty: { type: "boolean", default: false },
        },
        slots: [
          { name: "children", required: false, description: "Row or cell content" },
          { name: "header", required: false, description: "Header area" },
          { name: "footer", required: false, description: "Footer area" },
        ],
        events: ["onClick"],
        a11y: { role: "region" },
      };

    case "search":
      return {
        ...base,
        props: {
          query: { type: "string", default: "" },
          placeholder: { type: "string", default: "Search…" },
          loading: { type: "boolean", default: false },
        },
        slots: [],
        events: ["onChange", "onClick"],
        a11y: { role: "textbox" },
      };

    case "dashboard":
      return {
        ...base,
        props: {
          title: { type: "string", description: "Widget title" },
          value: { type: "string", description: "Primary metric" },
          trend: {
            type: "enum",
            values: ["up", "down", "neutral"],
            default: "neutral",
          },
        },
        slots: [{ name: "children", required: false, description: "Widget body" }],
        events: [],
        a11y: { role: "region" },
      };

    case "auth":
      return buildAuthSchema(name, description, category);

    case "media":
      return {
        ...base,
        props: {
          src: { type: "string", description: "Media source URL" },
          alt: { type: "string", description: "Accessible description" },
          loading: { type: "boolean", default: false },
        },
        slots: [{ name: "children", required: false, description: "Caption or overlay" }],
        events: ["onClick"],
        a11y: { role: "region" },
      };

    case "utility":
      return {
        ...base,
        props: {
          value: { type: "string", default: "" },
          disabled: { type: "boolean", default: false },
        },
        slots: [{ name: "children", required: false }],
        events: ["onClick"],
        a11y: { role: "button" },
      };

    case "ecommerce":
      return {
        ...base,
        props: {
          price: { type: "number", default: 0 },
          currency: { type: "string", default: "USD" },
          quantity: { type: "number", default: 1 },
          inStock: { type: "boolean", default: true },
        },
        slots: [{ name: "children", required: false, description: "Product details" }],
        events: ["onClick"],
        a11y: { role: "region" },
      };

    case "admin":
      return {
        ...base,
        props: {
          status: {
            type: "enum",
            values: ["active", "inactive", "pending"],
            default: "active",
          },
          role: { type: "string", description: "User or entity role" },
        },
        slots: [{ name: "children", required: false }],
        events: ["onClick", "onChange"],
        a11y: { role: "region" },
      };

    case "advanced":
      return {
        ...base,
        props: {
          value: { type: "string", default: "" },
          readOnly: { type: "boolean", default: false },
          height: { type: "number", default: 320, description: "Editor height in px" },
        },
        slots: [{ name: "children", required: false }],
        events: ["onChange"],
        a11y: { role: "textbox" },
      };

    case "display":
    default:
      return {
        ...base,
        props: {
          variant: {
            type: "enum",
            values: ["primary", "secondary", "success", "warning", "error"],
            default: "primary",
          },
          size: { type: "enum", values: ["sm", "md", "lg"], default: "md" },
        },
        slots: [{ name: "children", required: false, description: "Content" }],
        events: ["onClick"],
        a11y: { role: "status" },
      };
  }
}
