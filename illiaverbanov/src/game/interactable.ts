import type { StationId } from '../data/types'
import { STATIONS } from '../data/stations'
import { NPC_POSITION } from './map'

export type Tile = { tx: number; ty: number }

export type WorldFocus =
  | { kind: 'station'; id: StationId }
  | { kind: 'npc' }
  | null

export type InteractableEntry =
  | { kind: 'station'; id: StationId; x: number; y: number }
  | { kind: 'npc'; x: number; y: number }

const ADJACENT_DISTANCE = 1
const STATION_HEAD_TILE_OFFSET = 1

function manhattanDistance(ax: number, ay: number, bx: number, by: number): number {
  return Math.abs(ax - bx) + Math.abs(ay - by)
}

function toWorldFocus(entry: InteractableEntry): WorldFocus {
  if (entry.kind === 'station') return { kind: 'station', id: entry.id }
  return { kind: 'npc' }
}

function matchesAdjacent(entry: InteractableEntry, tx: number, ty: number): boolean {
  return manhattanDistance(entry.x, entry.y, tx, ty) <= ADJACENT_DISTANCE
}

function matchesExact(entry: InteractableEntry, tx: number, ty: number): boolean {
  if (entry.kind === 'npc') return entry.x === tx && entry.y === ty
  const isHeadTile = entry.x === tx && entry.y === ty
  const isFootprintTile = entry.x === tx && entry.y + STATION_HEAD_TILE_OFFSET === ty
  return isHeadTile || isFootprintTile
}

export function buildRegistry(): InteractableEntry[] {
  const stations = (Object.entries(STATIONS) as [StationId, (typeof STATIONS)[StationId]][]).map(
    ([id, s]): InteractableEntry => ({ kind: 'station', id, x: s.x, y: s.y }),
  )
  const npc: InteractableEntry = { kind: 'npc', x: NPC_POSITION.x, y: NPC_POSITION.y }
  return [...stations, npc]
}

export const INTERACTABLES: InteractableEntry[] = buildRegistry()

export function interactableAt(
  tile: Tile,
  mode: 'adjacent' | 'exact',
  registry: InteractableEntry[] = INTERACTABLES,
): WorldFocus {
  const match =
    mode === 'adjacent'
      ? registry.find((e) => matchesAdjacent(e, tile.tx, tile.ty))
      : registry.find((e) => matchesExact(e, tile.tx, tile.ty))
  if (!match) return null
  return toWorldFocus(match)
}
