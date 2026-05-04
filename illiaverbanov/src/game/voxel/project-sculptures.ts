import { projects } from '../../data'
import type { VoxelModel } from './voxel.types'
import { SCULPTURE_PLACEHOLDER_VOXEL_MODEL } from './models/sculpture-placeholder-model'

const PROJECT_SCULPTURE_MODELS: Record<string, VoxelModel> = Object.fromEntries(
  projects.map((p) => [p.id, SCULPTURE_PLACEHOLDER_VOXEL_MODEL]),
)

export function getSculptureVoxelModel(projectId: string): VoxelModel | null {
  return PROJECT_SCULPTURE_MODELS[projectId] ?? null
}

export const PROJECT_SCULPTURE_REGISTRY: Readonly<Record<string, VoxelModel>> =
  PROJECT_SCULPTURE_MODELS
