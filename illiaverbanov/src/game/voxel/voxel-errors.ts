export class VoxelHeroInitError extends Error {
  readonly kind = 'voxel-hero-init' as const

  constructor(message: string) {
    super(message)
    this.name = 'VoxelHeroInitError'
  }
}
