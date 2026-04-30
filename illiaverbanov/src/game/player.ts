import type { Facing } from './sprites'
import { isBlocked, isPropBlocked, isStationBlocked, NPC, SPAWN } from '../data/map'
import { TILE_SIZE } from './tiles'

const MOVE_SPEED = 90 // pixels per second
const ANIM_FRAME_PER_TILE = 0.5 // half a tile per walk-frame swap

export type PlayerState = {
  // Logical pixel position (top-left of sprite)
  px: number
  py: number
  facing: Facing
  // Continuous movement: when not moving, distance traveled resets the frame.
  moveAccum: number
  walkFrame: 0 | 1
  moving: boolean
}

export function createPlayer(): PlayerState {
  return {
    px: SPAWN.x * TILE_SIZE,
    py: SPAWN.y * TILE_SIZE,
    facing: SPAWN.facing,
    moveAccum: 0,
    walkFrame: 0,
    moving: false,
  }
}

function tileAt(px: number, py: number) {
  return {
    tx: Math.round(px / TILE_SIZE),
    ty: Math.round(py / TILE_SIZE),
  }
}

function isTileWalkable(tx: number, ty: number): boolean {
  if (isBlocked(tx, ty)) return false
  if (isPropBlocked(tx, ty)) return false
  if (isStationBlocked(tx, ty)) return false
  if (NPC.x === tx && NPC.y === ty) return false
  return true
}

export function updatePlayer(p: PlayerState, dt: number, dir: 'up' | 'down' | 'left' | 'right' | null) {
  if (!dir) {
    p.moving = false
    p.moveAccum = 0
    p.walkFrame = 0
    return
  }
  // Update facing immediately
  p.facing = dir
  p.moving = true

  const step = MOVE_SPEED * dt
  let dx = 0
  let dy = 0
  if (dir === 'up') dy = -step
  else if (dir === 'down') dy = step
  else if (dir === 'left') dx = -step
  else if (dir === 'right') dx = step

  // Tile-aligned collision: try axis independently.
  // We snap to tile grid for collision: target tile is current tile + direction
  // when the player has moved at least half a tile from the previous tile center.
  if (dx !== 0) {
    const newPx = p.px + dx
    // Check both top and bottom edges of sprite at the new x
    const leadingX = dx > 0 ? newPx + TILE_SIZE - 1 : newPx
    const tx = Math.floor(leadingX / TILE_SIZE)
    const tyTop = Math.floor((p.py + 2) / TILE_SIZE)
    const tyBot = Math.floor((p.py + TILE_SIZE - 1) / TILE_SIZE)
    if (isTileWalkable(tx, tyTop) && isTileWalkable(tx, tyBot)) {
      p.px = newPx
    }
  }
  if (dy !== 0) {
    const newPy = p.py + dy
    const leadingY = dy > 0 ? newPy + TILE_SIZE - 1 : newPy
    const ty = Math.floor(leadingY / TILE_SIZE)
    const txL = Math.floor((p.px + 2) / TILE_SIZE)
    const txR = Math.floor((p.px + TILE_SIZE - 1) / TILE_SIZE)
    if (isTileWalkable(txL, ty) && isTileWalkable(txR, ty)) {
      p.py = newPy
    }
  }

  // Animate walk cycle by accumulated distance
  p.moveAccum += step
  const tilesWalked = p.moveAccum / TILE_SIZE
  p.walkFrame = Math.floor(tilesWalked / ANIM_FRAME_PER_TILE) % 2 === 0 ? 0 : 1
}

export function getPlayerTile(p: PlayerState) {
  return tileAt(p.px + TILE_SIZE / 2, p.py + TILE_SIZE / 2)
}
