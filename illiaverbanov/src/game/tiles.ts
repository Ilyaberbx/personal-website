// Tile sprites — drawn directly to an offscreen canvas at startup, then
// blitted into the world via drawImage. Each tile is 16x16 logical pixels.
import { PAL, SHADE } from './palette'
import { TILE, type TileId } from '../data/map'

export const TILE_SIZE = 16

const tileCache = new Map<TileId, HTMLCanvasElement>()

function makeCanvas(size = TILE_SIZE): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  return c
}

function paintGrass(ctx: CanvasRenderingContext2D, alt: boolean) {
  ctx.fillStyle = alt ? SHADE.grassAlt : SHADE.grass
  ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE)
  // Sprinkle a few darker pixels for texture (deterministic per-tile)
  ctx.fillStyle = SHADE.bgDark
  const dots = alt
    ? [
        [2, 3], [11, 6], [5, 11], [13, 13],
      ]
    : [
        [4, 2], [9, 5], [14, 9], [3, 12], [8, 14],
      ]
  for (const [x, y] of dots) ctx.fillRect(x, y, 1, 1)
  // Lighter highlights
  ctx.fillStyle = SHADE.grassEdge
  const lights = alt ? [[7, 2], [12, 10]] : [[2, 7], [11, 13]]
  for (const [x, y] of lights) ctx.fillRect(x, y, 1, 1)
}

function paintPath(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = SHADE.pathDark
  ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE)
  ctx.fillStyle = SHADE.pathLight
  // Cobblestone pattern
  const stones = [
    [1, 1, 4, 3], [6, 1, 4, 3], [11, 1, 4, 2],
    [2, 5, 3, 3], [7, 6, 4, 2], [12, 5, 3, 4],
    [1, 9, 4, 3], [7, 10, 3, 3], [11, 10, 4, 3],
    [2, 13, 3, 2], [7, 14, 4, 1], [12, 13, 3, 2],
  ]
  for (const [x, y, w, h] of stones) ctx.fillRect(x, y, w, h)
  ctx.fillStyle = SHADE.bgDark
  // Cracks between stones
  for (let i = 0; i < TILE_SIZE; i += 5) ctx.fillRect(i, 0, 1, TILE_SIZE)
}

function paintWater(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = SHADE.waterDeep
  ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE)
  ctx.fillStyle = SHADE.water
  // Wave bands
  ctx.fillRect(0, 3, TILE_SIZE, 2)
  ctx.fillRect(0, 9, TILE_SIZE, 2)
  ctx.fillStyle = PAL.secondary
  // Highlights
  ctx.fillRect(2, 3, 4, 1)
  ctx.fillRect(9, 9, 4, 1)
  ctx.fillRect(11, 3, 3, 1)
  ctx.fillRect(2, 9, 3, 1)
}

function paintTree(ctx: CanvasRenderingContext2D) {
  paintGrass(ctx, false)
  // Trunk
  ctx.fillStyle = SHADE.treeBark
  ctx.fillRect(7, 11, 2, 4)
  // Foliage
  ctx.fillStyle = SHADE.treeLeaf
  ctx.fillRect(4, 3, 8, 8)
  ctx.fillRect(3, 5, 10, 5)
  ctx.fillRect(5, 2, 6, 1)
  ctx.fillRect(6, 1, 4, 1)
  ctx.fillStyle = SHADE.treeLeafLight
  ctx.fillRect(5, 4, 2, 2)
  ctx.fillRect(8, 6, 1, 2)
  ctx.fillRect(10, 4, 1, 1)
  ctx.fillStyle = SHADE.bgDark
  ctx.fillRect(4, 9, 1, 1)
  ctx.fillRect(11, 9, 1, 1)
}

function paintWall(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = SHADE.bgDark
  ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE)
  ctx.fillStyle = PAL.secondary
  ctx.fillRect(0, 0, TILE_SIZE, 4)
  ctx.fillRect(0, 8, TILE_SIZE, 4)
  ctx.fillStyle = SHADE.bgMid
  for (let x = 0; x < TILE_SIZE; x += 4) ctx.fillRect(x, 0, 1, TILE_SIZE)
}

function paintFlower(ctx: CanvasRenderingContext2D) {
  paintGrass(ctx, false)
  ctx.fillStyle = SHADE.flowerYellow
  ctx.fillRect(7, 6, 2, 2)
  ctx.fillStyle = SHADE.flowerPink
  ctx.fillRect(6, 7, 1, 1)
  ctx.fillRect(9, 7, 1, 1)
  ctx.fillRect(7, 5, 1, 1)
  ctx.fillRect(8, 8, 1, 1)
  ctx.fillStyle = SHADE.treeLeafLight
  ctx.fillRect(7, 9, 2, 2)
  // small second flower
  ctx.fillStyle = SHADE.flowerPink
  ctx.fillRect(11, 11, 1, 1)
  ctx.fillStyle = SHADE.flowerYellow
  ctx.fillRect(11, 12, 1, 1)
}

function paintLamp(ctx: CanvasRenderingContext2D) {
  paintGrass(ctx, false)
  ctx.fillStyle = SHADE.bgDark
  ctx.fillRect(7, 4, 2, 11)
  ctx.fillStyle = PAL.primary
  ctx.fillRect(5, 1, 6, 4)
  ctx.fillStyle = SHADE.flowerYellow
  ctx.fillRect(6, 2, 4, 2)
  ctx.fillStyle = PAL.text
  ctx.fillRect(7, 2, 2, 1)
}

const painters: Record<TileId, (ctx: CanvasRenderingContext2D) => void> = {
  [TILE.Grass]: (ctx) => paintGrass(ctx, false),
  [TILE.Path]: paintPath,
  [TILE.Water]: paintWater,
  [TILE.Tree]: paintTree,
  [TILE.Wall]: paintWall,
  [TILE.Flower]: paintFlower,
  [TILE.Lamp]: paintLamp,
}

export function getTileCanvas(id: TileId): HTMLCanvasElement {
  let cached = tileCache.get(id)
  if (cached) return cached
  cached = makeCanvas()
  const ctx = cached.getContext('2d')!
  ctx.imageSmoothingEnabled = false
  painters[id](ctx)
  tileCache.set(id, cached)
  return cached
}

// Variant grass for checkerboard texture — drawn from world.ts based on (x+y) parity.
let altGrass: HTMLCanvasElement | null = null
export function getAltGrassCanvas(): HTMLCanvasElement {
  if (altGrass) return altGrass
  altGrass = makeCanvas()
  const ctx = altGrass.getContext('2d')!
  ctx.imageSmoothingEnabled = false
  paintGrass(ctx, true)
  return altGrass
}
