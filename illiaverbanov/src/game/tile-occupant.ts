import type { StationId } from '../data/types'
import type { Prop } from './map'
import {
  TILES,
  TILE,
  PROPS,
  STATION_IDS,
  STATION_POSITIONS,
  NPC_POSITION,
  isBlocked,
} from './map'

export type Occupant =
  | { kind: 'empty' }
  | { kind: 'terrain'; tile: (typeof TILE)[keyof typeof TILE] }
  | { kind: 'prop'; prop: Prop }
  | { kind: 'station'; id: StationId; role: 'footprint' | 'head' }
  | { kind: 'npc' }

function findStationOccupant(x: number, y: number): Extract<Occupant, { kind: 'station' }> | null {
  for (const id of STATION_IDS) {
    const pos = STATION_POSITIONS[id]
    const isHeadTile = pos.x === x && pos.y === y
    if (isHeadTile) return { kind: 'station', id, role: 'head' }
    const isFootprintTile = pos.x === x && pos.y + 1 === y
    if (isFootprintTile) return { kind: 'station', id, role: 'footprint' }
  }
  return null
}

function findPropOccupant(x: number, y: number): Extract<Occupant, { kind: 'prop' }> | null {
  const prop = PROPS.find((p) => p.x === x && p.y === y)
  return prop ? { kind: 'prop', prop } : null
}

export function tileOccupant(x: number, y: number): Occupant {
  const isNpc = NPC_POSITION.x === x && NPC_POSITION.y === y
  if (isNpc) return { kind: 'npc' }

  const stationOccupant = findStationOccupant(x, y)
  if (stationOccupant) return stationOccupant

  const propOccupant = findPropOccupant(x, y)
  if (propOccupant) return propOccupant

  const isOutOfBounds = x < 0 || y < 0
  if (isOutOfBounds) return { kind: 'terrain', tile: TILE.Wall }

  const isBlockingTerrain = isBlocked(x, y)
  if (isBlockingTerrain) return { kind: 'terrain', tile: TILES[y][x] }

  return { kind: 'empty' }
}

export function isWalkable(occupant: Occupant): boolean {
  if (occupant.kind === 'terrain') return false
  if (occupant.kind === 'npc') return false
  if (occupant.kind === 'station' && occupant.role === 'head') return false
  if (occupant.kind === 'prop' && occupant.prop.blocks) return false
  return true
}

export function isInteractable(occupant: Occupant): boolean {
  if (occupant.kind === 'station') return true
  if (occupant.kind === 'npc') return true
  return false
}
