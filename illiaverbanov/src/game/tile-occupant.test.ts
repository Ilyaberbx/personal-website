import { describe, it, expect } from 'vitest'
import { tileOccupant, isWalkable, isInteractable } from './tile-occupant'
import { getScene } from './scenes/registry'

const overworld = getScene('overworld')
const hall = getScene('exhibition-hall')

describe('tileOccupant — overworld', () => {
  it('empty tile has kind:empty, is walkable, and is not interactable', () => {
    const occ = tileOccupant(overworld, 1, 1)
    expect(occ.kind).toBe('empty')
    expect(isWalkable(occ)).toBe(true)
    expect(isInteractable(occ)).toBe(false)
  })

  it('blocking terrain tile has kind:terrain and is not walkable', () => {
    const occ = tileOccupant(overworld, 0, 0)
    expect(occ.kind).toBe('terrain')
    expect(isWalkable(occ)).toBe(false)
    expect(isInteractable(occ)).toBe(false)
  })

  it('prop with blocks:true has kind:prop and is not walkable', () => {
    const occ = tileOccupant(overworld, 14, 11)
    expect(occ.kind).toBe('prop')
    expect(isWalkable(occ)).toBe(false)
    expect(isInteractable(occ)).toBe(false)
  })

  it('station head tile has kind:station role:head, is not walkable, and is interactable', () => {
    const occ = tileOccupant(overworld, 6, 4)
    expect(occ.kind).toBe('station')
    if (occ.kind === 'station') {
      expect(occ.id).toBe('about')
      expect(occ.role).toBe('head')
    }
    expect(isWalkable(occ)).toBe(false)
    expect(isInteractable(occ)).toBe(true)
  })

  it('station footprint tile has kind:station role:footprint, is walkable, and is interactable', () => {
    const occ = tileOccupant(overworld, 6, 5)
    expect(occ.kind).toBe('station')
    if (occ.kind === 'station') {
      expect(occ.id).toBe('about')
      expect(occ.role).toBe('footprint')
    }
    expect(isWalkable(occ)).toBe(true)
    expect(isInteractable(occ)).toBe(true)
  })

  it('NPC tile has kind:npc, is not walkable, and is interactable', () => {
    const occ = tileOccupant(overworld, 17, 13)
    expect(occ.kind).toBe('npc')
    expect(isWalkable(occ)).toBe(false)
    expect(isInteractable(occ)).toBe(true)
  })

  it('archway door tile has kind:door and is interactable', () => {
    const occ = tileOccupant(overworld, 16, 20)
    expect(occ.kind).toBe('door')
    expect(isInteractable(occ)).toBe(true)
  })

  it('out-of-bounds tile has kind:terrain and is not walkable', () => {
    const occ = tileOccupant(overworld, -1, -1)
    expect(occ.kind).toBe('terrain')
    expect(isWalkable(occ)).toBe(false)
  })
})

describe('tileOccupant — exhibition hall', () => {
  it('floor tile is empty and walkable', () => {
    const occ = tileOccupant(hall, 5, 5)
    expect(occ.kind).toBe('empty')
    expect(isWalkable(occ)).toBe(true)
  })

  it('wall border tile is terrain and not walkable', () => {
    const occ = tileOccupant(hall, 0, 0)
    expect(occ.kind).toBe('terrain')
    expect(isWalkable(occ)).toBe(false)
  })

  it('exit door tile is interactable door', () => {
    const occ = tileOccupant(hall, 9, 13)
    expect(occ.kind).toBe('door')
    expect(isInteractable(occ)).toBe(true)
  })
})
