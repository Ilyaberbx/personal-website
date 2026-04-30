import type { StationId } from '../data/types'
import { STATION_IDS, STATION_POSITIONS, NPC_POSITION } from './map'
import { getPlayerTile, type PlayerState } from './player'

export type WorldFocus =
  | { kind: 'station'; id: StationId }
  | { kind: 'npc' }
  | null

const ADJACENT_DISTANCE = 1

function manhattanDistance(ax: number, ay: number, bx: number, by: number): number {
  return Math.abs(ax - bx) + Math.abs(ay - by)
}

export function findFocus(p: PlayerState): WorldFocus {
  const { tx, ty } = getPlayerTile(p)

  for (const id of STATION_IDS) {
    const pos = STATION_POSITIONS[id]
    const isAdjacent = manhattanDistance(pos.x, pos.y, tx, ty) <= ADJACENT_DISTANCE
    if (isAdjacent) return { kind: 'station', id }
  }

  const isNpcAdjacent = manhattanDistance(NPC_POSITION.x, NPC_POSITION.y, tx, ty) <= ADJACENT_DISTANCE
  if (isNpcAdjacent) return { kind: 'npc' }

  return null
}

export function isSameFocus(a: WorldFocus, b: WorldFocus): boolean {
  if (a === null && b === null) return true
  if (a === null || b === null) return false
  if (a.kind !== b.kind) return false
  if (a.kind === 'station' && b.kind === 'station') return a.id === b.id
  return true
}
