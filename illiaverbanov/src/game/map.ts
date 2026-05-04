export const TILE = {
  Grass: 0,
  Path: 1,
  Tree: 2,
  Water: 3,
  Wall: 4,
  Flower: 5,
  Lamp: 6,
  Floor: 7,
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
  [TILE.Floor]: 'F',
}

const charToTile: Record<string, TileId> = Object.fromEntries(
  (Object.entries(TILE_CHARS) as [string, string][]).map(([id, char]) => [
    char,
    Number(id) as TileId,
  ]),
)

export function parseRawMap(rawMap: readonly string[]): TileId[][] {
  return rawMap.map((row) =>
    row.split('').map((ch) => charToTile[ch] ?? TILE.Grass),
  )
}

const BLOCKING_TILES = new Set<TileId>([
  TILE.Tree,
  TILE.Water,
  TILE.Wall,
  TILE.Lamp,
])

export function isBlockingTile(id: TileId): boolean {
  return BLOCKING_TILES.has(id)
}
