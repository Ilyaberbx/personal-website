import type { VoxelModel } from '../voxel.types'

const v = (x: number, y: number, z: number, color: VoxelModel['voxels'][number]['color']) => ({
  x,
  y,
  z,
  color,
})

const body = [
  v(-2, 0, -1, 'primaryDark'),
  v(-1, 0, -1, 'primaryDark'),
  v(0, 0, -1, 'primaryDark'),
  v(1, 0, -1, 'primaryDark'),
  v(2, 0, -1, 'primaryDark'),
  v(-2, 1, -1, 'primary'),
  v(-1, 1, -1, 'primary'),
  v(0, 1, -1, 'primary'),
  v(1, 1, -1, 'primary'),
  v(2, 1, -1, 'primary'),
  v(-2, 2, -1, 'primary'),
  v(-1, 2, -1, 'primary'),
  v(0, 2, -1, 'primaryLight'),
  v(1, 2, -1, 'primary'),
  v(2, 2, -1, 'primary'),
  v(-2, 0, 0, 'primaryDark'),
  v(2, 0, 0, 'primaryDark'),
  v(-2, 1, 0, 'primary'),
  v(2, 1, 0, 'primary'),
  v(-2, 2, 0, 'primary'),
  v(2, 2, 0, 'primary'),
] as const

const clasp = [
  v(0, 1, -2, 'border'),
  v(-1, 1, -2, 'borderDim'),
  v(1, 1, -2, 'borderDim'),
] as const

const handle = [
  v(-1, 3, -1, 'border'),
  v(0, 3, -1, 'border'),
  v(1, 3, -1, 'border'),
  v(-1, 4, -1, 'borderDim'),
  v(1, 4, -1, 'borderDim'),
] as const

export const EXPERIENCE_VOXEL_MODEL: VoxelModel = {
  id: 'experience',
  voxels: [...body, ...clasp, ...handle],
}
