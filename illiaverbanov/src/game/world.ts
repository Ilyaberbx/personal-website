import { getPlayerTile, type PlayerState } from './player'
import { interactableAt, type WorldFocus } from './interactable'

export type { WorldFocus }

export function findFocus(p: PlayerState): WorldFocus {
  const tile = getPlayerTile(p)
  return interactableAt(tile, 'adjacent')
}

export function isSameFocus(a: WorldFocus, b: WorldFocus): boolean {
  if (a === null && b === null) return true
  if (a === null || b === null) return false
  if (a.kind !== b.kind) return false
  if (a.kind === 'station' && b.kind === 'station') return a.id === b.id
  return true
}
