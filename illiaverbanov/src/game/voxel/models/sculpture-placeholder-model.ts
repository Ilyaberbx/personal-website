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

const base: Voxel[] = box(-2, 2, 0, 0, -2, 2, 'primaryDark')
const stem: Voxel[] = box(-1, 1, 1, 3, -1, 1, 'primary')
const cap: Voxel[] = box(-2, 2, 4, 4, -2, 2, 'secondary')
const crown: Voxel[] = [
  v(0, 5, 0, 'flowerYellow'),
  v(-1, 5, 0, 'border'),
  v(1, 5, 0, 'border'),
  v(0, 5, -1, 'border'),
  v(0, 5, 1, 'border'),
  v(0, 6, 0, 'flowerYellow'),
]

export const SCULPTURE_PLACEHOLDER_VOXEL_MODEL: VoxelModel = {
  id: 'sculpture-placeholder',
  voxels: [...base, ...stem, ...cap, ...crown],
}
