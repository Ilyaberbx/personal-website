import { MAP_WIDTH, MAP_HEIGHT, TILES, STATIONS, PROPS, NPC, TILE } from '../data/map'
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

export function renderWorld(
  ctx: CanvasRenderingContext2D,
  player: PlayerState,
  cam: Camera,
  highlightStationId: string | null,
  npcFocused: boolean,
) {
  ctx.imageSmoothingEnabled = false
  ctx.fillStyle = PAL.bg
  ctx.fillRect(0, 0, cam.vw, cam.vh)

  const startX = Math.max(0, Math.floor(cam.x / TILE_SIZE))
  const startY = Math.max(0, Math.floor(cam.y / TILE_SIZE))
  const endX = Math.min(MAP_WIDTH, Math.ceil((cam.x + cam.vw) / TILE_SIZE))
  const endY = Math.min(MAP_HEIGHT, Math.ceil((cam.y + cam.vh) / TILE_SIZE))

  // Tiles
  for (let ty = startY; ty < endY; ty++) {
    for (let tx = startX; tx < endX; tx++) {
      const id = TILES[ty][tx]
      let canvas: HTMLCanvasElement
      if (id === TILE.Grass && (tx + ty) % 2 === 0) {
        canvas = getAltGrassCanvas()
      } else {
        canvas = getTileCanvas(id)
      }
      ctx.drawImage(canvas, tx * TILE_SIZE - cam.x, ty * TILE_SIZE - cam.y)
    }
  }

  // Props (under sprites)
  for (const prop of PROPS) {
    const sprite = getPropSprite(prop.sprite as 'fountain' | 'lamp')
    ctx.drawImage(sprite, prop.x * TILE_SIZE - cam.x, prop.y * TILE_SIZE - cam.y)
  }

  // Y-sorted entities: stations, NPC, player
  type Drawable = { y: number; draw: () => void }
  const drawables: Drawable[] = []

  for (const s of STATIONS) {
    drawables.push({
      y: s.y * TILE_SIZE,
      draw: () => {
        const sprite = getStationSprite(s.sprite)
        // Stations are 32x32; anchor so the bottom 16x16 sits on the station tile.
        const dx = s.x * TILE_SIZE - cam.x - 8 // half a tile left
        const dy = s.y * TILE_SIZE - cam.y - 16 // one tile up
        ctx.drawImage(sprite, dx, dy)
        if (highlightStationId === s.id) {
          drawHighlight(ctx, dx + 16, dy + 32 + 4)
        }
      },
    })
  }

  // NPC
  drawables.push({
    y: NPC.y * TILE_SIZE,
    draw: () => {
      const sprite = getNpcSprite()
      ctx.drawImage(sprite, NPC.x * TILE_SIZE - cam.x, NPC.y * TILE_SIZE - cam.y)
      if (npcFocused) {
        drawHighlight(ctx, NPC.x * TILE_SIZE - cam.x + 8, NPC.y * TILE_SIZE - cam.y + 18)
      }
    },
  })

  // Player
  drawables.push({
    y: player.py,
    draw: () => {
      const sprite = getPlayerSprite(player.facing, player.walkFrame)
      ctx.drawImage(sprite, Math.floor(player.px - cam.x), Math.floor(player.py - cam.y))
    },
  })

  drawables.sort((a, b) => a.y - b.y)
  for (const d of drawables) d.draw()
}

function drawHighlight(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Bouncing "!" indicator
  const t = (performance.now() / 220) % 2
  const yOff = t < 1 ? -2 : 0
  ctx.fillStyle = SHADE.flowerYellow
  ctx.fillRect(x - 1, y + yOff, 3, 3)
  ctx.fillRect(x, y + yOff + 4, 1, 3)
  ctx.fillRect(x, y + yOff + 8, 1, 1)
  ctx.fillStyle = PAL.bg
  ctx.fillRect(x, y + yOff + 1, 1, 1)
}
