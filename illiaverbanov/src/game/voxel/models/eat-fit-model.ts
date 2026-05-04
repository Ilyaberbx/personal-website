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

// Oversized fork standing handle-down on a small dais. Four tines + crossbar + handle
// gives a clean upright silhouette readable at the in-world camera distance.
const dais: Voxel[] = [
  ...box(-2, 1, 0, 0, -2, 1, 'primaryDark'),
  ...box(-1, 0, 1, 1, -1, 0, 'primaryDark'),
]

const handle: Voxel[] = [
  ...box(-1, 0, 1, 3, 0, 0, 'border'),
  ...box(-1, 0, 1, 3, -1, -1, 'borderDim'),
  v(0, 2, 0, 'borderDim'),
]

const grip: Voxel[] = [
  v(-1, 2, -1, 'flowerYellow'),
  v(0, 2, -1, 'flowerYellow'),
]

const neck: Voxel[] = [
  v(-1, 4, 0, 'border'),
  v(0, 4, 0, 'border'),
  v(-1, 4, -1, 'border'),
  v(0, 4, -1, 'border'),
]

// Crossbar of the fork, flush across all four tine roots.
const crossbar: Voxel[] = [
  ...box(-2, 1, 5, 5, -1, 0, 'border'),
]

const tines: Voxel[] = [
  ...box(-2, -2, 6, 7, -1, -1, 'border'),
  ...box(-1, -1, 6, 7, -1, -1, 'border'),
  ...box(0, 0, 6, 7, -1, -1, 'border'),
  ...box(1, 1, 6, 7, -1, -1, 'border'),
  v(-2, 7, 0, 'borderDim'),
  v(1, 7, 0, 'borderDim'),
]

export const EAT_FIT_VOXEL_MODEL: VoxelModel = {
  id: 'eat-fit',
  voxels: [...dais, ...handle, ...grip, ...neck, ...crossbar, ...tines],
}
