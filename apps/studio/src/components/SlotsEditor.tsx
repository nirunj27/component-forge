import type { SlotDefinition } from "@component-forge/schema";

interface SlotsEditorProps {
  slots: SlotDefinition[];
  onChange: (slots: SlotDefinition[]) => void;
}

export function SlotsEditor({ slots, onChange }: SlotsEditorProps) {
  function updateSlot(index: number, patch: Partial<SlotDefinition>) {
    onChange(slots.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function removeSlot(index: number) {
    onChange(slots.filter((_, i) => i !== index));
  }

  function addSlot() {
    onChange([...slots, { name: "footer", required: false }]);
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Slots</h3>
        <button type="button" className="btn btn-sm" onClick={addSlot}>
          + Add slot
        </button>
      </div>

      {slots.length === 0 ? (
        <p className="muted">No slots defined.</p>
      ) : (
        <div className="stack">
          {slots.map((slot, index) => (
            <div key={index} className="card-row grid-3">
              <label>
                Name
                <input
                  value={slot.name}
                  onChange={(e) => updateSlot(index, { name: e.target.value })}
                />
              </label>
              <label>
                Description
                <input
                  value={slot.description ?? ""}
                  onChange={(e) => updateSlot(index, { description: e.target.value })}
                />
              </label>
              <div className="row-between align-end">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={slot.required ?? false}
                    onChange={(e) => updateSlot(index, { required: e.target.checked })}
                  />
                  Required
                </label>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => removeSlot(index)}
                >
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
