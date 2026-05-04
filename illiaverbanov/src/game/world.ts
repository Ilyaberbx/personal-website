import { getPlayerTile, type PlayerState } from './player'
import {
  buildRegistry,
  interactableAt,
  type InteractableEntry,
  type WorldFocus,
} from './interactable'

export type { WorldFocus }

export function findFocus(p: PlayerState, registry: InteractableEntry[]): WorldFocus {
  const tile = getPlayerTile(p)
  return interactableAt(tile, 'adjacent', registry)
}

export { buildRegistry }

export function isSameFocus(a: WorldFocus, b: WorldFocus): boolean {
  if (a === null && b === null) return true
  if (a === null || b === null) return false
  if (a.kind !== b.kind) return false
  if (a.kind === 'station' && b.kind === 'station') return a.id === b.id
  if (a.kind === 'door' && b.kind === 'door') {
    return a.targetSceneId === b.targetSceneId
  }
  return true
}
