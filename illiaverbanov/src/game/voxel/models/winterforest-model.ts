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

// Snowy pine tree: snow drift base, dark trunk, three tiers of foliage stepping inward,
// dusted with bright snow caps. "border" is the snow colour from the locked palette.
const snowDrift: Voxel[] = [
  ...box(-3, 2, 0, 0, -3, 2, 'border'),
  ...box(-2, 1, 1, 1, -2, 1, 'border'),
]

const trunk: Voxel[] = [
  v(-1, 1, -1, 'treeBark'),
  v(0, 1, -1, 'treeBark'),
  v(-1, 1, 0, 'treeBark'),
  v(0, 1, 0, 'treeBark'),
]

const lowerBoughs: Voxel[] = [
  ...box(-3, 2, 2, 2, -3, 2, 'treeLeaf'),
  v(-3, 2, -3, 'border'),
  v(2, 2, 2, 'border'),
  v(-3, 2, 2, 'border'),
  v(2, 2, -3, 'border'),
]

const midBoughs: Voxel[] = [
  ...box(-2, 1, 3, 3, -2, 1, 'treeLeaf'),
  v(-2, 3, -2, 'border'),
  v(1, 3, 1, 'border'),
]

const upperBoughs: Voxel[] = [
  ...box(-1, 0, 4, 4, -1, 0, 'treeLeafLight'),
  ...box(-1, 0, 5, 5, -1, 0, 'treeLeaf'),
  v(-1, 4, -1, 'border'),
  v(0, 5, 0, 'border'),
]

const tip: Voxel[] = [v(-1, 6, 0, 'treeLeafLight'), v(0, 7, 0, 'border')]

export const WINTERFOREST_VOXEL_MODEL: VoxelModel = {
  id: 'beware-of-winterforest',
  voxels: [...snowDrift, ...trunk, ...lowerBoughs, ...midBoughs, ...upperBoughs, ...tip],
}
