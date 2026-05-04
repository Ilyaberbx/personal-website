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

// Candlestick chart: alternating tall green / short red bars on a dark base, with wicks.
// "primaryLight" plays the bullish role, "primaryDark" the bearish — palette is locked.
const platform: Voxel[] = box(-3, 2, 0, 0, -1, 1, 'border')

const bullCandleTall: Voxel[] = [
  ...box(-3, -2, 1, 5, 0, 0, 'primaryLight'),
  v(-2, 6, 0, 'border'),
  v(-2, 7, 0, 'border'),
  v(-3, 0, 0, 'primaryLight'),
]

const bearCandleShort: Voxel[] = [
  ...box(-1, 0, 1, 3, 0, 0, 'primaryDark'),
  v(0, 4, 0, 'border'),
  v(0, 0, 0, 'primaryDark'),
]

const bullCandleMid: Voxel[] = [
  ...box(1, 2, 1, 4, 0, 0, 'primaryLight'),
  v(2, 5, 0, 'border'),
  v(2, 6, 0, 'border'),
]

// Side bars give the obelisk silhouette some 3D from any rotation.
const sideBackBear: Voxel[] = [
  ...box(-2, -1, 1, 2, -1, -1, 'primaryDark'),
  v(-1, 3, -1, 'border'),
]

const sideFrontBull: Voxel[] = [
  ...box(0, 1, 1, 4, 1, 1, 'primaryLight'),
  v(1, 5, 1, 'border'),
]

export const MIRACLE_VOXEL_MODEL: VoxelModel = {
  id: 'miracle',
  voxels: [
    ...platform,
    ...bullCandleTall,
    ...bearCandleShort,
    ...bullCandleMid,
    ...sideBackBear,
    ...sideFrontBull,
  ],
}
