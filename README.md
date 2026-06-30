# Component Forge

**Schema-driven React component generator** — define components in YAML, generate TypeScript, CSS modules, Storybook stories, tests, and docs from a single source of truth.

## Problem it solves

Frontend teams waste time creating inconsistent component boilerplate. Component Forge enforces:

- Consistent file structure and naming
- Typed props with defaults
- Accessibility attributes by default
- Storybook + test scaffolding on every generate

## Monorepo structure

```
component-forge/
├── schemas/                    # Component definitions (YAML)
├── apps/
│   ├── api/                    # JSON Server mock API
│   └── playground/             # Demo app + component registry UI
├── packages/
│   ├── schema/                 # Zod validation
│   ├── templates-react/        # Code generation templates
│   ├── engine/                 # Core generator logic
│   ├── cli/                    # `forge` CLI
│   └── ui/                     # Generated components
```

## Quick start

```bash
pnpm install
pnpm build
pnpm generate:all

# Run API + playground + studio
pnpm dev:all

# Or studio only (needs API)
pnpm dev:studio
```

- Playground: http://localhost:5173
- **Studio: http://localhost:5175**
- JSON Server API: http://localhost:3001
- Storybook: `pnpm storybook` → http://localhost:6006

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm generate:all` | Generate all components from schemas |
| `pnpm dev:all` | JSON Server + playground |
| `pnpm dev:studio` | API + Web Studio |
| `pnpm studio` | Web Studio only (port 5175) |
| `pnpm test` | Run Vitest on generated components |
| `pnpm storybook` | Component Storybook |
| `pnpm plugins` | List plugins from `forge.config.ts` |

## Plugin SDK

Extend the generator without forking core code. See [packages/plugin-sdk/README.md](packages/plugin-sdk/README.md).

```typescript
// forge.config.ts
import { defineConfig } from "@component-forge/plugin-sdk";
import { testIdPlugin } from "@component-forge/plugin-testid";

export default defineConfig({
  plugins: [testIdPlugin()],
});
```

| Package | Description |
|---------|-------------|
| `@component-forge/plugin-sdk` | `definePlugin`, hooks, `applyPlugins` |
| `@component-forge/plugin-testid` | Injects `data-testid` into generated `.tsx` |

```bash
pnpm plugins       # list active plugins
pnpm generate:all  # runs with plugins applied
```
| `pnpm format` | Prettier |

## Components (6)

| Component | Category | Schema |
|-----------|----------|--------|
| Button | inputs | `button.schema.yaml` |
| Input | inputs | `input.schema.yaml` |
| Select | inputs | `select.schema.yaml` |
| Badge | display | `badge.schema.yaml` |
| Card | layout | `card.schema.yaml` |
| Modal | overlay | `modal.schema.yaml` |

## JSON Server API

| Endpoint | Description |
|----------|-------------|
| `GET /components` | Component registry |
| `GET /categories` | UI categories |
| `GET /tokens` | Design tokens |
| `GET /stats` | Generation stats |

The playground **Registry** tab fetches this data via Axios (with interceptors).

### Studio API (visual editor)

| Endpoint | Description |
|----------|-------------|
| `GET /api/schemas` | List schema slugs |
| `GET /api/schemas/:slug` | Load schema as JSON |
| `PUT /api/schemas/:slug` | Save schema YAML to disk |
| `POST /api/schemas` | Create new schema |
| `POST /api/validate` | Validate schema body |
| `POST /api/generate` | Save + generate React files |

## Schema format

```yaml
name: Button
description: Primary action control
category: inputs

props:
  variant:
    type: enum
    values: [primary, secondary, ghost]
    default: primary

slots:
  - name: children
    required: true

events:
  - onClick

a11y:
  role: button
  keyboard: [Enter, Space]
```

## Generated output (per component)

```
packages/ui/src/components/button/
├── Button.tsx
├── Button.module.css
├── Button.stories.tsx
├── Button.test.tsx
├── index.ts
└── README.md
```

## Tech stack

- TypeScript, Zod, YAML
- pnpm + Turborepo
- Vite + React (playground)
- JSON Server (mock API)
- Vitest + Testing Library
- Storybook 8
- ESLint + Prettier
- Axios interceptors

## Roadmap

- [x] Phase 1: Schema + CLI + generator
- [x] Phase 2: JSON Server, Vitest, Storybook, 6 components
- [x] Phase 3: Web Studio (visual schema editor)
- [x] Phase 4: Plugin SDK + testid example plugin
- [ ] CI deploy

## License

MIT
