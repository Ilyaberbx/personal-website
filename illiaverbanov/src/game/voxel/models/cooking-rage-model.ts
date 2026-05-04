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

// Burger stack: bottom bun, patty, lettuce frill, top bun with sesame.
// Palette is locked, so toasted-bun colour borrows flowerYellow; patty borrows treeBark.
const bottomBun: Voxel[] = [
  ...box(-3, 2, 0, 0, -3, 2, 'flowerYellow'),
  ...box(-3, 2, 1, 1, -3, 2, 'flowerYellow'),
]

const patty: Voxel[] = [
  ...box(-3, 2, 2, 2, -3, 2, 'treeBark'),
  v(-3, 2, -3, 'ink'),
  v(2, 2, 2, 'ink'),
]

const lettuce: Voxel[] = [
  ...box(-3, 2, 3, 3, -3, 2, 'primaryLight'),
  v(-3, 3, -3, 'border'),
  v(-2, 3, -3, 'border'),
  v(0, 3, -3, 'border'),
  v(2, 3, -3, 'border'),
  v(-3, 3, 2, 'border'),
  v(0, 3, 2, 'border'),
  v(2, 3, 2, 'border'),
]

const cheese: Voxel[] = [
  v(-3, 3, -2, 'flowerYellow'),
  v(-1, 3, -3, 'flowerYellow'),
  v(1, 3, -3, 'flowerYellow'),
  v(2, 3, -1, 'flowerYellow'),
]

const topBun: Voxel[] = [
  ...box(-3, 2, 4, 4, -3, 2, 'flowerYellow'),
  ...box(-2, 1, 5, 5, -2, 1, 'flowerYellow'),
  ...box(-1, 0, 6, 6, -1, 0, 'flowerYellow'),
]

const sesame: Voxel[] = [
  v(-2, 5, -2, 'border'),
  v(1, 5, 1, 'border'),
  v(-1, 6, 0, 'border'),
  v(0, 5, -2, 'border'),
]

export const COOKING_RAGE_VOXEL_MODEL: VoxelModel = {
  id: 'cooking-rage',
  voxels: [...bottomBun, ...patty, ...lettuce, ...cheese, ...topBun, ...sesame],
}
