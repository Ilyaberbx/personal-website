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

// Three stacked tranches: junior (widest, base), mezzanine (mid), senior (top, narrowest).
// Lighter shades climb upward to read as "higher seniority".
const junior: Voxel[] = [
  ...box(-3, 2, 0, 1, -3, 2, 'primaryDark'),
  ...box(-3, 2, 1, 1, -3, -3, 'border'),
]

const mezzanine: Voxel[] = [
  ...box(-2, 1, 2, 3, -2, 1, 'primary'),
  ...box(-2, 1, 3, 3, -2, -2, 'border'),
]

const senior: Voxel[] = [
  ...box(-1, 0, 4, 5, -1, 0, 'primaryLight'),
  v(-1, 5, -1, 'border'),
  v(0, 5, -1, 'border'),
]

const beacon: Voxel[] = [
  v(0, 6, 0, 'flowerYellow'),
  v(-1, 6, 0, 'border'),
  v(0, 6, -1, 'border'),
  v(0, 7, 0, 'flowerYellow'),
]

export const SYNTROPIA_VOXEL_MODEL: VoxelModel = {
  id: 'syntropia',
  voxels: [...junior, ...mezzanine, ...senior, ...beacon],
}
