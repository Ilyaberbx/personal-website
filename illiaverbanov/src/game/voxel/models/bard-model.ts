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

const boots: Voxel[] = [
  ...box(-2, -1, 0, 1, -1, 1, 'ink'),
  ...box(1, 2, 0, 1, -1, 1, 'ink'),
  v(-2, 1, -1, 'border'),
  v(2, 1, -1, 'border'),
]

const legs: Voxel[] = [
  ...box(-2, -1, 2, 4, 0, 1, 'primaryDark'),
  ...box(1, 2, 2, 4, 0, 1, 'primaryDark'),
  v(-2, 3, 0, 'ink'),
  v(2, 3, 0, 'ink'),
]

const belt: Voxel[] = [
  ...box(-2, 2, 5, 5, 0, 1, 'border'),
  v(0, 5, -1, 'flowerYellow'),
]

const torso: Voxel[] = [
  ...box(-2, 2, 6, 9, 0, 1, 'secondary'),
  ...box(-2, 2, 6, 9, -1, -1, 'primary'),
  v(-1, 7, -1, 'primaryLight'),
  v(1, 8, -1, 'primaryLight'),
  v(0, 7, 0, 'primaryLight'),
  v(0, 8, 0, 'primaryLight'),
]

const arms: Voxel[] = [
  ...box(-3, -3, 6, 8, 0, 0, 'secondary'),
  ...box(3, 3, 6, 8, 0, 0, 'secondary'),
  v(-3, 5, 0, 'primaryLight'),
  v(3, 5, 0, 'primaryLight'),
]

const neck: Voxel[] = [v(0, 10, 0, 'primaryLight'), v(0, 10, -1, 'primaryLight')]

const head: Voxel[] = [
  ...box(-1, 1, 11, 13, -1, 1, 'border'),
  v(-1, 12, -1, 'ink'),
  v(1, 12, -1, 'ink'),
  v(0, 11, -1, 'flowerYellow'),
]

const hatBrim: Voxel[] = [
  ...box(-2, 2, 14, 14, -1, 1, 'primary'),
]

const hatCrown: Voxel[] = [
  ...box(-1, 1, 15, 15, -1, 1, 'primary'),
  ...box(-1, 1, 16, 16, 0, 0, 'primary'),
  v(0, 17, 0, 'flowerYellow'),
]

const luteBody: Voxel[] = [
  ...box(4, 5, 5, 8, 0, 1, 'treeBark'),
  v(4, 6, -1, 'flowerYellow'),
  v(4, 7, -1, 'flowerYellow'),
  v(5, 6, -1, 'treeBark'),
  v(5, 7, -1, 'treeBark'),
  v(4, 5, -1, 'treeBark'),
  v(4, 8, -1, 'treeBark'),
]

const luteNeck: Voxel[] = [
  v(4, 9, 0, 'treeBark'),
  v(4, 10, 0, 'treeBark'),
  v(4, 11, 0, 'treeBark'),
  v(4, 12, 0, 'treeBark'),
  v(4, 13, 0, 'border'),
]

const luteStrings: Voxel[] = [
  v(4, 6, -2, 'border'),
  v(4, 7, -2, 'border'),
  v(4, 8, -2, 'border'),
]

export const BARD_VOXEL_MODEL: VoxelModel = {
  id: 'bard',
  voxels: [
    ...boots,
    ...legs,
    ...belt,
    ...torso,
    ...arms,
    ...neck,
    ...head,
    ...hatBrim,
    ...hatCrown,
    ...luteBody,
    ...luteNeck,
    ...luteStrings,
  ],
}
