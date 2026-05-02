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

const bottomCube: Voxel[] = [
  ...box(-5, -1, 0, 0, -2, 2, 'primaryDark'),
  ...box(-5, -1, 1, 3, -2, 2, 'primary'),
  ...box(-5, -1, 4, 4, -2, 2, 'primaryLight'),
  ...box(-5, -5, 1, 3, -2, 2, 'primaryDark'),
  ...box(-1, -1, 1, 3, -2, 2, 'primaryDark'),
  ...box(-5, -1, 1, 3, -2, -2, 'primaryDark'),
]

const middleCube: Voxel[] = [
  ...box(2, 5, 0, 0, 0, 4, 'secondaryDark'),
  ...box(2, 5, 1, 3, 0, 4, 'secondary'),
  ...box(2, 5, 4, 4, 0, 4, 'border'),
  ...box(2, 5, 1, 3, 4, 4, 'secondaryDark'),
  ...box(5, 5, 1, 3, 0, 4, 'secondaryDark'),
]

const topCube: Voxel[] = [
  ...box(-1, 1, 5, 5, -1, 1, 'border'),
  ...box(-1, 1, 6, 8, -1, 1, 'borderDim'),
  ...box(-1, 1, 9, 9, -1, 1, 'border'),
  ...box(-1, 1, 6, 8, -1, -1, 'border'),
]

const accents: Voxel[] = [
  v(-3, 5, 0, 'flowerYellow'),
  v(-2, 5, 1, 'flowerYellow'),
  v(4, 5, 2, 'flowerPink'),
  v(3, 5, 3, 'flowerPink'),
  v(0, 10, 0, 'flowerYellow'),
]

export const SKILLS_VOXEL_MODEL: VoxelModel = {
  id: 'skills',
  voxels: [...bottomCube, ...middleCube, ...topCube, ...accents],
}
