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

// Bound on |x|, |y|, |z| for any voxel in any registered model. The bard hero
// reaches y=17 (hat plume) and is the tallest piece; sculpture top-pieces stay
// well within ~6×6×8. 18 leaves headroom without permitting drift.
export const MAX_VOXEL_RADIUS = 18
