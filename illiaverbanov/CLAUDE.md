# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A single-page personal website / portfolio for **Illia Verbanov**, rendered as a pixel-art walk-around 2D world. The visitor controls a character that moves through tiled rooms and interacts with five stations (CV, projects, contact, etc.), each opening a themed modal. The world and its sprites are drawn to a `<canvas>`; React handles intro screen, HUD, modals, and the dialog box overlay.

## Tech Stack

- **Vite 8** + **React 19** (with the React Compiler enabled via `babel-plugin-react-compiler`)
- **TypeScript 6** (strict)
- **ESLint 10** with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- **neverthrow** for `Result`-based error handling (see `.claude/rules/error-handling.md`)

No backend, no router, no state library. Game state is a single `useGameState` hook; canvas is rendered imperatively.

## Layout

```
src/
  App.tsx                  ← intro gate → World
  main.tsx                 ← Vite entry
  index.css                ← global pixel styles
  components/              ← React UI (HUD, modals, intro, world host, touch controls)
    stations/              ← per-station modal content
  game/                    ← canvas engine (imperative, exempt from React rules)
    engine.ts              ← main loop / tick
    renderer.ts            ← draws world + sprites to canvas
    world.ts               ← world state, collisions, station triggers
    player.ts              ← player position, facing, movement
    input.ts               ← keyboard + touch input
    sprites.ts             ← sprite atlas + drawing helpers
    tiles.ts               ← tile atlas + map rendering
    palette.ts             ← LOCKED color palette — do not extend without explicit ask
  hooks/
    useGameState.ts        ← top-level game state shared with React UI
  data/
    cv.ts                  ← CV / portfolio content rendered in modals
    map.ts                 ← world map / tile data
public/                    ← static assets — DO NOT add new image/audio files without explicit ask
```

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build
npm run lint      # eslint .
npm run preview   # serve the production build locally
```

## Project Constraints

- **Locked palette + no asset files.** The pixel palette in `src/game/palette.ts` is fixed. Don't add new colors, images, audio files, or fonts without an explicit ask — sprites are generated procedurally where possible.
- **Mobile-first.** Every UI feature is designed mobile-first. Mobile is part of "done", not polish — touch input (see `TouchPad.tsx`) and small-viewport layouts must work before a feature is considered finished.
- **Canvas is imperative.** `src/game/` is plain TypeScript modules with module-level state. It does not follow React patterns and is carved out from `frontend-architecture.md`.

## Rules

All rules live under `.claude/rules/`. Two are loaded eagerly because they apply to every edit; the others load on demand.

- `@.claude/rules/conventions.md` — file naming, ISO dates, no per-file strict-disable.
- `@.claude/rules/code-style.md` — guard clauses, explaining variables, Fowler's catalog, 200-line component cap, no `any`.

Load on demand:

- `src/components/**` or `src/hooks/**` → also read `frontend-architecture.md` (smart hook + dumb component split).
- Any code that can fail (fetch, storage, parse, async I/O) → also read `error-handling.md` (`neverthrow` is the default).

@.claude/rules/conventions.md
@.claude/rules/code-style.md
