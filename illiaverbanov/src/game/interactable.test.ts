import { describe, it, expect } from 'vitest'
import { interactableAt, type InteractableEntry } from './interactable'

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

  it('deterministic ordering: returns first registry entry when adjacent to two stations', () => {
    const CLOSE_STATIONS: InteractableEntry[] = [
      { kind: 'station', id: 'about', x: 10, y: 5 },
      { kind: 'station', id: 'skills', x: 10, y: 7 },
    ]
    const tile: Tile = { tx: 10, ty: 6 }
    const result = interactableAt(tile, 'adjacent', CLOSE_STATIONS)
    expect(result).toEqual({ kind: 'station', id: 'about' })
  })

  it('returns null when tile is distance 2 away (outside adjacent range)', () => {
    const tile: Tile = { tx: 10, ty: 7 }
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

  it('returns station focus when tile is the station head', () => {
    const tile: Tile = { tx: 10, ty: 5 }
    const result = interactableAt(tile, 'exact', FIXTURE_REGISTRY)
    expect(result).toEqual({ kind: 'station', id: 'about' })
  })

  it('returns npc focus when tile is the exact NPC tile', () => {
    const tile: Tile = { tx: 15, ty: 8 }
    const result = interactableAt(tile, 'exact', FIXTURE_REGISTRY)
    expect(result).toEqual({ kind: 'npc' })
  })

  it('returns null when tile is adjacent but not exact to a station', () => {
    const tile: Tile = { tx: 10, ty: 7 }
    expect(interactableAt(tile, 'exact', FIXTURE_REGISTRY)).toBeNull()
  })

  it('deterministic ordering: returns first registry entry when exact match on two', () => {
    const OVERLAPPING: InteractableEntry[] = [
      { kind: 'station', id: 'about', x: 10, y: 5 },
      { kind: 'station', id: 'skills', x: 10, y: 5 },
    ]
    const tile: Tile = { tx: 10, ty: 5 }
    const result = interactableAt(tile, 'exact', OVERLAPPING)
    expect(result).toEqual({ kind: 'station', id: 'about' })
  })
})
