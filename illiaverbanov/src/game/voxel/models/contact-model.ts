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

const envelopeFront: Voxel[] = [
  ...box(-5, 5, 0, 0, 0, 0, 'primaryDark'),
  ...box(-5, 5, 1, 6, 0, 0, 'primary'),
  ...box(-5, 5, 7, 7, 0, 0, 'primaryDark'),
  ...box(-5, -5, 1, 6, 0, 0, 'primaryDark'),
  ...box(5, 5, 1, 6, 0, 0, 'primaryDark'),
]

const envelopeBack: Voxel[] = [
  ...box(-5, 5, 0, 7, 1, 1, 'primaryDark'),
]

const addressLines: Voxel[] = [
  ...box(-2, 2, 3, 3, -1, -1, 'primaryDark'),
  ...box(-2, 2, 5, 5, -1, -1, 'primaryDark'),
]

const flap: Voxel[] = [
  ...box(-5, 5, 7, 7, -1, -1, 'primaryLight'),
  ...box(-4, 4, 6, 6, -1, -1, 'primaryLight'),
  ...box(-3, 3, 5, 5, -1, -1, 'primaryLight'),
  ...box(-2, 2, 4, 4, -1, -1, 'primaryLight'),
  ...box(-1, 1, 3, 3, -1, -1, 'primaryLight'),
  v(0, 2, -1, 'primaryLight'),
]

const flapEdge: Voxel[] = [
  v(-5, 7, -1, 'primaryDark'),
  v(5, 7, -1, 'primaryDark'),
  v(-4, 6, -1, 'primaryDark'),
  v(4, 6, -1, 'primaryDark'),
  v(-3, 5, -1, 'primaryDark'),
  v(3, 5, -1, 'primaryDark'),
  v(-2, 4, -1, 'primaryDark'),
  v(2, 4, -1, 'primaryDark'),
  v(-1, 3, -1, 'primaryDark'),
  v(1, 3, -1, 'primaryDark'),
]

const seal: Voxel[] = [
  ...box(-1, 1, 2, 4, -2, -2, 'flowerPink'),
  v(0, 3, -3, 'flowerPink'),
  v(-1, 2, -2, 'primaryDark'),
  v(1, 2, -2, 'primaryDark'),
  v(-1, 4, -2, 'primaryDark'),
  v(1, 4, -2, 'primaryDark'),
]

export const CONTACT_VOXEL_MODEL: VoxelModel = {
  id: 'contact',
  voxels: [...envelopeFront, ...envelopeBack, ...addressLines, ...flap, ...flapEdge, ...seal],
}
