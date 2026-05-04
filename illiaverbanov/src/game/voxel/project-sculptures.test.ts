import { describe, it, expect } from 'vitest'
import { projects } from '../../data'
import {
  PROJECT_SCULPTURE_REGISTRY,
  getSculptureVoxelModel,
} from './project-sculptures'

describe('project sculptures registry', () => {
  it('every project id has a registered voxel top-piece', () => {
    expect(projects.length).toBeGreaterThan(0)
    for (const project of projects) {
      const model = PROJECT_SCULPTURE_REGISTRY[project.id]
      expect(model).toBeDefined()
      expect(model.voxels.length).toBeGreaterThan(0)
    }
  })

  it('getSculptureVoxelModel returns a model for each project id', () => {
    for (const project of projects) {
      const model = getSculptureVoxelModel(project.id)
      expect(model).not.toBeNull()
    }
  })

  it('getSculptureVoxelModel returns null for an unknown id', () => {
    expect(getSculptureVoxelModel('nope-not-a-project')).toBeNull()
  })
})
