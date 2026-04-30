import type { StationId } from '../data/types'
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  TILES,
  STATION_IDS,
  STATION_POSITIONS,
  PROPS,
  NPC_POSITION,
  TILE,
} from './map'
import { getTileCanvas, getAltGrassCanvas, TILE_SIZE } from './tiles'
import { getPlayerSprite, getStationSprite, getNpcSprite, getPropSprite } from './sprites'
import type { PlayerState } from './player'
import { PAL, SHADE } from './palette'

export type Camera = {
  x: number
  y: number
  vw: number
  vh: number
}

const STATION_SPRITE_X_OFFSET = -8 // half a tile left
const STATION_SPRITE_Y_OFFSET = -16 // one tile up
const STATION_HIGHLIGHT_X = 16
const STATION_HIGHLIGHT_Y = 32 + 4
const NPC_HIGHLIGHT_X = 8
const NPC_HIGHLIGHT_Y = 18
const HIGHLIGHT_PERIOD_MS = 220

export function computeCamera(p: PlayerState, vw: number, vh: number): Camera {
  const cx = p.px + TILE_SIZE / 2 - vw / 2
  const cy = p.py + TILE_SIZE / 2 - vh / 2
  const maxX = MAP_WIDTH * TILE_SIZE - vw
  const maxY = MAP_HEIGHT * TILE_SIZE - vh
  return {
    x: Math.max(0, Math.min(cx, maxX)),
    y: Math.max(0, Math.min(cy, maxY)),
    vw,
    vh,
  }
}

type Drawable = { y: number; draw: () => void }

export function renderWorld(
  ctx: CanvasRenderingContext2D,
  player: PlayerState,
  cam: Camera,
  highlightStationId: StationId | null,
  npcFocused: boolean,
) {
  ctx.imageSmoothingEnabled = false
  ctx.fillStyle = PAL.bg
  ctx.fillRect(0, 0, cam.vw, cam.vh)

  drawTiles(ctx, cam)
  drawProps(ctx, cam)

  const drawables: Drawable[] = [
    ...buildStationDrawables(ctx, cam, highlightStationId),
    buildNpcDrawable(ctx, cam, npcFocused),
    buildPlayerDrawable(ctx, cam, player),
  ]
  drawables.sort((a, b) => a.y - b.y)
  for (const d of drawables) d.draw()
}

function drawTiles(ctx: CanvasRenderingContext2D, cam: Camera) {
  const startX = Math.max(0, Math.floor(cam.x / TILE_SIZE))
  const startY = Math.max(0, Math.floor(cam.y / TILE_SIZE))
  const endX = Math.min(MAP_WIDTH, Math.ceil((cam.x + cam.vw) / TILE_SIZE))
  const endY = Math.min(MAP_HEIGHT, Math.ceil((cam.y + cam.vh) / TILE_SIZE))

  for (let ty = startY; ty < endY; ty++) {
    for (let tx = startX; tx < endX; tx++) {
      const id = TILES[ty][tx]
      const isGrass = id === TILE.Grass
      const isCheckerboardCell = (tx + ty) % 2 === 0
      const isAltGrassPattern = isGrass && isCheckerboardCell
      const canvas = isAltGrassPattern ? getAltGrassCanvas() : getTileCanvas(id)
      ctx.drawImage(canvas, tx * TILE_SIZE - cam.x, ty * TILE_SIZE - cam.y)
    }
  }
}

function drawProps(ctx: CanvasRenderingContext2D, cam: Camera) {
  for (const prop of PROPS) {
    const sprite = getPropSprite(prop.sprite)
    ctx.drawImage(sprite, prop.x * TILE_SIZE - cam.x, prop.y * TILE_SIZE - cam.y)
  }
}

function buildStationDrawables(
  ctx: CanvasRenderingContext2D,
  cam: Camera,
  highlightStationId: StationId | null,
): Drawable[] {
  return STATION_IDS.map((id) => {
    const pos = STATION_POSITIONS[id]
    return {
      y: pos.y * TILE_SIZE,
      draw: () => {
        const sprite = getStationSprite(pos.sprite)
        const dx = pos.x * TILE_SIZE - cam.x + STATION_SPRITE_X_OFFSET
        const dy = pos.y * TILE_SIZE - cam.y + STATION_SPRITE_Y_OFFSET
        ctx.drawImage(sprite, dx, dy)
        const isHighlighted = highlightStationId === id
        if (isHighlighted) drawHighlight(ctx, dx + STATION_HIGHLIGHT_X, dy + STATION_HIGHLIGHT_Y)
      },
    }
  })
}

function buildNpcDrawable(
  ctx: CanvasRenderingContext2D,
  cam: Camera,
  npcFocused: boolean,
): Drawable {
  return {
    y: NPC_POSITION.y * TILE_SIZE,
    draw: () => {
      const sprite = getNpcSprite()
      const sx = NPC_POSITION.x * TILE_SIZE - cam.x
      const sy = NPC_POSITION.y * TILE_SIZE - cam.y
      ctx.drawImage(sprite, sx, sy)
      if (npcFocused) drawHighlight(ctx, sx + NPC_HIGHLIGHT_X, sy + NPC_HIGHLIGHT_Y)
    },
  }
}

function buildPlayerDrawable(
  ctx: CanvasRenderingContext2D,
  cam: Camera,
  player: PlayerState,
): Drawable {
  return {
    y: player.py,
    draw: () => {
      const sprite = getPlayerSprite(player.facing, player.walkFrame)
      ctx.drawImage(sprite, Math.floor(player.px - cam.x), Math.floor(player.py - cam.y))
    },
  }
}

function drawHighlight(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Bouncing "!" indicator
  const t = (performance.now() / HIGHLIGHT_PERIOD_MS) % 2
  const yOff = t < 1 ? -2 : 0
  ctx.fillStyle = SHADE.flowerYellow
  ctx.fillRect(x - 1, y + yOff, 3, 3)
  ctx.fillRect(x, y + yOff + 4, 1, 3)
  ctx.fillRect(x, y + yOff + 8, 1, 1)
  ctx.fillStyle = PAL.bg
  ctx.fillRect(x, y + yOff + 1, 1, 1)
}
