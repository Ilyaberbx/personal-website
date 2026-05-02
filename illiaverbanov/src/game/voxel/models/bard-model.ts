import type { VoxelModel } from '../voxel.types'

const v = (x: number, y: number, z: number, color: VoxelModel['voxels'][number]['color']) => ({
  x,
  y,
  z,
  color,
})

const boots = [
  v(-1, 0, 0, 'ink'),
  v(1, 0, 0, 'ink'),
] as const

const legs = [
  v(-1, 1, 0, 'primaryDark'),
  v(1, 1, 0, 'primaryDark'),
  v(-1, 2, 0, 'primaryDark'),
  v(1, 2, 0, 'primaryDark'),
] as const

const torso = [
  v(-1, 3, 0, 'secondary'),
  v(0, 3, 0, 'secondary'),
  v(1, 3, 0, 'secondary'),
  v(-1, 4, 0, 'primary'),
  v(0, 4, 0, 'primary'),
  v(1, 4, 0, 'primary'),
  v(0, 5, 0, 'primaryLight'),
] as const

const head = [
  v(0, 6, 0, 'border'),
  v(-1, 6, 0, 'border'),
  v(1, 6, 0, 'border'),
  v(0, 7, 0, 'flowerYellow'),
  v(-1, 7, 0, 'secondary'),
  v(1, 7, 0, 'secondary'),
  v(0, 8, 0, 'secondary'),
] as const

const lute = [
  v(2, 3, 0, 'treeBark'),
  v(2, 4, 0, 'treeBark'),
  v(3, 3, 0, 'flowerYellow'),
  v(3, 4, 0, 'flowerYellow'),
  v(2, 5, 0, 'treeBark'),
] as const

export const BARD_VOXEL_MODEL: VoxelModel = {
  id: 'bard',
  voxels: [...boots, ...legs, ...torso, ...head, ...lute],
}
