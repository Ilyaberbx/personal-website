import { tileOccupant, isWalkable, isInteractable } from './tile-occupant'

// Map layout reference (from map.ts):
//   (0,0) = TILE.Tree — blocking terrain
//   (1,1) = TILE.Grass — open, no occupants
//   about station head: (6,4)
//   fountain prop (blocks:true): (14,11)
//   NPC_POSITION: (17,13)
//   out-of-bounds: (-1,-1)

it('empty tile has kind:empty, is walkable, and is not interactable', () => {
  const occ = tileOccupant(1, 1)
  expect(occ.kind).toBe('empty')
  expect(isWalkable(occ)).toBe(true)
  expect(isInteractable(occ)).toBe(false)
})

it('blocking terrain tile has kind:terrain and is not walkable', () => {
  const occ = tileOccupant(0, 0)
  expect(occ.kind).toBe('terrain')
  expect(isWalkable(occ)).toBe(false)
  expect(isInteractable(occ)).toBe(false)
})

it('prop with blocks:true has kind:prop and is not walkable', () => {
  const occ = tileOccupant(14, 11)
  expect(occ.kind).toBe('prop')
  expect(isWalkable(occ)).toBe(false)
  expect(isInteractable(occ)).toBe(false)
})

it('station head tile has kind:station role:head, is not walkable, and is interactable', () => {
  const occ = tileOccupant(6, 4)
  expect(occ.kind).toBe('station')
  if (occ.kind === 'station') {
    expect(occ.id).toBe('about')
    expect(occ.role).toBe('head')
  }
  expect(isWalkable(occ)).toBe(false)
  expect(isInteractable(occ)).toBe(true)
})

it('station footprint tile has kind:station role:footprint, is walkable, and is interactable', () => {
  const occ = tileOccupant(6, 5)
  expect(occ.kind).toBe('station')
  if (occ.kind === 'station') {
    expect(occ.id).toBe('about')
    expect(occ.role).toBe('footprint')
  }
  expect(isWalkable(occ)).toBe(true)
  expect(isInteractable(occ)).toBe(true)
})

it('NPC tile has kind:npc, is not walkable, and is interactable', () => {
  const occ = tileOccupant(17, 13)
  expect(occ.kind).toBe('npc')
  expect(isWalkable(occ)).toBe(false)
  expect(isInteractable(occ)).toBe(true)
})

it('out-of-bounds tile has kind:terrain and is not walkable', () => {
  const occ = tileOccupant(-1, -1)
  expect(occ.kind).toBe('terrain')
  expect(isWalkable(occ)).toBe(false)
})
