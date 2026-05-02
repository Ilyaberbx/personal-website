import type { WorldFocus } from '../world'
import type { VoxelModel } from './voxel.types'
import { ABOUT_VOXEL_MODEL } from './models/about-model'
import { BARD_VOXEL_MODEL } from './models/bard-model'

export function getVoxelModelForFocus(focus: WorldFocus): VoxelModel | null {
  if (!focus) return null
  if (focus.kind === 'npc') return BARD_VOXEL_MODEL
  if (focus.kind !== 'station') return null
  if (focus.id === 'about') return ABOUT_VOXEL_MODEL
  return null
}

export const VOXEL_MODELS: readonly VoxelModel[] = [ABOUT_VOXEL_MODEL, BARD_VOXEL_MODEL]
