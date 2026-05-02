import type { VoxelModel } from '../voxel.types'

const v = (x: number, y: number, z: number, color: VoxelModel['voxels'][number]['color']) => ({
  x,
  y,
  z,
  color,
})

const base = [
  v(-2, 0, -1, 'primaryDark'),
  v(-1, 0, -1, 'primaryDark'),
  v(0, 0, -1, 'primaryDark'),
  v(1, 0, -1, 'primaryDark'),
  v(-2, 0, 0, 'primaryDark'),
  v(-1, 0, 0, 'primaryDark'),
  v(0, 0, 0, 'primaryDark'),
  v(1, 0, 0, 'primaryDark'),
  v(-1, 1, 0, 'primaryDark'),
  v(0, 1, 0, 'primaryDark'),
] as const

const stem = [
  v(-1, 2, 0, 'border'),
  v(0, 2, 0, 'border'),
  v(-1, 3, 0, 'border'),
  v(0, 3, 0, 'border'),
] as const

const cup = [
  v(-2, 4, -1, 'flowerYellow'),
  v(-1, 4, -1, 'flowerYellow'),
  v(0, 4, -1, 'flowerYellow'),
  v(1, 4, -1, 'flowerYellow'),
  v(-2, 4, 0, 'flowerYellow'),
  v(1, 4, 0, 'flowerYellow'),
  v(-2, 5, -1, 'flowerYellow'),
  v(-1, 5, -1, 'flowerYellow'),
  v(0, 5, -1, 'flowerYellow'),
  v(1, 5, -1, 'flowerYellow'),
  v(-2, 5, 0, 'flowerYellow'),
  v(1, 5, 0, 'flowerYellow'),
  v(-2, 6, -1, 'flowerYellow'),
  v(1, 6, -1, 'flowerYellow'),
  v(-2, 6, 0, 'flowerYellow'),
  v(1, 6, 0, 'flowerYellow'),
] as const

const handles = [
  v(-3, 5, -1, 'flowerYellow'),
  v(2, 5, -1, 'flowerYellow'),
] as const

export const TROPHIES_VOXEL_MODEL: VoxelModel = {
  id: 'trophies',
  voxels: [...base, ...stem, ...cup, ...handles],
}
