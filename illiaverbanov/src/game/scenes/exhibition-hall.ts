import { parseRawMap } from '../map'
import type { Scene, SceneProp, SceneSculpture } from './types'

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

const WEB3_WING_X = 2
const GAMEDEV_WING_X = 17
const SCULPTURE_ROWS = [3, 6, 9] as const

const SCULPTURES: SceneSculpture[] = [
  { x: WEB3_WING_X, y: SCULPTURE_ROWS[0], projectId: 'syntropia' },
  { x: WEB3_WING_X, y: SCULPTURE_ROWS[1], projectId: 'miracle' },
  { x: WEB3_WING_X, y: SCULPTURE_ROWS[2], projectId: 'cult' },
  { x: GAMEDEV_WING_X, y: SCULPTURE_ROWS[0], projectId: 'cooking-rage' },
  { x: GAMEDEV_WING_X, y: SCULPTURE_ROWS[1], projectId: 'beware-of-winterforest' },
  { x: GAMEDEV_WING_X, y: SCULPTURE_ROWS[2], projectId: 'eat-fit' },
]

const PEDESTAL_PROPS: SceneProp[] = SCULPTURES.map((s) => ({
  x: s.x,
  y: s.y,
  sprite: 'pedestal',
  blocks: true,
}))

export const EXHIBITION_HALL: Scene = {
  id: 'exhibition-hall',
  width: RAW_MAP[0].length,
  height: RAW_MAP.length,
  tiles: parseRawMap(RAW_MAP),
  props: PEDESTAL_PROPS,
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
  sculptures: SCULPTURES,
}
