import type { VoxelModel } from '../voxel.types'

const v = (x: number, y: number, z: number, color: VoxelModel['voxels'][number]['color']) => ({
  x,
  y,
  z,
  color,
})

const baseRing = [
  v(-1, 0, -1, 'primaryDark'),
  v(0, 0, -1, 'primaryDark'),
  v(1, 0, -1, 'primaryDark'),
  v(-1, 0, 0, 'primaryDark'),
  v(1, 0, 0, 'primaryDark'),
  v(-1, 0, 1, 'primaryDark'),
  v(0, 0, 1, 'primaryDark'),
  v(1, 0, 1, 'primaryDark'),
] as const

const trunk = [
  v(0, 1, 0, 'primary'),
  v(0, 2, 0, 'primary'),
  v(0, 3, 0, 'primaryLight'),
] as const

const crown = [
  v(-1, 4, 0, 'secondary'),
  v(1, 4, 0, 'secondary'),
  v(0, 4, -1, 'secondary'),
  v(0, 4, 1, 'secondary'),
  v(0, 4, 0, 'border'),
] as const

export const ABOUT_VOXEL_MODEL: VoxelModel = {
  id: 'about',
  voxels: [...baseRing, ...trunk, ...crown],
}
