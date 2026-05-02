import type { VoxelModel, Voxel } from '../voxel.types'

type Color = Voxel['color']

const v = (x: number, y: number, z: number, color: Color): Voxel => ({ x, y, z, color })

const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, color: Color): Voxel[] => {
  const out: Voxel[] = []
  for (let x = x0; x <= x1; x++) {
    for (let y = y0; y <= y1; y++) {
      for (let z = z0; z <= z1; z++) {
        out.push(v(x, y, z, color))
      }
    }
  }
  return out
}

const mound: Voxel[] = [
  ...box(-3, 3, 0, 0, -3, 3, 'primaryDark'),
  ...box(-2, 2, 1, 1, -2, 2, 'primaryDark'),
  ...box(-1, 1, 2, 2, -1, 1, 'primaryDark'),
]

const trunk: Voxel[] = [
  ...box(-1, 1, 3, 7, -1, 1, 'primary'),
  v(-1, 3, 0, 'primaryDark'),
  v(-1, 5, 0, 'primaryDark'),
  v(1, 4, 0, 'primaryDark'),
  v(1, 6, 0, 'primaryDark'),
  v(0, 4, -1, 'primaryDark'),
  v(0, 6, 1, 'primaryDark'),
  ...box(-1, 1, 8, 8, -1, 1, 'primaryLight'),
]

const branches: Voxel[] = [
  v(-2, 5, 0, 'primary'),
  v(-3, 6, 0, 'primaryLight'),
  v(2, 6, 0, 'primary'),
  v(3, 7, 0, 'primaryLight'),
  v(0, 6, -2, 'primary'),
  v(0, 7, -3, 'primaryLight'),
]

const crown: Voxel[] = [
  ...box(-2, 2, 9, 9, -2, 2, 'secondary'),
  ...box(-3, 3, 10, 10, -3, 3, 'secondary'),
  ...box(-3, 3, 11, 11, -3, 3, 'secondary'),
  ...box(-2, 2, 12, 12, -2, 2, 'secondary'),
  ...box(-1, 1, 13, 13, -1, 1, 'secondary'),
]

const crownAccents: Voxel[] = [
  v(-3, 10, 2, 'border'),
  v(3, 10, -2, 'border'),
  v(-2, 11, -3, 'border'),
  v(2, 12, 1, 'border'),
  v(0, 13, -1, 'border'),
  v(0, 14, 0, 'border'),
]

export const ABOUT_VOXEL_MODEL: VoxelModel = {
  id: 'about',
  voxels: [...mound, ...trunk, ...branches, ...crown, ...crownAccents],
}
