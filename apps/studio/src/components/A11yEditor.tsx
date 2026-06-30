import type { ComponentSchema } from "@component-forge/schema";
import { A11Y_ROLES, EVENT_OPTIONS } from "../lib/defaults";

interface A11yEditorProps {
  a11y: ComponentSchema["a11y"];
  onChange: (a11y: ComponentSchema["a11y"]) => void;
}

export function A11yEditor({ a11y, onChange }: A11yEditorProps) {
  const value = a11y ?? {};

  function patch(p: Partial<NonNullable<ComponentSchema["a11y"]>>) {
    onChange({ ...value, ...p });
  }

  return (
    <section className="panel">
      <h3>Accessibility</h3>
      <div className="grid-2">
        <label>
          Role
          <select
            value={value.role ?? ""}
            onChange={(e) => patch({ role: e.target.value || undefined })}
          >
            <option value="">—</option>
            {A11Y_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <label>
          Keyboard keys (comma-separated)
          <input
            value={(value.keyboard ?? []).join(", ")}
            onChange={(e) =>
              patch({
                keyboard: e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean),
              })
            }
            placeholder="Enter, Space, Escape"
          />
        </label>
        <label className="span-2">
          ARIA attributes (comma-separated)
          <input
            value={(value.aria ?? []).join(", ")}
            onChange={(e) =>
              patch({
                aria: e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean),
              })
            }
            placeholder="aria-disabled, aria-busy"
          />
        </label>
      </div>
    </section>
  );
}

interface EventsEditorProps {
  events: string[];
  onChange: (events: string[]) => void;
}

export function EventsEditor({ events, onChange }: EventsEditorProps) {
  function toggle(event: string) {
    if (events.includes(event)) {
      onChange(events.filter((e) => e !== event));
    } else {
      onChange([...events, event]);
    }
  }

  return (
    <section className="panel">
      <h3>Events</h3>
      <div className="chips">
        {EVENT_OPTIONS.map((event) => (
          <label key={event} className={`chip ${events.includes(event) ? "active" : ""}`}>
            <input
              type="checkbox"
              checked={events.includes(event)}
              onChange={() => toggle(event)}
            />
            {event}
          </label>
        ))}
      </div>
    </section>
  );
}

interface OptionsEditorProps {
  options: ComponentSchema["options"];
  onChange: (options: ComponentSchema["options"]) => void;
}

export function OptionsEditor({ options, onChange }: OptionsEditorProps) {
  const list = options ?? [];

  function update(index: number, field: "value" | "label", val: string) {
    onChange(list.map((o, i) => (i === index ? { ...o, [field]: val } : o)));
  }

  function add() {
    onChange([...list, { value: "option", label: "Option" }]);
  }

  function remove(index: number) {
    onChange(list.filter((_, i) => i !== index));
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Select options</h3>
        <button type="button" className="btn btn-sm" onClick={add}>
          + Add option
        </button>
      </div>
      <p className="muted">Used for Select-like components</p>
      {list.map((opt, i) => (
        <div key={i} className="card-row grid-2">
          <label>
            Value
            <input value={opt.value} onChange={(e) => update(i, "value", e.target.value)} />
          </label>
          <label>
            Label
            <input value={opt.label} onChange={(e) => update(i, "label", e.target.value)} />
          </label>
          <button type="button" className="btn btn-danger btn-sm" onClick={() => remove(i)}>
            Remove
          </button>
        </div>
      ))}
    </section>
  );
}
