import type { NpcContent, NpcId } from './types'

const WANDERING_BARD: NpcContent = {
  id: 'wandering-bard',
  name: 'Wandering Bard',
  hint: "Hear the bard's tale",
  lines: [
    'Hail, traveler!',
    'These lands belong to ILLIA — fullstack Web3 engineer.',
    'Each pavilion holds a chapter of his tale.',
    'Walk freely. Approach a sign and press [E] to read on.',
  ],
}

const CURATOR: NpcContent = {
  id: 'curator',
  name: 'Curator',
  hint: 'Hear the curator out',
  lines: [
    'Welcome to the Exhibition Hall. The works gathered here were shipped, not sketched.',
    'To your left, the Web3 wing — DeFi protocols and trading systems. To your right, the Gamedev wing — three games shaped by their constraints.',
    'Take your time. Each pedestal speaks for itself.',
  ],
}

export const NPCS: Record<NpcId, NpcContent> = {
  'wandering-bard': WANDERING_BARD,
  curator: CURATOR,
}
