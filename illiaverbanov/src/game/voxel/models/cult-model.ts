import type { VoxelModel, Voxel } from '../voxel.types'

type Color = Voxel['color']

const v = (x: number, y: number, z: number, color: Color): Voxel => ({ x, y, z, color })

const box = (
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  z0: number,
  z1: number,
  color: Color,
): Voxel[] => {
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

// Hooded robed figure: wide robe base flares to a peaked hood; pentacle glint on the chest.
const robeBase: Voxel[] = [
  ...box(-3, 2, 0, 1, -2, 1, 'bgDark'),
  ...box(-2, 1, 0, 1, -3, 2, 'bgDark'),
]

const robeBody: Voxel[] = [
  ...box(-2, 1, 2, 4, -1, 0, 'primaryDark'),
  ...box(-2, 1, 2, 3, -2, -2, 'bgDark'),
  ...box(-2, 1, 2, 3, 1, 1, 'bgDark'),
]

// Pentacle mark — a single bright voxel front-and-center.
const pentacle: Voxel[] = [v(-1, 3, -2, 'flowerYellow'), v(0, 3, -2, 'flowerYellow')]

const shoulders: Voxel[] = [
  v(-2, 4, -1, 'primaryDark'),
  v(1, 4, -1, 'primaryDark'),
  v(-2, 4, 0, 'primaryDark'),
  v(1, 4, 0, 'primaryDark'),
]

const hood: Voxel[] = [
  ...box(-1, 0, 5, 5, -1, 0, 'bgDark'),
  ...box(-1, 0, 6, 6, -1, 0, 'primaryDark'),
  v(0, 6, -1, 'ink'),
  v(-1, 6, -1, 'ink'),
]

const peak: Voxel[] = [v(0, 7, 0, 'bgDark'), v(-1, 7, 0, 'bgDark')]

export const CULT_VOXEL_MODEL: VoxelModel = {
  id: 'cult',
  voxels: [...robeBase, ...robeBody, ...pentacle, ...shoulders, ...hood, ...peak],
}
