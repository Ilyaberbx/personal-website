import { useSyncExternalStore } from 'react'
import type { Engine } from '../game/engine'

export function useGameState(engine: Engine) {
  return useSyncExternalStore(
    (l) => engine.subscribe(l),
    () => engine.getSnapshot(),
    () => engine.getSnapshot(),
  )
}
