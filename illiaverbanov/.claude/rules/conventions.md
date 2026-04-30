# General Conventions

1. **File naming:** kebab-case for non-component files (`use-game-state.ts`, `station-modal.styles.ts`); `PascalCase.tsx` for React component files. See `folder-structure.md` for the full folder/component-file rules.
2. **Dates:** ISO 8601 throughout (`2026-04-30`, not `04/30/2026` or `Apr 30`).
3. **Strict TypeScript:** strict mode is on for the whole project. Never disable it per file (`// @ts-nocheck`, `// @ts-ignore` without an explanation, project-wide opt-outs in `tsconfig.json`). If a single line genuinely needs an escape, use `// @ts-expect-error <one-line reason>`.
