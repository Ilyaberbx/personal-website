import type { StationId } from '../data/types'
import { STATIONS } from '../data/stations'
import type { Scene, SceneId } from './scenes/types'
import { TILE } from './map'
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
const DOOR_HIGHLIGHT_X = 8
const DOOR_HIGHLIGHT_Y = 4
const HIGHLIGHT_PERIOD_MS = 220
const HIGHLIGHT_BOUNCE_PX = -2

export type FocusKindForHighlight =
  | { kind: 'station'; id: StationId }
  | { kind: 'npc' }
  | { kind: 'door'; targetSceneId: SceneId }
  | null

export function computeCamera(
  scene: Scene,
  p: PlayerState,
  vw: number,
  vh: number,
): Camera {
  const playerCenterX = p.px + TILE_SIZE / 2 - vw / 2
  const playerCenterY = p.py + TILE_SIZE / 2 - vh / 2
  const maxX = scene.width * TILE_SIZE - vw
  const maxY = scene.height * TILE_SIZE - vh
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
  scene: Scene,
  player: PlayerState,
  camera: Camera,
  highlightFocus: FocusKindForHighlight,
  fadeAlpha: number,
) {
  ctx.imageSmoothingEnabled = false
  ctx.fillStyle = PAL.bg
  ctx.fillRect(0, 0, camera.vw, camera.vh)

  drawTiles(ctx, scene, camera)
  drawProps(ctx, scene, camera)
  drawDoorHighlight(ctx, scene, camera, highlightFocus)

  const drawables: Drawable[] = [
    ...buildStationDrawables(ctx, scene, camera, highlightFocus),
    ...buildNpcDrawables(ctx, scene, camera, highlightFocus),
    buildPlayerDrawable(ctx, camera, player),
  ]
  drawables.sort((a, b) => a.y - b.y)
  for (const d of drawables) d.draw()

  drawFade(ctx, camera, fadeAlpha)
}

function drawTiles(ctx: CanvasRenderingContext2D, scene: Scene, camera: Camera) {
  const startX = Math.max(0, Math.floor(camera.x / TILE_SIZE))
  const startY = Math.max(0, Math.floor(camera.y / TILE_SIZE))
  const endX = Math.min(scene.width, Math.ceil((camera.x + camera.vw) / TILE_SIZE))
  const endY = Math.min(scene.height, Math.ceil((camera.y + camera.vh) / TILE_SIZE))

  for (let ty = startY; ty < endY; ty++) {
    for (let tx = startX; tx < endX; tx++) {
      const id = scene.tiles[ty][tx]
      const isGrass = id === TILE.Grass
      const isCheckerboardCell = (tx + ty) % 2 === 0
      const isAltGrassPattern = isGrass && isCheckerboardCell
      const canvas = isAltGrassPattern ? getAltGrassCanvas() : getTileCanvas(id)
      ctx.drawImage(canvas, tx * TILE_SIZE - camera.x, ty * TILE_SIZE - camera.y)
    }
  }
}

function drawProps(ctx: CanvasRenderingContext2D, scene: Scene, camera: Camera) {
  for (const prop of scene.props) {
    const sprite = getPropSprite(prop.sprite)
    ctx.drawImage(sprite, prop.x * TILE_SIZE - camera.x, prop.y * TILE_SIZE - camera.y)
  }
}

function drawDoorHighlight(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  camera: Camera,
  focus: FocusKindForHighlight,
) {
  if (focus?.kind !== 'door') return
  const door = scene.doors.find((d) => d.targetSceneId === focus.targetSceneId)
  if (!door) return
  const sx = door.x * TILE_SIZE - camera.x
  const sy = door.y * TILE_SIZE - camera.y
  drawHighlight(ctx, sx + DOOR_HIGHLIGHT_X, sy + DOOR_HIGHLIGHT_Y)
}

function buildStationDrawables(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  camera: Camera,
  focus: FocusKindForHighlight,
): Drawable[] {
  const highlightStationId = focus?.kind === 'station' ? focus.id : null
  return scene.stations.map((station) => {
    const data = STATIONS[station.id]
    return {
      y: station.y * TILE_SIZE,
      draw: () => {
        const sprite = getStationSprite(data.sprite)
        const dx = station.x * TILE_SIZE - camera.x + STATION_SPRITE_X_OFFSET
        const dy = station.y * TILE_SIZE - camera.y + STATION_SPRITE_Y_OFFSET
        ctx.drawImage(sprite, dx, dy)
        const isHighlighted = highlightStationId === station.id
        if (isHighlighted) drawHighlight(ctx, dx + STATION_HIGHLIGHT_X, dy + STATION_HIGHLIGHT_Y)
      },
    }
  })
}

function buildNpcDrawables(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  camera: Camera,
  focus: FocusKindForHighlight,
): Drawable[] {
  const npcFocused = focus?.kind === 'npc'
  return scene.npcs.map((npc) => ({
    y: npc.y * TILE_SIZE,
    draw: () => {
      const sprite = getNpcSprite()
      const sx = npc.x * TILE_SIZE - camera.x
      const sy = npc.y * TILE_SIZE - camera.y
      ctx.drawImage(sprite, sx, sy)
      if (npcFocused) drawHighlight(ctx, sx + NPC_HIGHLIGHT_X, sy + NPC_HIGHLIGHT_Y)
    },
  }))
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

function drawFade(ctx: CanvasRenderingContext2D, camera: Camera, alpha: number) {
  if (alpha <= 0) return
  const previousAlpha = ctx.globalAlpha
  ctx.globalAlpha = Math.min(1, alpha)
  ctx.fillStyle = SHADE.ink
  ctx.fillRect(0, 0, camera.vw, camera.vh)
  ctx.globalAlpha = previousAlpha
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
