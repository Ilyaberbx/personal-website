# Frontend Architecture Rules

The web app follows a **smart hook + dumb component** pattern. A component file contains **only** the component (imports, props destructuring, and JSX). Types, constants, styles, and all runtime logic live in sibling files within the same feature folder.

## Folder layout

```
src/components/<ComponentName>/
  <ComponentName>.tsx            ← dumb: imports the hook + styles, returns JSX
  use-<component-name>.ts        ← smart: state, effects, handlers, derived values
  <component-name>.styles.ts     ← styles (CSS-in-TS) or <component-name>.module.css
  <component-name>.types.ts      ← (optional) local types/interfaces
  <component-name>.constants.ts  ← (optional) module-local constants
  index.ts                       ← public re-export
```

## Rules

1. **Component files are dumb.** No `useState`, `useEffect`, `useCallback`, handlers, inline `<style>` blocks, or inline type declarations. The **only** legal hook calls inside the component are `useXComponent()` (the feature hook) and `useMemo`/`useCallback` *only* when wrapping a value passed straight through to a child (not when computing logic).
2. **Hooks are smart and return one object.** `useXComponent()` owns all state, side effects, derived values, selectors, navigation, and handlers.
3. **Styles live next to the component.** Use either `<feature>.module.css` (preferred for static styling) or `<feature>.styles.ts` (when styles depend on props/state). The component imports styles; the hook does not.
4. **Types live in `<feature>.types.ts`.** Interfaces, prop types, and union types used by the screen/hook/styles go here; don't declare them inline.
5. **Constants live in `<feature>.constants.ts`.** Any module-local constant (option lists, copy, thresholds) that isn't already a shared token.
6. **File naming is `kebab-case`** for non-component files; `PascalCase.tsx` for the component file.
7. **Scope: feature components.** Trivial leaf components under `src/components/shared/` (a `<Spacer>`, `<Icon>`, `<Pixel>`) are intentionally single-file.
8. **The hook must not import JSX or styles.** Keep it free of React DOM imports so it stays unit-testable in isolation.
9. **No "folder for folder" nesting.** A feature module with a single component must not wrap it in `components/<ComponentName>/` — the smart-hook bundle (component, hook, styles, types, constants, `index.ts`) lives directly under `src/components/<ComponentName>/`. Add a `components/` subfolder only when the feature has two or more sibling components, and even then group their files flat (`components/Foo.tsx`, `components/use-foo.ts`, …) rather than introducing per-component subfolders.

## Carve-outs

- **`src/game/` is exempt.** The canvas engine (`engine.ts`, `renderer.ts`, `world.ts`, `sprites.ts`, `tiles.ts`, `palette.ts`, `player.ts`, `input.ts`) is imperative game code, not React. Module-level functions and shared mutable state are fine there.
- **Existing components** (`StationModal.tsx`, `World.tsx`, `IntroScreen.tsx`, etc.) currently live flat under `src/components/`. The colocation rule applies to **new components and rewrites** — don't sweep-migrate without an asked reason.
- **`src/hooks/`** holds cross-feature hooks (`useGameState.ts`). Feature-local hooks (`use-station-modal.ts`) belong colocated with their component, not in `src/hooks/`.
