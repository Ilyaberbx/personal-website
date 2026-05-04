import { PAL, SHADE, type PaletteKey } from '../palette'
import type { VoxelModel } from './voxel.types'

const VOXEL_PIXEL_SIZE = 1
const SPRITE_SIZE = 16

const cache = new Map<string, HTMLCanvasElement>()

function paletteColor(key: PaletteKey): string {
  if (key in PAL) return PAL[key as keyof typeof PAL]
  return SHADE[key as keyof typeof SHADE]
}

function projectIso(x: number, y: number, z: number): { px: number; py: number; depth: number } {
  const px = Math.round((x - z) * VOXEL_PIXEL_SIZE)
  const py = Math.round((-y + (x + z) / 2) * VOXEL_PIXEL_SIZE)
  const depth = x + z - y * 2
  return { px, py, depth }
}

function paintVoxelTopper(model: VoxelModel): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = SPRITE_SIZE
  canvas.height = SPRITE_SIZE
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas
  ctx.imageSmoothingEnabled = false

  const projected = model.voxels.map((voxel) => ({
    voxel,
    ...projectIso(voxel.x, voxel.y, voxel.z),
  }))
  const sorted = [...projected].sort((a, b) => a.depth - b.depth)

  const centerX = Math.floor(SPRITE_SIZE / 2)
  const baseY = SPRITE_SIZE - 2
  for (const p of sorted) {
    ctx.fillStyle = paletteColor(p.voxel.color)
    ctx.fillRect(centerX + p.px, baseY + p.py, VOXEL_PIXEL_SIZE, VOXEL_PIXEL_SIZE)
  }
  return canvas
}

export function getVoxelTopperSprite(model: VoxelModel): HTMLCanvasElement {
  const cached = cache.get(model.id)
  if (cached) return cached
  const sprite = paintVoxelTopper(model)
  cache.set(model.id, sprite)
  return sprite
}
