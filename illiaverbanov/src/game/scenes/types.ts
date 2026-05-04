import type { TileId } from '../map'
import type { StationId } from '../../data/types'
import type { Facing } from '../sprites'

export type SceneId = 'overworld' | 'exhibition-hall'

export type ScenePropSprite = 'lamp' | 'fountain' | 'archway'

export type SceneProp = {
  x: number
  y: number
  sprite: ScenePropSprite
  blocks?: boolean
}

export type SceneStation = {
  id: StationId
  x: number
  y: number
}

export type SceneNpc = {
  x: number
  y: number
}

export type SceneDoor = {
  x: number
  y: number
  targetSceneId: SceneId
  targetSpawn: SceneSpawn
  label: string
  hint: string
}

export type SceneSpawn = {
  x: number
  y: number
  facing: Facing
}

export type Scene = {
  id: SceneId
  width: number
  height: number
  tiles: TileId[][]
  props: SceneProp[]
  spawn: SceneSpawn
  doors: SceneDoor[]
  stations: SceneStation[]
  npcs: SceneNpc[]
}
