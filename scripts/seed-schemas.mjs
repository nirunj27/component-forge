import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "../schemas");
const items = [
  ["Checkbox", "inputs", "Boolean toggle for forms"],
  ["Toggle", "inputs", "On/off toggle"],
  ["Switch", "inputs", "Binary switch"],
  ["Alert", "display", "Status message banner"],
  ["Tooltip", "overlay", "Hover hint"],
  ["Tag", "display", "Removable label"],
  ["Chip", "display", "Choice chip"],
  ["Spinner", "display", "Loading spinner"],
  ["Progress", "display", "Progress indicator"],
  ["Divider", "layout", "Section separator"],
  ["Link", "inputs", "Styled anchor"],
  ["Heading", "display", "Typography heading"],
  ["Radio", "inputs", "Single choice input"],
  ["Pill", "display", "Rounded status pill"],
];

for (const [name, category, description] of items) {
  const slug = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  const yaml = `name: ${name}
description: ${description}
category: ${category}

props:
  variant:
    type: enum
    values: [primary, secondary]
    default: primary
  disabled:
    type: boolean
    default: false

slots:
  - name: children
    required: false
    description: Content

a11y:
  role: status
`;
  writeFileSync(join(dir, `${slug}.schema.yaml`), yaml);
}

console.log(`Wrote ${items.length} schemas`);
