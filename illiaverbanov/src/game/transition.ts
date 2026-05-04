import type { SceneId, SceneSpawn } from './scenes/types'

export const FADE_OUT_MS = 250
export const FADE_IN_MS = 250

export type TransitionPhase = 'idle' | 'fade-out' | 'fade-in'

export type TransitionState = {
  phase: TransitionPhase
  elapsedMs: number
  targetSceneId: SceneId | null
  targetSpawn: SceneSpawn | null
}

export type TransitionEvent =
  | { kind: 'none' }
  | { kind: 'apply-scene'; sceneId: SceneId; spawn: SceneSpawn }
  | { kind: 'finished' }

export function initialTransition(): TransitionState {
  return {
    phase: 'idle',
    elapsedMs: 0,
    targetSceneId: null,
    targetSpawn: null,
  }
}

export function startTransition(
  state: TransitionState,
  targetSceneId: SceneId,
  targetSpawn: SceneSpawn,
): TransitionState {
  if (state.phase !== 'idle') return state
  return {
    phase: 'fade-out',
    elapsedMs: 0,
    targetSceneId,
    targetSpawn,
  }
}

export function tickTransition(
  state: TransitionState,
  deltaMs: number,
): { state: TransitionState; event: TransitionEvent } {
  if (state.phase === 'idle') return { state, event: { kind: 'none' } }

  const nextElapsed = state.elapsedMs + deltaMs

  if (state.phase === 'fade-out') {
    const isFadeOutComplete = nextElapsed >= FADE_OUT_MS
    if (!isFadeOutComplete) {
      return {
        state: { ...state, elapsedMs: nextElapsed },
        event: { kind: 'none' },
      }
    }
    if (!state.targetSceneId || !state.targetSpawn) {
      throw new Error('unreachable: fade-out without target')
    }
    return {
      state: {
        phase: 'fade-in',
        elapsedMs: 0,
        targetSceneId: state.targetSceneId,
        targetSpawn: state.targetSpawn,
      },
      event: {
        kind: 'apply-scene',
        sceneId: state.targetSceneId,
        spawn: state.targetSpawn,
      },
    }
  }

  const isFadeInComplete = nextElapsed >= FADE_IN_MS
  if (!isFadeInComplete) {
    return {
      state: { ...state, elapsedMs: nextElapsed },
      event: { kind: 'none' },
    }
  }
  return {
    state: initialTransition(),
    event: { kind: 'finished' },
  }
}

export function fadeAlpha(state: TransitionState): number {
  if (state.phase === 'idle') return 0
  if (state.phase === 'fade-out') return Math.min(1, state.elapsedMs / FADE_OUT_MS)
  return Math.max(0, 1 - state.elapsedMs / FADE_IN_MS)
}

export function isTransitionActive(state: TransitionState): boolean {
  return state.phase !== 'idle'
}
