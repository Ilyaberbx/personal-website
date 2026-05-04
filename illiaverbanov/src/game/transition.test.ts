import { describe, it, expect } from 'vitest'
import {
  fadeAlpha,
  initialTransition,
  isTransitionActive,
  startTransition,
  tickTransition,
  FADE_IN_MS,
  FADE_OUT_MS,
} from './transition'
import type { SceneSpawn } from './scenes/types'

const TARGET_SPAWN: SceneSpawn = { x: 5, y: 5, facing: 'down' }

describe('transition controller', () => {
  it('starts idle with zero fade alpha and no active flag', () => {
    const s = initialTransition()
    expect(s.phase).toBe('idle')
    expect(fadeAlpha(s)).toBe(0)
    expect(isTransitionActive(s)).toBe(false)
  })

  it('startTransition moves to fade-out and becomes active', () => {
    const s = startTransition(initialTransition(), 'exhibition-hall', TARGET_SPAWN)
    expect(s.phase).toBe('fade-out')
    expect(s.targetSceneId).toBe('exhibition-hall')
    expect(isTransitionActive(s)).toBe(true)
  })

  it('startTransition is ignored while a transition is already active', () => {
    const fading = startTransition(initialTransition(), 'exhibition-hall', TARGET_SPAWN)
    const ignored = startTransition(fading, 'overworld', TARGET_SPAWN)
    expect(ignored.targetSceneId).toBe('exhibition-hall')
  })

  it('mid fade-out tick increments elapsedMs without emitting an event', () => {
    const start = startTransition(initialTransition(), 'exhibition-hall', TARGET_SPAWN)
    const { state, event } = tickTransition(start, 100)
    expect(state.phase).toBe('fade-out')
    expect(state.elapsedMs).toBe(100)
    expect(event.kind).toBe('none')
    expect(fadeAlpha(state)).toBeCloseTo(100 / FADE_OUT_MS, 5)
  })

  it('completing fade-out emits apply-scene and switches to fade-in', () => {
    const start = startTransition(initialTransition(), 'exhibition-hall', TARGET_SPAWN)
    const { state, event } = tickTransition(start, FADE_OUT_MS)
    expect(state.phase).toBe('fade-in')
    expect(state.elapsedMs).toBe(0)
    expect(event).toMatchObject({
      kind: 'apply-scene',
      sceneId: 'exhibition-hall',
      spawn: TARGET_SPAWN,
    })
  })

  it('completing fade-in emits finished and returns to idle', () => {
    const start = startTransition(initialTransition(), 'exhibition-hall', TARGET_SPAWN)
    const afterSwap = tickTransition(start, FADE_OUT_MS).state
    const { state, event } = tickTransition(afterSwap, FADE_IN_MS)
    expect(state.phase).toBe('idle')
    expect(event.kind).toBe('finished')
    expect(fadeAlpha(state)).toBe(0)
  })
})
