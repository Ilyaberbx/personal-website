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

const baseSteps: Voxel[] = [
  ...box(-4, 3, 0, 0, -3, 3, 'primaryDark'),
  ...box(-3, 2, 1, 1, -2, 2, 'primaryDark'),
  ...box(-2, 1, 2, 2, -1, 1, 'primaryDark'),
]

const stem: Voxel[] = [
  ...box(-1, 0, 3, 6, 0, 0, 'border'),
  v(-1, 4, 0, 'flowerYellow'),
  v(0, 5, 0, 'flowerYellow'),
]

const cupBottom: Voxel[] = [
  ...box(-3, 2, 7, 7, -2, 1, 'flowerYellow'),
  ...box(-3, 2, 7, 7, -3, -3, 'primaryDark'),
  ...box(-3, 2, 7, 7, 2, 2, 'primaryDark'),
  ...box(-4, -4, 7, 7, -2, 1, 'primaryDark'),
  ...box(3, 3, 7, 7, -2, 1, 'primaryDark'),
]

const cupBowl: Voxel[] = [
  ...box(-4, 3, 8, 10, -3, 2, 'flowerYellow'),
  ...box(-4, 3, 11, 11, -3, 2, 'flowerYellow'),
  v(-4, 11, -3, 'primaryDark'),
  v(-4, 11, 2, 'primaryDark'),
  v(3, 11, -3, 'primaryDark'),
  v(3, 11, 2, 'primaryDark'),
]

const cupHighlights: Voxel[] = [
  v(-3, 9, -3, 'border'),
  v(-2, 10, -3, 'border'),
  v(-3, 10, -3, 'border'),
  v(-1, 8, -3, 'primaryDark'),
]

const handles: Voxel[] = [
  ...box(-6, -5, 8, 10, -1, 0, 'flowerYellow'),
  ...box(4, 5, 8, 10, -1, 0, 'flowerYellow'),
  v(-5, 8, -1, 'primaryDark'),
  v(4, 8, -1, 'primaryDark'),
  v(-5, 10, 0, 'border'),
  v(4, 10, 0, 'border'),
]

const star: Voxel[] = [
  v(-1, 9, -4, 'flowerYellow'),
  v(0, 9, -4, 'flowerYellow'),
  v(-1, 10, -4, 'flowerYellow'),
  v(0, 10, -4, 'flowerYellow'),
  v(-1, 8, -3, 'flowerYellow'),
  v(0, 11, -3, 'flowerYellow'),
]

export const TROPHIES_VOXEL_MODEL: VoxelModel = {
  id: 'trophies',
  voxels: [...baseSteps, ...stem, ...cupBottom, ...cupBowl, ...cupHighlights, ...handles, ...star],
}
