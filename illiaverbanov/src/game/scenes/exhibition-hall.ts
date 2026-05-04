import { parseRawMap } from '../map'
import type { Scene } from './types'

const RAW_MAP = [
  '####################',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '#FFFFFFFFFFFFFFFFFF#',
  '######FFFF##########',
]

const ENTRANCE_DOOR = { x: 10, y: 13 }
const EXIT_DOOR = { x: 9, y: 13 }
const SPAWN_TILE = { x: 10, y: 12 }

export const EXHIBITION_HALL: Scene = {
  id: 'exhibition-hall',
  width: RAW_MAP[0].length,
  height: RAW_MAP.length,
  tiles: parseRawMap(RAW_MAP),
  props: [],
  spawn: { x: SPAWN_TILE.x, y: SPAWN_TILE.y, facing: 'up' },
  doors: [
    {
      x: EXIT_DOOR.x,
      y: EXIT_DOOR.y,
      targetSceneId: 'overworld',
      targetSpawn: { x: 16, y: 20, facing: 'down' },
      label: 'Hall Exit',
      hint: 'Return to the world',
    },
    {
      x: ENTRANCE_DOOR.x,
      y: ENTRANCE_DOOR.y,
      targetSceneId: 'overworld',
      targetSpawn: { x: 16, y: 20, facing: 'down' },
      label: 'Hall Entrance',
      hint: 'Step back outside',
    },
  ],
  stations: [],
  npcs: [],
}
