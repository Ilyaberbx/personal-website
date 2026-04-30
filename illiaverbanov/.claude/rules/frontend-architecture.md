# Frontend Architecture Rules

The web app follows a **smart hook + dumb component** pattern. A component file contains **only** the component (imports, props destructuring, and JSX). Types, constants, styles, and all runtime logic live in sibling files within the same feature folder.

## Folder layout

```
src/components/<feature-name>/
  <FeatureName>.tsx              ← dumb: imports the hook + styles, returns JSX
  use-<feature-name>.ts          ← smart: state, effects, handlers, derived values
  <feature-name>.module.css      ← styles (or <feature-name>.styles.ts for prop-dependent styles)
  <feature-name>.types.ts        ← (optional) local types/interfaces
  <feature-name>.constants.ts    ← (optional) module-local constants
  index.ts                       ← public re-export
```

See `folder-structure.md` for the casing and folder rules.

## Rules

1. **Component files are dumb.** No `useState`, `useEffect`, `useCallback`, handlers, inline `<style>` blocks, or inline type declarations. The **only** legal hook calls inside the component are `useXComponent()` (the feature hook) and `useMemo`/`useCallback` *only* when wrapping a value passed straight through to a child (not when computing logic).
2. **Hooks are smart and return one object.** `useXComponent()` owns all state, side effects, derived values, selectors, navigation, and handlers.
3. **Styles live next to the component.** Use either `<feature>.module.css` (preferred for static styling) or `<feature>.styles.ts` (when styles depend on props/state). The component imports styles; the hook does not.
4. **Types live in `<feature>.types.ts`.** Interfaces, prop types, and union types used by the screen/hook/styles go here; don't declare them inline.
5. **Constants live in `<feature>.constants.ts`.** Any module-local constant (option lists, copy, thresholds) that isn't already a shared token.
6. **Naming and folder layout follow `folder-structure.md`** — kebab-case folders, `PascalCase.tsx` for component files, sibling sub-components flat next to the parent, leaf components in `shared/` only when reused by ≥2 features.
7. **The hook must not import JSX or styles.** Keep it free of React DOM imports so it stays unit-testable in isolation.

## Carve-outs

- **`src/game/` is exempt.** The canvas engine is imperative game code, not React. Module-level functions and shared mutable state are fine there.
- **`src/hooks/`** holds cross-feature hooks (e.g. `use-game-state.ts`). Feature-local hooks (`use-station-modal.ts`) belong colocated with their component, not in `src/hooks/`.
