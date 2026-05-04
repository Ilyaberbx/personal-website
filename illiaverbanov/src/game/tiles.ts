import { PAL, SHADE } from './palette'
import { TILE, type TileId } from './map'
import type { PixelPoint, PixelRect } from './sprites.types'

export const TILE_SIZE = 16

const tileCache = new Map<TileId, HTMLCanvasElement>()

function makeCanvas(size = TILE_SIZE): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  return c
}

function fillPoints(ctx: CanvasRenderingContext2D, color: string, points: readonly PixelPoint[]) {
  ctx.fillStyle = color
  for (const { x, y } of points) ctx.fillRect(x, y, 1, 1)
}

function fillRects(ctx: CanvasRenderingContext2D, color: string, rects: readonly PixelRect[]) {
  ctx.fillStyle = color
  for (const r of rects) ctx.fillRect(r.x, r.y, r.w, r.h)
}

const GRASS_TEXTURE_DOTS: readonly PixelPoint[] = [
  { x: 4, y: 2 }, { x: 9, y: 5 }, { x: 14, y: 9 }, { x: 3, y: 12 }, { x: 8, y: 14 },
]
const GRASS_ALT_TEXTURE_DOTS: readonly PixelPoint[] = [
  { x: 2, y: 3 }, { x: 11, y: 6 }, { x: 5, y: 11 }, { x: 13, y: 13 },
]
const GRASS_HIGHLIGHTS: readonly PixelPoint[] = [
  { x: 2, y: 7 }, { x: 11, y: 13 },
]
const GRASS_ALT_HIGHLIGHTS: readonly PixelPoint[] = [
  { x: 7, y: 2 }, { x: 12, y: 10 },
]

function paintGrass(ctx: CanvasRenderingContext2D, alt: boolean) {
  ctx.fillStyle = alt ? SHADE.grassAlt : SHADE.grass
  ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE)
  fillPoints(ctx, SHADE.bgDark, alt ? GRASS_ALT_TEXTURE_DOTS : GRASS_TEXTURE_DOTS)
  fillPoints(ctx, SHADE.grassEdge, alt ? GRASS_ALT_HIGHLIGHTS : GRASS_HIGHLIGHTS)
}

const COBBLESTONE_RECTS: readonly PixelRect[] = [
  { x: 1, y: 1, w: 4, h: 3 }, { x: 6, y: 1, w: 4, h: 3 }, { x: 11, y: 1, w: 4, h: 2 },
  { x: 2, y: 5, w: 3, h: 3 }, { x: 7, y: 6, w: 4, h: 2 }, { x: 12, y: 5, w: 3, h: 4 },
  { x: 1, y: 9, w: 4, h: 3 }, { x: 7, y: 10, w: 3, h: 3 }, { x: 11, y: 10, w: 4, h: 3 },
  { x: 2, y: 13, w: 3, h: 2 }, { x: 7, y: 14, w: 4, h: 1 }, { x: 12, y: 13, w: 3, h: 2 },
]
const COBBLESTONE_CRACK_SPACING_PX = 5

function paintCobblestones(ctx: CanvasRenderingContext2D) {
  fillRects(ctx, SHADE.pathLight, COBBLESTONE_RECTS)
  ctx.fillStyle = SHADE.bgDark
  for (let crackX = 0; crackX < TILE_SIZE; crackX += COBBLESTONE_CRACK_SPACING_PX) {
    ctx.fillRect(crackX, 0, 1, TILE_SIZE)
  }
}

function paintPath(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = SHADE.pathDark
  ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE)
  paintCobblestones(ctx)
}

function paintWater(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = SHADE.waterDeep
  ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE)
  ctx.fillStyle = SHADE.water
  ctx.fillRect(0, 3, TILE_SIZE, 2)
  ctx.fillRect(0, 9, TILE_SIZE, 2)
  ctx.fillStyle = PAL.secondary
  ctx.fillRect(2, 3, 4, 1)
  ctx.fillRect(9, 9, 4, 1)
  ctx.fillRect(11, 3, 3, 1)
  ctx.fillRect(2, 9, 3, 1)
}

function paintTree(ctx: CanvasRenderingContext2D) {
  paintGrass(ctx, false)
  ctx.fillStyle = SHADE.treeBark
  ctx.fillRect(7, 11, 2, 4)
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

const FLOOR_PLANK_RECTS: readonly PixelRect[] = [
  { x: 0, y: 0, w: 16, h: 4 },
  { x: 0, y: 4, w: 16, h: 4 },
  { x: 0, y: 8, w: 16, h: 4 },
  { x: 0, y: 12, w: 16, h: 4 },
]

function paintFloor(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = SHADE.treeBark
  ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE)
  fillRects(ctx, SHADE.bgMid, FLOOR_PLANK_RECTS.filter((_, i) => i % 2 === 0))
  ctx.fillStyle = SHADE.bgDark
  for (let y = 3; y < TILE_SIZE; y += 4) ctx.fillRect(0, y, TILE_SIZE, 1)
  ctx.fillStyle = SHADE.borderDim
  ctx.fillRect(2, 1, 1, 1)
  ctx.fillRect(11, 5, 1, 1)
  ctx.fillRect(6, 9, 1, 1)
  ctx.fillRect(13, 13, 1, 1)
}

const painters: Record<TileId, (ctx: CanvasRenderingContext2D) => void> = {
  [TILE.Grass]: (ctx) => paintGrass(ctx, false),
  [TILE.Path]: paintPath,
  [TILE.Water]: paintWater,
  [TILE.Tree]: paintTree,
  [TILE.Wall]: paintWall,
  [TILE.Flower]: paintFlower,
  [TILE.Lamp]: paintLamp,
  [TILE.Floor]: paintFloor,
}

export function getTileCanvas(id: TileId): HTMLCanvasElement {
  const cached = tileCache.get(id)
  if (cached) return cached
  const canvas = makeCanvas()
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = false
  painters[id](ctx)
  tileCache.set(id, canvas)
  return canvas
}

let altGrassCanvas: HTMLCanvasElement | null = null

export function getAltGrassCanvas(): HTMLCanvasElement {
  if (altGrassCanvas) return altGrassCanvas
  altGrassCanvas = makeCanvas()
  const ctx = altGrassCanvas.getContext('2d')!
  ctx.imageSmoothingEnabled = false
  paintGrass(ctx, true)
  return altGrassCanvas
}
