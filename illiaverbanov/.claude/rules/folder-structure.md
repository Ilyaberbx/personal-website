# Folder & Naming Structure

## Folders are kebab-case

Every directory under `src/` is kebab-case. Folders are groupings, not code entities, so they share the rule for non-component files.

```
src/components/intro-screen/         ✓
src/components/IntroScreen/          ✗
src/components/stations/about-panel/ ✓
```

## React component files are PascalCase.tsx

A `.tsx` file that exports a React component is PascalCase; the file name matches the component name. Sibling sub-components in the same folder follow the same rule.

```
intro-screen/IntroScreen.tsx         ✓ exports IntroScreen
intro-screen/Avatar.tsx              ✓ exports Avatar
intro-screen/intro-screen.tsx        ✗
```

## Folder ↔ component file

A folder `<thing>/` houses a primary component file `<Thing>.tsx`. The kebab is the dash-cased form of the Pascal. Acronyms keep their casing.

```
intro-screen/   ↔   IntroScreen.tsx
npc-modal/      ↔   NpcModal.tsx
hud/            ↔   HUD.tsx
```

## Non-component files are kebab-case

```
use-intro-screen.ts
intro-screen.module.css
intro-screen.constants.ts
intro-screen.types.ts
```

## Where a component lives

- **Feature folder** (`src/components/<feature>/`) — default. Holds the component, its hook, styles, constants, types, and sibling sub-components.
- **`src/components/shared/`** — a leaf component that has **no internal state of its own** AND is **imported by ≥2 feature folders**. Single-file `.tsx`; no sub-bundle, no `index.ts`.
- **`src/components/stations/<station>/`** — per-station feature folders. Grouping folders are introduced only when ≥3 sibling features share a clear semantic role.

## Promotion rule

A component starts inside its feature folder. Move it to `shared/` the day a second feature imports it — not in anticipation. If it doesn't fit the leaf rule above, it doesn't belong in `shared/`.

## Disallowed

- PascalCase folders (`IntroScreen/`, `Stations/`).
- Mixed-case folders (`introScreen/`).
- Per-component subfolders inside a feature (`intro-screen/avatar/Avatar.tsx`). Sub-components stay flat next to the parent.
- `index.ts` re-exports for `shared/` leaves. Import the file directly.

## Carve-outs

- `src/game/` is exempt — imperative game code, files flat (or one level deep via `src/game/<group>/`).
- `src/data/`, `src/lib/`, `src/hooks/` are flat kebab.
