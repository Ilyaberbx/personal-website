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

const body: Voxel[] = [
  ...box(-5, 5, 0, 0, -2, 2, 'primaryDark'),
  ...box(-5, 5, 1, 6, -2, 2, 'primary'),
  ...box(-5, 5, 7, 7, -2, 2, 'primaryDark'),
]

const stitchedEdge: Voxel[] = [
  ...box(-5, 5, 1, 1, -2, -2, 'primaryLight'),
  ...box(-5, 5, 6, 6, -2, -2, 'primaryLight'),
  ...box(-5, -5, 2, 5, -2, -2, 'primaryLight'),
  ...box(5, 5, 2, 5, -2, -2, 'primaryLight'),
]

const claspPanel: Voxel[] = [
  ...box(-2, 2, 2, 4, -3, -3, 'borderDim'),
  ...box(-1, 1, 3, 3, -4, -4, 'border'),
  v(0, 3, -5, 'border'),
]

const rivets: Voxel[] = [
  v(-4, 2, -3, 'primaryDark'),
  v(4, 2, -3, 'primaryDark'),
  v(-4, 5, -3, 'primaryDark'),
  v(4, 5, -3, 'primaryDark'),
]

const handlePosts: Voxel[] = [
  ...box(-3, -2, 8, 8, -1, 1, 'borderDim'),
  ...box(2, 3, 8, 8, -1, 1, 'borderDim'),
]

const handleArc: Voxel[] = [
  ...box(-3, -3, 9, 10, -1, 1, 'border'),
  ...box(3, 3, 9, 10, -1, 1, 'border'),
  ...box(-2, 2, 11, 11, -1, 1, 'border'),
  v(-3, 11, 0, 'borderDim'),
  v(3, 11, 0, 'borderDim'),
]

export const EXPERIENCE_VOXEL_MODEL: VoxelModel = {
  id: 'experience',
  voxels: [...body, ...stitchedEdge, ...claspPanel, ...rivets, ...handlePosts, ...handleArc],
}
