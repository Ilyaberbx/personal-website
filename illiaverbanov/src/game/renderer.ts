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

const STATION_SPRITE_X_OFFSET = -8
const STATION_SPRITE_Y_OFFSET = -16
const STATION_HIGHLIGHT_X = 16
const STATION_HIGHLIGHT_Y = 32 + 4
const NPC_HIGHLIGHT_X = 8
const NPC_HIGHLIGHT_Y = 18
const HIGHLIGHT_PERIOD_MS = 220
const HIGHLIGHT_BOUNCE_PX = -2

export function computeCamera(p: PlayerState, vw: number, vh: number): Camera {
  const playerCenterX = p.px + TILE_SIZE / 2 - vw / 2
  const playerCenterY = p.py + TILE_SIZE / 2 - vh / 2
  const maxX = MAP_WIDTH * TILE_SIZE - vw
  const maxY = MAP_HEIGHT * TILE_SIZE - vh
  return {
    x: Math.max(0, Math.min(playerCenterX, maxX)),
    y: Math.max(0, Math.min(playerCenterY, maxY)),
    vw,
    vh,
  }
}

type Drawable = { y: number; draw: () => void }

export function renderWorld(
  ctx: CanvasRenderingContext2D,
  player: PlayerState,
  camera: Camera,
  highlightStationId: StationId | null,
  npcFocused: boolean,
) {
  ctx.imageSmoothingEnabled = false
  ctx.fillStyle = PAL.bg
  ctx.fillRect(0, 0, camera.vw, camera.vh)

  drawTiles(ctx, camera)
  drawProps(ctx, camera)

  const drawables: Drawable[] = [
    ...buildStationDrawables(ctx, camera, highlightStationId),
    buildNpcDrawable(ctx, camera, npcFocused),
    buildPlayerDrawable(ctx, camera, player),
  ]
  drawables.sort((a, b) => a.y - b.y)
  for (const d of drawables) d.draw()
}

function drawTiles(ctx: CanvasRenderingContext2D, camera: Camera) {
  const startX = Math.max(0, Math.floor(camera.x / TILE_SIZE))
  const startY = Math.max(0, Math.floor(camera.y / TILE_SIZE))
  const endX = Math.min(MAP_WIDTH, Math.ceil((camera.x + camera.vw) / TILE_SIZE))
  const endY = Math.min(MAP_HEIGHT, Math.ceil((camera.y + camera.vh) / TILE_SIZE))

  for (let ty = startY; ty < endY; ty++) {
    for (let tx = startX; tx < endX; tx++) {
      const id = TILES[ty][tx]
      const isGrass = id === TILE.Grass
      const isCheckerboardCell = (tx + ty) % 2 === 0
      const isAltGrassPattern = isGrass && isCheckerboardCell
      const canvas = isAltGrassPattern ? getAltGrassCanvas() : getTileCanvas(id)
      ctx.drawImage(canvas, tx * TILE_SIZE - camera.x, ty * TILE_SIZE - camera.y)
    }
  }
}

function drawProps(ctx: CanvasRenderingContext2D, camera: Camera) {
  for (const prop of PROPS) {
    const sprite = getPropSprite(prop.sprite)
    ctx.drawImage(sprite, prop.x * TILE_SIZE - camera.x, prop.y * TILE_SIZE - camera.y)
  }
}

function buildStationDrawables(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  highlightStationId: StationId | null,
): Drawable[] {
  return STATION_IDS.map((id) => {
    const pos = STATION_POSITIONS[id]
    return {
      y: pos.y * TILE_SIZE,
      draw: () => {
        const sprite = getStationSprite(pos.sprite)
        const dx = pos.x * TILE_SIZE - camera.x + STATION_SPRITE_X_OFFSET
        const dy = pos.y * TILE_SIZE - camera.y + STATION_SPRITE_Y_OFFSET
        ctx.drawImage(sprite, dx, dy)
        const isHighlighted = highlightStationId === id
        if (isHighlighted) drawHighlight(ctx, dx + STATION_HIGHLIGHT_X, dy + STATION_HIGHLIGHT_Y)
      },
    }
  })
}

function buildNpcDrawable(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  npcFocused: boolean,
): Drawable {
  return {
    y: NPC_POSITION.y * TILE_SIZE,
    draw: () => {
      const sprite = getNpcSprite()
      const sx = NPC_POSITION.x * TILE_SIZE - camera.x
      const sy = NPC_POSITION.y * TILE_SIZE - camera.y
      ctx.drawImage(sprite, sx, sy)
      if (npcFocused) drawHighlight(ctx, sx + NPC_HIGHLIGHT_X, sy + NPC_HIGHLIGHT_Y)
    },
  }
}

function buildPlayerDrawable(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  player: PlayerState,
): Drawable {
  return {
    y: player.py,
    draw: () => {
      const sprite = getPlayerSprite(player.facing, player.walkFrame)
      ctx.drawImage(sprite, Math.floor(player.px - camera.x), Math.floor(player.py - camera.y))
    },
  }
}

function getHighlightFlashOffset(): number {
  const phase = (performance.now() / HIGHLIGHT_PERIOD_MS) % 2
  const isUpHalfOfBounce = phase < 1
  return isUpHalfOfBounce ? HIGHLIGHT_BOUNCE_PX : 0
}

function drawHighlight(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const yOff = getHighlightFlashOffset()
  ctx.fillStyle = SHADE.flowerYellow
  ctx.fillRect(x - 1, y + yOff, 3, 3)
  ctx.fillRect(x, y + yOff + 4, 1, 3)
  ctx.fillRect(x, y + yOff + 8, 1, 1)
  ctx.fillStyle = PAL.bg
  ctx.fillRect(x, y + yOff + 1, 1, 1)
}
