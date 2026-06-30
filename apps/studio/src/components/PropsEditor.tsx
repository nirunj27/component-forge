import type { PropDefinition } from "@component-forge/schema";

interface PropsEditorProps {
  props: Record<string, PropDefinition>;
  onChange: (props: Record<string, PropDefinition>) => void;
}

const PROP_TYPES: PropDefinition["type"][] = ["string", "number", "boolean", "enum"];

export function PropsEditor({ props, onChange }: PropsEditorProps) {
  const entries = Object.entries(props);

  function updateProp(name: string, patch: Partial<PropDefinition>) {
    onChange({ ...props, [name]: { ...props[name]!, ...patch } });
  }

  function renameProp(oldName: string, newName: string) {
    if (!newName || newName === oldName || props[newName]) return;
    const next = { ...props };
    next[newName] = next[oldName]!;
    delete next[oldName];
    onChange(next);
  }

  function removeProp(name: string) {
    const next = { ...props };
    delete next[name];
    onChange(next);
  }

  function addProp() {
    let i = 1;
    let name = "newProp";
    while (props[name]) {
      name = `newProp${i++}`;
    }
    onChange({
      ...props,
      [name]: { type: "string", default: "" },
    });
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Props</h3>
        <button type="button" className="btn btn-sm" onClick={addProp}>
          + Add prop
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="muted">No props defined.</p>
      ) : (
        <div className="stack">
          {entries.map(([name, prop]) => (
            <div key={name} className="card-row">
              <div className="grid-3">
                <label>
                  Name
                  <input
                    value={name}
                    onChange={(e) => renameProp(name, e.target.value)}
                    placeholder="variant"
                  />
                </label>
                <label>
                  Type
                  <select
                    value={prop.type}
                    onChange={(e) =>
                      updateProp(name, {
                        type: e.target.value as PropDefinition["type"],
                        values: e.target.value === "enum" ? ["a", "b"] : undefined,
                      })
                    }
                  >
                    {PROP_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Default
                  <input
                    value={String(prop.default ?? "")}
                    onChange={(e) => {
                      let val: string | number | boolean = e.target.value;
                      if (prop.type === "boolean") val = e.target.value === "true";
                      else if (prop.type === "number") val = Number(e.target.value);
                      updateProp(name, { default: val });
                    }}
                  />
                </label>
              </div>

              {prop.type === "enum" && (
                <label>
                  Enum values (comma-separated)
                  <input
                    value={(prop.values ?? []).join(", ")}
                    onChange={(e) =>
                      updateProp(name, {
                        values: e.target.value
                          .split(",")
                          .map((v) => v.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </label>
              )}

              <label>
                Description
                <input
                  value={prop.description ?? ""}
                  onChange={(e) => updateProp(name, { description: e.target.value })}
                />
              </label>

              <div className="row-between">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={prop.required ?? false}
                    onChange={(e) => updateProp(name, { required: e.target.checked })}
                  />
                  Required
                </label>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => removeProp(name)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
