import type { TileId } from '../map'
import type { NpcId, StationId } from '../../data/types'
import type { Facing } from '../sprites'

export type SceneId = 'overworld' | 'exhibition-hall'

export type ScenePropSprite = 'lamp' | 'fountain' | 'archway' | 'pedestal'

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
  id: NpcId
  x: number
  y: number
}

export type SceneSculpture = {
  x: number
  y: number
  projectId: string
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
  sculptures: SceneSculpture[]
}
