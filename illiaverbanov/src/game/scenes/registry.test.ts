import { describe, it, expect } from 'vitest'
import { getScene, resolveScene, UnknownSceneError } from './registry'

describe('scene registry', () => {
  it('getScene returns the overworld scene with expected dimensions', () => {
    const scene = getScene('overworld')
    expect(scene.id).toBe('overworld')
    expect(scene.width).toBe(32)
    expect(scene.height).toBe(22)
  })

  it('getScene returns the exhibition-hall scene with documented dimensions', () => {
    const scene = getScene('exhibition-hall')
    expect(scene.id).toBe('exhibition-hall')
    expect(scene.width).toBe(20)
    expect(scene.height).toBe(14)
  })

  it('overworld scene includes the southern archway door targeting exhibition-hall', () => {
    const scene = getScene('overworld')
    const archwayDoor = scene.doors.find((d) => d.targetSceneId === 'exhibition-hall')
    expect(archwayDoor).toBeDefined()
    expect(archwayDoor?.x).toBe(16)
    expect(archwayDoor?.y).toBe(20)
  })

  it('exhibition-hall scene has at least one exit door back to overworld', () => {
    const scene = getScene('exhibition-hall')
    const exitDoor = scene.doors.find((d) => d.targetSceneId === 'overworld')
    expect(exitDoor).toBeDefined()
    expect(exitDoor?.targetSpawn.x).toBe(16)
    expect(exitDoor?.targetSpawn.y).toBe(20)
  })

  it('resolveScene returns ok for known ids and err for unknown ids', () => {
    const known = resolveScene('overworld')
    expect(known.isOk()).toBe(true)

    const unknown = resolveScene('atlantis')
    expect(unknown.isErr()).toBe(true)
    if (unknown.isErr()) {
      expect(unknown.error).toBeInstanceOf(UnknownSceneError)
      expect(unknown.error.kind).toBe('unknown-scene')
    }
  })
})
