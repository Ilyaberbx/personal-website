import { err, ok, type Result } from 'neverthrow'
import type { Scene, SceneId } from './types'
import { OVERWORLD } from './overworld'
import { EXHIBITION_HALL } from './exhibition-hall'

export class UnknownSceneError extends Error {
  readonly kind = 'unknown-scene' as const
  readonly sceneId: string

  constructor(sceneId: string) {
    super(`Unknown scene: ${sceneId}`)
    this.sceneId = sceneId
    this.name = 'UnknownSceneError'
  }
}

const SCENES: Record<SceneId, Scene> = {
  overworld: OVERWORLD,
  'exhibition-hall': EXHIBITION_HALL,
}

export function getScene(id: SceneId): Scene {
  return SCENES[id]
}

export function resolveScene(id: string): Result<Scene, UnknownSceneError> {
  const isKnown = id in SCENES
  if (!isKnown) return err(new UnknownSceneError(id))
  return ok(SCENES[id as SceneId])
}

export const INITIAL_SCENE_ID: SceneId = 'overworld'
