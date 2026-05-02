import { describe, expect, it } from 'vitest'
import { VOXEL_MODELS, getVoxelModelForFocus } from './voxel-registry'
import { MAX_VOXEL_RADIUS } from './voxel.types'

describe('voxel registry', () => {
  it('every model has at least one voxel', () => {
    expect(VOXEL_MODELS.length).toBeGreaterThan(0)
    for (const model of VOXEL_MODELS) {
      expect(model.voxels.length).toBeGreaterThan(0)
    }
  })

  it('no voxel sits beyond MAX_VOXEL_RADIUS from origin', () => {
    for (const model of VOXEL_MODELS) {
      for (const voxel of model.voxels) {
        const isWithinRadius =
          Math.abs(voxel.x) <= MAX_VOXEL_RADIUS &&
          Math.abs(voxel.y) <= MAX_VOXEL_RADIUS &&
          Math.abs(voxel.z) <= MAX_VOXEL_RADIUS
        expect(isWithinRadius).toBe(true)
      }
    }
  })

  it('returns the about model for the about station focus', () => {
    const model = getVoxelModelForFocus({ kind: 'station', id: 'about' })
    expect(model?.id).toBe('about')
  })

  it.each(['about', 'contact', 'experience', 'skills', 'trophies'] as const)(
    'returns a model for the %s station focus',
    (id) => {
      const model = getVoxelModelForFocus({ kind: 'station', id })
      expect(model?.id).toBe(id)
    },
  )

  it('returns null for null focus', () => {
    expect(getVoxelModelForFocus(null)).toBeNull()
  })
})
