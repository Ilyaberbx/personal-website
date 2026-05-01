import type { Facing } from './sprites'
import { SPAWN } from './map'
import { TILE_SIZE } from './tiles'
import { tileOccupant, isWalkable } from './tile-occupant'

const MOVE_SPEED_PX_PER_SEC = 90
const TILES_PER_WALK_FRAME_SWAP = 0.5
const BODY_INSET_PX = 2
const BODY_LAST_PIXEL_PX = TILE_SIZE - 1

export type PlayerState = {
  px: number
  py: number
  facing: Facing
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
  return isWalkable(tileOccupant(tx, ty))
}

function bothWalkable(ax: number, ay: number, bx: number, by: number): boolean {
  return isTileWalkable(ax, ay) && isTileWalkable(bx, by)
}

function isOnSecondWalkFrame(tilesWalked: number): boolean {
  return Math.floor(tilesWalked / TILES_PER_WALK_FRAME_SWAP) % 2 !== 0
}

export function updatePlayer(
  p: PlayerState,
  dt: number,
  dir: 'up' | 'down' | 'left' | 'right' | null,
) {
  if (!dir) {
    p.moving = false
    p.moveAccum = 0
    p.walkFrame = 0
    return
  }
  p.facing = dir
  p.moving = true

  const stepPx = MOVE_SPEED_PX_PER_SEC * dt
  let dx = 0
  let dy = 0
  if (dir === 'up') dy = -stepPx
  else if (dir === 'down') dy = stepPx
  else if (dir === 'left') dx = -stepPx
  else if (dir === 'right') dx = stepPx

  if (dx !== 0) {
    const nextPx = p.px + dx
    const leadingEdgeX = dx > 0 ? nextPx + BODY_LAST_PIXEL_PX : nextPx
    const targetTileX = Math.floor(leadingEdgeX / TILE_SIZE)
    const headTileY = Math.floor((p.py + BODY_INSET_PX) / TILE_SIZE)
    const feetTileY = Math.floor((p.py + BODY_LAST_PIXEL_PX) / TILE_SIZE)
    const canMoveX = bothWalkable(targetTileX, headTileY, targetTileX, feetTileY)
    if (canMoveX) p.px = nextPx
  }
  if (dy !== 0) {
    const nextPy = p.py + dy
    const leadingEdgeY = dy > 0 ? nextPy + BODY_LAST_PIXEL_PX : nextPy
    const targetTileY = Math.floor(leadingEdgeY / TILE_SIZE)
    const leftTileX = Math.floor((p.px + BODY_INSET_PX) / TILE_SIZE)
    const rightTileX = Math.floor((p.px + BODY_LAST_PIXEL_PX) / TILE_SIZE)
    const canMoveY = bothWalkable(leftTileX, targetTileY, rightTileX, targetTileY)
    if (canMoveY) p.py = nextPy
  }

  p.moveAccum += stepPx
  const tilesWalked = p.moveAccum / TILE_SIZE
  p.walkFrame = isOnSecondWalkFrame(tilesWalked) ? 1 : 0
}

export function getPlayerTile(p: PlayerState) {
  return tileAt(p.px + TILE_SIZE / 2, p.py + TILE_SIZE / 2)
}
