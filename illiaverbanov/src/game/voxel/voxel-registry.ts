import type { WorldFocus } from '../world'
import type { VoxelModel } from './voxel.types'
import { ABOUT_VOXEL_MODEL } from './models/about-model'

export function getVoxelModelForFocus(focus: WorldFocus): VoxelModel | null {
  if (!focus) return null
  if (focus.kind === 'npc') return null
  if (focus.kind !== 'station') return null
  if (focus.id === 'about') return ABOUT_VOXEL_MODEL
  return null
}

export const VOXEL_MODELS: readonly VoxelModel[] = [ABOUT_VOXEL_MODEL]
