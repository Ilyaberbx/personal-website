import type { VoxelModel } from './voxel.types'
import { SYNTROPIA_VOXEL_MODEL } from './models/syntropia-model'
import { MIRACLE_VOXEL_MODEL } from './models/miracle-model'
import { CULT_VOXEL_MODEL } from './models/cult-model'
import { COOKING_RAGE_VOXEL_MODEL } from './models/cooking-rage-model'
import { WINTERFOREST_VOXEL_MODEL } from './models/winterforest-model'
import { EAT_FIT_VOXEL_MODEL } from './models/eat-fit-model'

const PROJECT_SCULPTURE_MODELS: Record<string, VoxelModel> = {
  syntropia: SYNTROPIA_VOXEL_MODEL,
  miracle: MIRACLE_VOXEL_MODEL,
  cult: CULT_VOXEL_MODEL,
  'cooking-rage': COOKING_RAGE_VOXEL_MODEL,
  'beware-of-winterforest': WINTERFOREST_VOXEL_MODEL,
  'eat-fit': EAT_FIT_VOXEL_MODEL,
}

export function getSculptureVoxelModel(projectId: string): VoxelModel | null {
  return PROJECT_SCULPTURE_MODELS[projectId] ?? null
}

export const PROJECT_SCULPTURE_REGISTRY: Readonly<Record<string, VoxelModel>> =
  PROJECT_SCULPTURE_MODELS

export const PROJECT_SCULPTURE_MODEL_LIST: readonly VoxelModel[] = [
  SYNTROPIA_VOXEL_MODEL,
  MIRACLE_VOXEL_MODEL,
  CULT_VOXEL_MODEL,
  COOKING_RAGE_VOXEL_MODEL,
  WINTERFOREST_VOXEL_MODEL,
  EAT_FIT_VOXEL_MODEL,
]
