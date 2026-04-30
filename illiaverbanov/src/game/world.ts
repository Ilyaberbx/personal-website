import { STATIONS, NPC, type StationId, type Station } from '../data/map'
import { getPlayerTile, type PlayerState } from './player'

export type WorldFocus =
  | { kind: 'station'; id: StationId; station: Station }
  | { kind: 'npc' }
  | null

export function findFocus(p: PlayerState): WorldFocus {
  const { tx, ty } = getPlayerTile(p)
  // Station: adjacent (manhattan = 1) and player faces toward it
  for (const s of STATIONS) {
    const dx = s.x - tx
    const dy = s.y - ty
    const dist = Math.abs(dx) + Math.abs(dy)
    if (dist <= 1) {
      // any of 4 cardinal neighbors
      return { kind: 'station', id: s.id, station: s }
    }
  }
  const ndx = NPC.x - tx
  const ndy = NPC.y - ty
  if (Math.abs(ndx) + Math.abs(ndy) <= 1) return { kind: 'npc' }
  return null
}
