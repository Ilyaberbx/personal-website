import { parseRawMap } from '../map'
import type { Scene } from './types'

const RAW_MAP = [
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

const ARCHWAY_TILE = { x: 16, y: 20 }

export const OVERWORLD: Scene = {
  id: 'overworld',
  width: RAW_MAP[0].length,
  height: RAW_MAP.length,
  tiles: parseRawMap(RAW_MAP),
  props: [
    { x: 14, y: 11, sprite: 'fountain', blocks: true },
    { x: 18, y: 11, sprite: 'fountain', blocks: true },
    { x: 4, y: 9, sprite: 'lamp', blocks: true },
    { x: 27, y: 13, sprite: 'lamp', blocks: true },
    { x: ARCHWAY_TILE.x, y: ARCHWAY_TILE.y, sprite: 'archway' },
  ],
  spawn: { x: 16, y: 13, facing: 'up' },
  doors: [
    {
      x: ARCHWAY_TILE.x,
      y: ARCHWAY_TILE.y,
      targetSceneId: 'exhibition-hall',
      targetSpawn: { x: 9, y: 12, facing: 'up' },
      label: 'Exhibition Hall',
      hint: 'Step through the archway',
    },
  ],
  stations: [
    { id: 'about', x: 6, y: 4 },
    { id: 'skills', x: 25, y: 4 },
    { id: 'experience', x: 16, y: 2 },
    { id: 'trophies', x: 25, y: 17 },
    { id: 'contact', x: 6, y: 17 },
  ],
  npcs: [{ x: 17, y: 13 }],
  sculptures: [],
}

export const OVERWORLD_ARCHWAY_TILE = ARCHWAY_TILE
