import { describe, it, expect } from 'vitest'
import { buildRegistry, interactableAt, type InteractableEntry } from './interactable'
import { getScene } from './scenes/registry'

type Tile = { tx: number; ty: number }

const STATION_HEAD_TILE_OFFSET = 1

const FIXTURE_STATIONS: InteractableEntry[] = [
  { kind: 'station', id: 'about', x: 10, y: 5 },
  { kind: 'station', id: 'skills', x: 20, y: 10 },
]

const FIXTURE_NPC: InteractableEntry = { kind: 'npc', x: 15, y: 8 }

const FIXTURE_REGISTRY: InteractableEntry[] = [...FIXTURE_STATIONS, FIXTURE_NPC]

describe('interactableAt — adjacent mode', () => {
  it('returns null for a tile with no nearby interactables', () => {
    const tile: Tile = { tx: 1, ty: 1 }
    expect(interactableAt(tile, 'adjacent', FIXTURE_REGISTRY)).toBeNull()
  })

  it('returns station focus when tile is adjacent (distance 1) to a station', () => {
    const tile: Tile = { tx: 10, ty: 6 }
    const result = interactableAt(tile, 'adjacent', FIXTURE_REGISTRY)
    expect(result).toEqual({ kind: 'station', id: 'about' })
  })

  it('returns station focus when tile is on the station itself', () => {
    const tile: Tile = { tx: 10, ty: 5 }
    const result = interactableAt(tile, 'adjacent', FIXTURE_REGISTRY)
    expect(result).toEqual({ kind: 'station', id: 'about' })
  })

  it('returns npc focus when tile is adjacent to the NPC', () => {
    const tile: Tile = { tx: 15, ty: 9 }
    const result = interactableAt(tile, 'adjacent', FIXTURE_REGISTRY)
    expect(result).toEqual({ kind: 'npc' })
  })

  it('returns station focus when tile is below the station footprint', () => {
    const tile: Tile = { tx: 10, ty: 5 + STATION_HEAD_TILE_OFFSET + 1 }
    const result = interactableAt(tile, 'adjacent', FIXTURE_REGISTRY)
    expect(result).toEqual({ kind: 'station', id: 'about' })
  })

  it('returns null when tile is two tiles below the station footprint (outside range)', () => {
    const tile: Tile = { tx: 10, ty: 5 + STATION_HEAD_TILE_OFFSET + 2 }
    expect(interactableAt(tile, 'adjacent', FIXTURE_REGISTRY)).toBeNull()
  })
})

describe('interactableAt — exact mode', () => {
  it('returns null for an empty tile', () => {
    const tile: Tile = { tx: 1, ty: 1 }
    expect(interactableAt(tile, 'exact', FIXTURE_REGISTRY)).toBeNull()
  })

  it('returns station focus when tile is the station footprint (y + offset)', () => {
    const tile: Tile = { tx: 10, ty: 5 + STATION_HEAD_TILE_OFFSET }
    const result = interactableAt(tile, 'exact', FIXTURE_REGISTRY)
    expect(result).toEqual({ kind: 'station', id: 'about' })
  })

  it('returns npc focus when tile is the exact NPC tile', () => {
    const tile: Tile = { tx: 15, ty: 8 }
    const result = interactableAt(tile, 'exact', FIXTURE_REGISTRY)
    expect(result).toEqual({ kind: 'npc' })
  })
})

describe('interactableAt — door focus from active scene', () => {
  it('returns a door focus carrying target scene and target spawn for an overworld archway tile', () => {
    const overworld = getScene('overworld')
    const registry = buildRegistry(overworld)
    const archway = overworld.doors[0]
    const tile: Tile = { tx: archway.x, ty: archway.y }
    const result = interactableAt(tile, 'exact', registry)
    expect(result).toMatchObject({
      kind: 'door',
      targetSceneId: 'exhibition-hall',
      targetSpawn: archway.targetSpawn,
    })
  })

  it('returns a door focus when standing adjacent to the hall exit door', () => {
    const hall = getScene('exhibition-hall')
    const registry = buildRegistry(hall)
    const exit = hall.doors[0]
    const tile: Tile = { tx: exit.x, ty: exit.y - 1 }
    const result = interactableAt(tile, 'adjacent', registry)
    expect(result).toMatchObject({
      kind: 'door',
      targetSceneId: 'overworld',
    })
  })
})

describe('interactableAt — sculpture focus from active scene', () => {
  it('returns a sculpture focus carrying the right project id from a sculpture tile in the active scene', () => {
    const hall = getScene('exhibition-hall')
    const registry = buildRegistry(hall)
    const sculpture = hall.sculptures[0]
    const tile: Tile = { tx: sculpture.x, ty: sculpture.y }
    const result = interactableAt(tile, 'exact', registry)
    expect(result).toEqual({ kind: 'sculpture', projectId: sculpture.projectId })
  })

  it('returns a sculpture focus when adjacent to a sculpture tile', () => {
    const hall = getScene('exhibition-hall')
    const registry = buildRegistry(hall)
    const sculpture = hall.sculptures[0]
    const tile: Tile = { tx: sculpture.x, ty: sculpture.y + 1 }
    const result = interactableAt(tile, 'adjacent', registry)
    expect(result).toEqual({ kind: 'sculpture', projectId: sculpture.projectId })
  })
})
