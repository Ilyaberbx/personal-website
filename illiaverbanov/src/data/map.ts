// Tile-based world map.
//   .  grass (passable)
//   -  path / cobble (passable)
//   T  tree (blocks)
//   ~  water (blocks)
//   #  wall (blocks)
//   f  flower (passable, decorative)
//   l  lamp post (blocks, decorative)
//
// Stations & decorations are placed on top of this terrain via STATIONS / PROPS.

export const TILE = {
  Grass: 0,
  Path: 1,
  Tree: 2,
  Water: 3,
  Wall: 4,
  Flower: 5,
  Lamp: 6,
} as const

export type TileId = (typeof TILE)[keyof typeof TILE]

const charToTile: Record<string, TileId> = {
  '.': TILE.Grass,
  '-': TILE.Path,
  T: TILE.Tree,
  '~': TILE.Water,
  '#': TILE.Wall,
  f: TILE.Flower,
  l: TILE.Lamp,
}

const rawMap = [
  'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
  'T..............................T',
  'T..............................T',
  'T...............-..............T',
  'T...............-..............T',
  'T..f............-..........f...T',
  'T...............-..............T',
  'T..~~~..........-..............T',
  'T..~~~~.........-..............T',
  'T..~~~..........-..............T',
  'T...............-..............T',
  'T-------------------------------T',
  'T...............-..............T',
  'T...............-..............T',
  'T...............-..............T',
  'T..f............-..........f...T',
  'T...............-..............T',
  'T...............-..............T',
  'T...............-..............T',
  'T...............-..............T',
  'T..............................T',
  'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
]

export const MAP_WIDTH = rawMap[0].length
export const MAP_HEIGHT = rawMap.length

export const TILES: TileId[][] = rawMap.map((row) =>
  row.split('').map((ch) => charToTile[ch] ?? TILE.Grass),
)

const blocking = new Set<TileId>([TILE.Tree, TILE.Water, TILE.Wall, TILE.Lamp])

export function isBlocked(x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT) return true
  return blocking.has(TILES[y][x])
}

export type StationId = 'about' | 'skills' | 'experience' | 'trophies' | 'contact'

export type Station = {
  id: StationId
  x: number
  y: number
  sprite: 'tavern' | 'armory' | 'quest-board' | 'trophy-hall' | 'mailbox'
  label: string
  hint: string
}

export const STATIONS: Station[] = [
  {
    id: 'about',
    x: 6,
    y: 4,
    sprite: 'tavern',
    label: 'The Tavern',
    hint: 'Read the traveler\'s tale',
  },
  {
    id: 'skills',
    x: 25,
    y: 4,
    sprite: 'armory',
    label: 'The Armory',
    hint: 'Inspect equipped skills',
  },
  {
    id: 'experience',
    x: 16,
    y: 2,
    sprite: 'quest-board',
    label: 'Quest Board',
    hint: 'Review completed quests',
  },
  {
    id: 'trophies',
    x: 25,
    y: 17,
    sprite: 'trophy-hall',
    label: 'Trophy Hall',
    hint: 'Admire the trophies',
  },
  {
    id: 'contact',
    x: 6,
    y: 17,
    sprite: 'mailbox',
    label: 'The Mailbox',
    hint: 'Send a raven',
  },
]

export type Prop = {
  x: number
  y: number
  sprite: 'lamp' | 'fountain' | 'sign'
  blocks?: boolean
}

export const PROPS: Prop[] = [
  { x: 14, y: 11, sprite: 'fountain', blocks: true },
  { x: 18, y: 11, sprite: 'fountain', blocks: true },
  { x: 4, y: 9, sprite: 'lamp', blocks: true },
  { x: 27, y: 13, sprite: 'lamp', blocks: true },
]

export function isPropBlocked(x: number, y: number): boolean {
  return PROPS.some((p) => p.blocks && p.x === x && p.y === y)
}

export function isStationBlocked(x: number, y: number): boolean {
  return STATIONS.some((s) => s.x === x && s.y === y)
}

export const SPAWN = { x: 16, y: 13, facing: 'up' as const }

export const NPC = {
  x: 17,
  y: 13,
  label: 'Wandering Bard',
  lines: [
    "Hail, traveler!",
    "These lands belong to ILLIA — fullstack Web3 engineer.",
    "Each pavilion holds a chapter of his tale.",
    "Walk freely. Approach a sign and press [E] to read on.",
  ],
}
