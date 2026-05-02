import type { VoxelModel } from '../voxel.types'

const v = (x: number, y: number, z: number, color: VoxelModel['voxels'][number]['color']) => ({
  x,
  y,
  z,
  color,
})

const bottomCube = [
  v(-2, 0, -1, 'primaryDark'),
  v(-1, 0, -1, 'primaryDark'),
  v(-2, 0, 0, 'primaryDark'),
  v(-1, 0, 0, 'primaryDark'),
  v(-2, 1, -1, 'primary'),
  v(-1, 1, -1, 'primary'),
  v(-2, 1, 0, 'primary'),
  v(-1, 1, 0, 'primaryLight'),
] as const

const middleCube = [
  v(1, 0, 0, 'secondaryDark'),
  v(2, 0, 0, 'secondaryDark'),
  v(1, 0, 1, 'secondaryDark'),
  v(2, 0, 1, 'secondaryDark'),
  v(1, 1, 0, 'secondary'),
  v(2, 1, 0, 'secondary'),
  v(1, 1, 1, 'secondary'),
  v(2, 1, 1, 'secondary'),
] as const

const topCube = [
  v(0, 2, -1, 'border'),
  v(0, 2, 0, 'border'),
  v(0, 3, -1, 'borderDim'),
  v(0, 3, 0, 'border'),
] as const

const accent = [
  v(-1, 2, 0, 'flowerYellow'),
  v(2, 2, 1, 'flowerPink'),
] as const

export const SKILLS_VOXEL_MODEL: VoxelModel = {
  id: 'skills',
  voxels: [...bottomCube, ...middleCube, ...topCube, ...accent],
}
