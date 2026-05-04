import type { WorldFocus } from '../world'
import type { VoxelModel } from './voxel.types'
import { ABOUT_VOXEL_MODEL } from './models/about-model'
import { BARD_VOXEL_MODEL } from './models/bard-model'
import { CONTACT_VOXEL_MODEL } from './models/contact-model'
import { EXPERIENCE_VOXEL_MODEL } from './models/experience-model'
import { SKILLS_VOXEL_MODEL } from './models/skills-model'
import { TROPHIES_VOXEL_MODEL } from './models/trophies-model'
import { SCULPTURE_PLACEHOLDER_VOXEL_MODEL } from './models/sculpture-placeholder-model'
import { getSculptureVoxelModel } from './project-sculptures'

const STATION_MODELS: Record<string, VoxelModel> = {
  about: ABOUT_VOXEL_MODEL,
  contact: CONTACT_VOXEL_MODEL,
  experience: EXPERIENCE_VOXEL_MODEL,
  skills: SKILLS_VOXEL_MODEL,
  trophies: TROPHIES_VOXEL_MODEL,
}

export function getVoxelModelForFocus(focus: WorldFocus): VoxelModel | null {
  if (!focus) return null
  if (focus.kind === 'npc') return BARD_VOXEL_MODEL
  if (focus.kind === 'sculpture') return getSculptureVoxelModel(focus.projectId)
  if (focus.kind !== 'station') return null
  return STATION_MODELS[focus.id] ?? null
}

export const VOXEL_MODELS: readonly VoxelModel[] = [
  ABOUT_VOXEL_MODEL,
  BARD_VOXEL_MODEL,
  CONTACT_VOXEL_MODEL,
  EXPERIENCE_VOXEL_MODEL,
  SKILLS_VOXEL_MODEL,
  TROPHIES_VOXEL_MODEL,
  SCULPTURE_PLACEHOLDER_VOXEL_MODEL,
]
