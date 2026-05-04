import type { NpcId, StationId } from '../data/types'
import type { Scene, SceneId, SceneSpawn } from './scenes/types'

export type Tile = { tx: number; ty: number }

export type WorldFocus =
  | { kind: 'station'; id: StationId }
  | { kind: 'npc'; id: NpcId }
  | { kind: 'door'; targetSceneId: SceneId; targetSpawn: SceneSpawn; label: string; hint: string }
  | { kind: 'sculpture'; projectId: string }
  | null

export type InteractableEntry =
  | { kind: 'station'; id: StationId; x: number; y: number }
  | { kind: 'npc'; id: NpcId; x: number; y: number }
  | {
      kind: 'door'
      x: number
      y: number
      targetSceneId: SceneId
      targetSpawn: SceneSpawn
      label: string
      hint: string
    }
  | { kind: 'sculpture'; projectId: string; x: number; y: number }

const ADJACENT_DISTANCE = 1
const STATION_HEAD_TILE_OFFSET = 1

function manhattanDistance(ax: number, ay: number, bx: number, by: number): number {
  return Math.abs(ax - bx) + Math.abs(ay - by)
}

function toWorldFocus(entry: InteractableEntry): WorldFocus {
  if (entry.kind === 'station') return { kind: 'station', id: entry.id }
  if (entry.kind === 'npc') return { kind: 'npc', id: entry.id }
  if (entry.kind === 'sculpture') return { kind: 'sculpture', projectId: entry.projectId }
  return {
    kind: 'door',
    targetSceneId: entry.targetSceneId,
    targetSpawn: entry.targetSpawn,
    label: entry.label,
    hint: entry.hint,
  }
}

function matchesAdjacent(entry: InteractableEntry, tx: number, ty: number): boolean {
  if (entry.kind === 'station') {
    const distanceToHead = manhattanDistance(entry.x, entry.y, tx, ty)
    const distanceToFootprint = manhattanDistance(
      entry.x,
      entry.y + STATION_HEAD_TILE_OFFSET,
      tx,
      ty,
    )
    const isAdjacentToHead = distanceToHead <= ADJACENT_DISTANCE
    const isAdjacentToFootprint = distanceToFootprint <= ADJACENT_DISTANCE
    return isAdjacentToHead || isAdjacentToFootprint
  }
  return manhattanDistance(entry.x, entry.y, tx, ty) <= ADJACENT_DISTANCE
}

function matchesExact(entry: InteractableEntry, tx: number, ty: number): boolean {
  if (entry.kind === 'station') {
    const isHeadTile = entry.x === tx && entry.y === ty
    const isFootprintTile = entry.x === tx && entry.y + STATION_HEAD_TILE_OFFSET === ty
    return isHeadTile || isFootprintTile
  }
  return entry.x === tx && entry.y === ty
}

export function buildRegistry(scene: Scene): InteractableEntry[] {
  const stations: InteractableEntry[] = scene.stations.map((s) => ({
    kind: 'station',
    id: s.id,
    x: s.x,
    y: s.y,
  }))
  const npcs: InteractableEntry[] = scene.npcs.map((n) => ({
    kind: 'npc',
    id: n.id,
    x: n.x,
    y: n.y,
  }))
  const doors: InteractableEntry[] = scene.doors.map((d) => ({
    kind: 'door',
    x: d.x,
    y: d.y,
    targetSceneId: d.targetSceneId,
    targetSpawn: d.targetSpawn,
    label: d.label,
    hint: d.hint,
  }))
  const sculptures: InteractableEntry[] = scene.sculptures.map((s) => ({
    kind: 'sculpture',
    projectId: s.projectId,
    x: s.x,
    y: s.y,
  }))
  return [...stations, ...npcs, ...doors, ...sculptures]
}

export function interactableAt(
  tile: Tile,
  mode: 'adjacent' | 'exact',
  registry: InteractableEntry[],
): WorldFocus {
  const match =
    mode === 'adjacent'
      ? registry.find((e) => matchesAdjacent(e, tile.tx, tile.ty))
      : registry.find((e) => matchesExact(e, tile.tx, tile.ty))
  if (!match) return null
  return toWorldFocus(match)
}
