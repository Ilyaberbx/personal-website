---
Status: needs-triage
Created: 2026-05-02
---

# Voxel hero models in interactable modals

## Problem Statement

Today, when the visitor walks up to a station or the Bard NPC and interacts, the modal that opens is text-and-2D-only. The pixel-art world that frames the rest of the experience disappears at exactly the moment the visitor is most engaged with a single object — there is no visual payoff that connects "the thing I just walked up to" with "the panel I'm now reading." The modal feels like a generic content sheet rather than a continuation of the diorama.

For a portfolio whose whole identity is a hand-crafted pixel-art world, that handoff is a missed opportunity. The visitor should feel rewarded for approaching each object, and each station/NPC should have a piece of identity that lives beyond text.

## Solution

When a visitor opens any interactable's modal — the five stations or the Bard NPC — the top of that modal hosts a small **voxel hero**: a procedurally-generated 3D voxel sculpture, themed to that interactable, slowly auto-rotating on a transparent stage. The existing title and content render below it, untouched.

The voxel hero is rendered with Three.js but styled to match the rest of the site: orthographic camera at an isometric angle, low internal render resolution upscaled with `image-rendering: pixelated`, flat Lambert shading with two directional lights, anti-aliasing off, transparent background. The result reads as "voxel pixel art," not "smooth 3D cubes."

Each interactable has its own bespoke voxel model authored as data (sparse `{x,y,z,color}` list) using the project's locked palette. Models are loaded on modal open, rendered as a single `InstancedMesh` of unit cubes with per-instance colors, idle-rotated around the Y axis, and fully disposed on modal close.

If WebGL initialisation fails, the hero region silently renders nothing and the modal shows its existing content as today.

## User Stories

1. As a portfolio visitor, I want to see a 3D voxel sculpture themed to each station I visit, so that the modal feels like a continuation of the pixel-art world rather than a generic info sheet.
2. As a portfolio visitor, I want the voxel hero to slowly auto-rotate, so that I can perceive its 3D form without having to learn or perform any input.
3. As a portfolio visitor on mobile, I want the voxel hero to take only a sensible portion of my screen, so that the textual content of the modal remains comfortably reachable below it.
4. As a portfolio visitor, I want the voxel hero to look like pixel art, so that it visually belongs in the same world as the 2D canvas behind the modal.
5. As a portfolio visitor opening the About station, I want a voxel sculpture that visually represents "About," so that the hero communicates identity at a glance.
6. As a portfolio visitor opening the Experience station, I want a voxel sculpture themed to professional experience, so that the hero communicates identity at a glance.
7. As a portfolio visitor opening the Skills station, I want a voxel sculpture themed to skills, so that the hero communicates identity at a glance.
8. As a portfolio visitor opening the Trophies station, I want a voxel sculpture themed to trophies/achievements, so that the hero communicates identity at a glance.
9. As a portfolio visitor opening the Contact station, I want a voxel sculpture themed to contact, so that the hero communicates identity at a glance.
10. As a portfolio visitor talking to the Bard NPC, I want a voxel sculpture themed to the Bard, so that the NPC has a 3D presence consistent with the stations.
11. As a portfolio visitor on a slow or memory-constrained device, I want the 3D scene to fully release its GPU resources when I close the modal, so that opening many modals over a session does not degrade performance.
12. As a portfolio visitor on a browser without WebGL support, I want the modal to still open and display its content normally, so that a graphics-capability gap does not break the feature.
13. As a portfolio visitor, I want the voxel hero to scroll naturally with the rest of the modal content on small viewports, so that nothing pinned at the top eats my reading space.
14. As a portfolio visitor, I want the voxel hero to sit on a transparent background, so that it visually integrates with the modal's existing styling rather than appearing as a foreign embedded canvas.
15. As a portfolio visitor, I want each voxel model to be framed at a comparable on-screen size regardless of its underlying voxel dimensions, so that one hero does not appear tiny while another fills the slot.
16. As the site author, I want each voxel model authored as plain TypeScript data, so that I can edit, diff, and code-review model changes without binary asset files.
17. As the site author, I want voxel colors to be type-checked against the locked palette, so that the palette constraint cannot be bypassed by a typo or sneak-in.
18. As the site author, I want the Three.js engine and the model data to be cleanly separated, so that I can iterate on visuals without touching rendering code, and vice versa.
19. As the site author, I want the renderer code to live behind a small testable interface, so that lifecycle correctness (init, dispose) can be verified in CI rather than relied on by manual inspection.
20. As the site author, I want adding a future interactable to require only a new data file plus a registry entry, so that the feature is extensible without engine changes.
21. As the site author, I want the voxel hero rendering pipeline to fail closed (silent render-nothing) rather than throw, so that a renderer bug never blocks the textual content the modal already serves.
22. As the site author, I want the voxel hero component to be shared between station and NPC modals, so that there is one canonical implementation rather than two parallel ones.
23. As the site author, I want a per-model bounds check so that an authoring mistake (e.g. a stray voxel at a huge coordinate) is caught by tests, not by a confused-looking model in production.

## Implementation Decisions

### Modules

- **Voxel data registry (deep).** Owns the model catalogue. Exposes a single lookup keyed by `WorldFocus` (the existing discriminated union over station id and NPC). Encapsulates: the `VoxelModel` type, the palette-typed color field, and the mapping from focus to model. Interface stays narrow — one `getVoxelModel(focus): VoxelModel` lookup — even as model data grows.
- **Voxel scene engine (deep).** A plain TypeScript module (no React) that takes a host canvas + a `VoxelModel` and produces a scene handle exposing `start()`, `stop()`, and `dispose()`. Encapsulates: Three.js scene setup, orthographic camera, two directional lights, shared `BoxGeometry` + `MeshLambertMaterial`, `InstancedMesh` build from the model, AABB-based auto-fit framing, idle Y-rotation RAF loop, `ResizeObserver` on the canvas's container, and full resource disposal. Initialisation returns a `Result<SceneHandle, VoxelHeroInitError>` per the project's `neverthrow` rule. This is the load-bearing module — its public surface is small, but it carries most of the feature's complexity behind it.
- **`use-voxel-hero` hook.** Thin React adapter. Accepts a `WorldFocus`, owns a canvas ref, drives the scene engine through mount → start → unmount → dispose. Branches on the engine's `Result` to expose an `isReady` / `isErr` signal back to the dumb component. Contains no Three.js imports of its own beyond passing the canvas in.
- **`VoxelHero` shared component (dumb).** Renders a `<canvas>` inside a sized wrapper, applies the pixelated CSS, mounts the hook, and renders nothing when init failed. Lives under the project's `shared/` layout per the folder-structure rule (used by ≥2 features: stations and NPC).
- **`StationModal` integration.** Adds a `WorldFocus` prop (or derives it from existing station id), renders `<VoxelHero>` at the top of the modal body.
- **`NpcModal` integration.** Renders `<VoxelHero>` with the NPC focus at the top of the modal body.

### Architectural decisions

- **Trigger.** Voxel hero appears on interact, inside the existing modal — not on focus, and not as a replacement for the modal.
- **Dependency.** `three` only, with named imports; no `@react-three/fiber`. Imperative Three.js lives entirely inside the scene engine and is consumed via the smart hook, in line with the project's smart-hook / dumb-component pattern.
- **Mesh strategy.** One shared unit `BoxGeometry`, one shared `MeshLambertMaterial`, one `InstancedMesh` per active model. Per-instance transform + per-instance color via instanced attributes. No hidden-face culling in the first cut.
- **Visual fidelity bundle.** Orthographic camera at an isometric-ish angle (~30° down, ~45° around). Internal render size approximately 160×160, upscaled by CSS `image-rendering: pixelated`. `MeshLambertMaterial` lit by one warm key + one cool fill. Anti-aliasing off. Transparent background. No floor/ground plane.
- **Animation.** Idle Y-rotation only, fixed angular velocity. No user input, no orbit controls, no `prefers-reduced-motion` gating (explicit decision: rotation always plays).
- **Camera framing.** Per-model auto-fit. On model load, compute AABB, recenter so the AABB centre sits at the origin, set the orthographic frustum half-extent to roughly `max(width, height, depth) * 0.55` (10% margin), and place the camera at a distance large enough to clear `depth` over a full Y-rotation.
- **Lifecycle.** Scene built on modal mount, fully disposed on unmount: cancel RAF, dispose `InstancedMesh`, release shared geometry/material references, release the WebGL context. One live WebGL context at a time, only while a modal is open.
- **Error handling.** WebGL/canvas-context acquisition wrapped via `Result.fromThrowable`; the engine's init returns `Result<SceneHandle, VoxelHeroInitError>`. The hook branches on `isErr()`; the component renders `null` for the hero region on error. No `try/catch` in feature code.
- **Layout.** Square hero slot at the top of the modal body. Desktop: `min(38vh, 240px)` height. Mobile: `min(32vh, 200px)` height. Hero scrolls with content (not pinned). Canvas backdrop transparent.
- **Data shape.** `VoxelModel = { voxels: Voxel[] }` where `Voxel = { x: number; y: number; z: number; color: PaletteKey }`. `PaletteKey` is derived from the locked palette so any non-palette color is a compile error.
- **Registry.** Six entries on day one — five stations keyed by station id plus one NPC entry — exposed through a single `getVoxelModel(focus)` lookup. PR 1 ships placeholder shapes; sculptures refine incrementally as data-only changes.
- **Delivery.** Single PR, vertical slice: dependency add → data + types → scene engine → hook → shared component → modal wiring → tests.

### Out-of-scope contracts

- No new image, audio, or font asset files; all model data is TypeScript.
- No additions to the locked palette.
- No backend, network, or persistence changes.

## Testing Decisions

A good test for this feature exercises *external* behaviour at the seam of a deep module — the public interface a consumer would actually call — and avoids asserting on Three.js scene-graph internals or hook implementation details. Tests should remain valid if the engine swaps a Lambert material for Standard, changes its rotation speed, or restructures its private fields.

Two test surfaces are in scope:

- **Voxel data integrity.** For every model in the registry, assert that the model is non-empty and that no voxel sits beyond a maximum radius from the origin (default 16 units). This catches authoring mistakes — a stray coordinate that would render the model off-camera and look like "the model isn't showing." Compile-time palette typing already covers color validity, so no runtime palette assertion is needed.
- **Scene engine lifecycle.** With a mocked `HTMLCanvasElement.prototype.getContext`, mount the scene engine, assert that initialisation produces an `ok` `Result` and that a frame request is scheduled. Then dispose, and assert that the pending frame is cancelled and the engine releases its mesh/geometry/material handles. This verifies the contract that matters most for mobile correctness — that closing a modal frees GPU resources — without testing how the rotation matrix is computed.

Prior art in this repo: existing Vitest tests under `src/game/` (`interactable.test.ts`, `tile-occupant.test.ts`, `input.test.ts`, `input-config.test.ts`) follow the same pattern of testing module-level public functions with no React renderer involved. The voxel data integrity tests live next to the data files; the scene-engine lifecycle test lives next to the engine module.

Component-level snapshot/render tests for `VoxelHero` are explicitly *not* added — they would assert on a `<canvas>` element with no content visible to jsdom, providing no useful signal beyond "the component didn't throw."

## Out of Scope

- User-controlled rotation, drag, pinch-to-zoom, or any orbit controls.
- A static voxel pose for `prefers-reduced-motion` users — rotation always plays.
- Hidden-face / greedy meshing optimisations on the voxel geometry.
- A pixel-sprite fallback when WebGL init fails — fallback is silent (render nothing).
- A persistent or cached scene shared across modal opens — every open builds, every close disposes.
- A floor plane, shadows, post-processing, bloom, or any non-Lambert shading.
- Hand-authored `.vox` files or any binary asset format.
- Any changes to the existing 2D world rendering, station registry, NPC dialog system, or modal close/open transitions.
- A dev-only sandbox route or Storybook setup to preview models in isolation.

## Further Notes

- The scene engine is the natural home for any future visual polish (e.g. subtle floor plane, idle bob, gentle dithering shader). Keeping it isolated behind `start/stop/dispose` means polish lands without touching the data registry or the React tree.
- Adding a seventh interactable in the future is a two-line change: a new model data file + a new registry entry. The engine and component need no edits.
- The engine's deep-module shape is deliberate. Three.js is verbose and easy to mis-thread through React; encapsulating it behind `Result<SceneHandle, _>` lets the rest of the codebase treat 3D rendering as a black box that either works or quietly does not.
- Placeholder voxel sculptures in PR 1 are explicitly placeholder. Refinement of each sculpture is expected to happen as small data-only follow-up PRs and does not require re-review of the engine.
