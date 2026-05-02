import type { VoxelModel } from '../voxel.types'

const v = (x: number, y: number, z: number, color: VoxelModel['voxels'][number]['color']) => ({
  x,
  y,
  z,
  color,
})

const envelopeBack = [
  v(-2, 0, 0, 'primaryDark'),
  v(-1, 0, 0, 'primaryDark'),
  v(0, 0, 0, 'primaryDark'),
  v(1, 0, 0, 'primaryDark'),
  v(2, 0, 0, 'primaryDark'),
  v(-2, 1, 0, 'primary'),
  v(-1, 1, 0, 'primary'),
  v(0, 1, 0, 'primary'),
  v(1, 1, 0, 'primary'),
  v(2, 1, 0, 'primary'),
  v(-2, 2, 0, 'primary'),
  v(-1, 2, 0, 'primary'),
  v(0, 2, 0, 'primary'),
  v(1, 2, 0, 'primary'),
  v(2, 2, 0, 'primary'),
  v(-2, 3, 0, 'primary'),
  v(2, 3, 0, 'primary'),
] as const

const flap = [
  v(-2, 3, -1, 'primaryLight'),
  v(-1, 3, -1, 'primaryLight'),
  v(0, 3, -1, 'primaryLight'),
  v(1, 3, -1, 'primaryLight'),
  v(2, 3, -1, 'primaryLight'),
  v(-1, 2, -1, 'primaryLight'),
  v(1, 2, -1, 'primaryLight'),
  v(0, 1, -1, 'primaryLight'),
] as const

const seal = [
  v(0, 0, -1, 'flowerPink'),
  v(0, 1, -2, 'flowerPink'),
] as const

export const CONTACT_VOXEL_MODEL: VoxelModel = {
  id: 'contact',
  voxels: [...envelopeBack, ...flap, ...seal],
}
