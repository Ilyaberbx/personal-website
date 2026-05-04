import { useSyncExternalStore } from 'react'
import type { Engine } from '../game/engine'
import type { SceneId, SceneSpawn } from '../game/scenes/types'

export function useGameState(engine: Engine) {
  const state = useSyncExternalStore(
    (l) => engine.subscribe(l),
    () => engine.getSnapshot(),
    () => engine.getSnapshot(),
  )
  const transitionToScene = (target: SceneId, spawn: SceneSpawn) =>
    engine.transitionToScene(target, spawn)
  return { ...state, transitionToScene }
}
