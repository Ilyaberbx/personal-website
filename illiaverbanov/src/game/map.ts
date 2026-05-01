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

const TILE_CHARS: Record<TileId, string> = {
  [TILE.Grass]: '.',
  [TILE.Path]: '-',
  [TILE.Tree]: 'T',
  [TILE.Water]: '~',
  [TILE.Wall]: '#',
  [TILE.Flower]: 'f',
  [TILE.Lamp]: 'l',
}

const charToTile: Record<string, TileId> = Object.fromEntries(
  (Object.entries(TILE_CHARS) as [string, string][]).map(([id, char]) => [char, Number(id) as TileId]),
)

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
  const isOutOfBounds = x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT
  if (isOutOfBounds) return true
  return blocking.has(TILES[y][x])
}

export type Prop = {
  x: number
  y: number
  sprite: 'lamp' | 'fountain'
  blocks?: boolean
}

export const PROPS: Prop[] = [
  { x: 14, y: 11, sprite: 'fountain', blocks: true },
  { x: 18, y: 11, sprite: 'fountain', blocks: true },
  { x: 4, y: 9, sprite: 'lamp', blocks: true },
  { x: 27, y: 13, sprite: 'lamp', blocks: true },
]


export const SPAWN = { x: 16, y: 13, facing: 'up' as const }

export const NPC_POSITION = { x: 17, y: 13 }
