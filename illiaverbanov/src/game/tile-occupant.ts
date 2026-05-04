import type { NpcId, StationId } from '../data/types'
import type { Scene, SceneProp } from './scenes/types'
import { TILE, isBlockingTile, type TileId } from './map'

export type Occupant =
  | { kind: 'empty' }
  | { kind: 'terrain'; tile: TileId }
  | { kind: 'prop'; prop: SceneProp }
  | { kind: 'station'; id: StationId; role: 'footprint' | 'head' }
  | { kind: 'npc'; id: NpcId }
  | { kind: 'door'; doorIndex: number }

function findStationOccupant(
  scene: Scene,
  x: number,
  y: number,
): Extract<Occupant, { kind: 'station' }> | null {
  for (const station of scene.stations) {
    const isHeadTile = station.x === x && station.y === y
    if (isHeadTile) return { kind: 'station', id: station.id, role: 'head' }
    const isFootprintTile = station.x === x && station.y + 1 === y
    if (isFootprintTile) return { kind: 'station', id: station.id, role: 'footprint' }
  }
  return null
}

function findPropOccupant(
  scene: Scene,
  x: number,
  y: number,
): Extract<Occupant, { kind: 'prop' }> | null {
  const prop = scene.props.find((p) => p.x === x && p.y === y)
  return prop ? { kind: 'prop', prop } : null
}

function findNpcOccupant(
  scene: Scene,
  x: number,
  y: number,
): Extract<Occupant, { kind: 'npc' }> | null {
  const npc = scene.npcs.find((n) => n.x === x && n.y === y)
  if (!npc) return null
  return { kind: 'npc', id: npc.id }
}

function findDoorOccupant(
  scene: Scene,
  x: number,
  y: number,
): Extract<Occupant, { kind: 'door' }> | null {
  const idx = scene.doors.findIndex((d) => d.x === x && d.y === y)
  if (idx < 0) return null
  return { kind: 'door', doorIndex: idx }
}

export function tileOccupant(scene: Scene, x: number, y: number): Occupant {
  const isOutOfBounds = x < 0 || y < 0 || x >= scene.width || y >= scene.height
  if (isOutOfBounds) return { kind: 'terrain', tile: TILE.Wall }

  const npc = findNpcOccupant(scene, x, y)
  if (npc) return npc

  const station = findStationOccupant(scene, x, y)
  if (station) return station

  const door = findDoorOccupant(scene, x, y)
  if (door) return door

  const prop = findPropOccupant(scene, x, y)
  if (prop) return prop

  const tile = scene.tiles[y][x]
  if (isBlockingTile(tile)) return { kind: 'terrain', tile }

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
  if (occupant.kind === 'door') return true
  return false
}
