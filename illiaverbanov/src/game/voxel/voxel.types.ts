import type { PaletteKey } from '../palette'

export type Voxel = {
  x: number
  y: number
  z: number
  color: PaletteKey
}

export type VoxelModel = {
  id: string
  voxels: readonly Voxel[]
}

export const MAX_VOXEL_RADIUS = 16
