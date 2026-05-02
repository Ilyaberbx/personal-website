import type { VoxelModel } from '../../../game/voxel/voxel.types'
import { useVoxelHero } from './use-voxel-hero'
import styles from './voxel-hero.module.css'

type Props = {
  model: VoxelModel
}

export function VoxelHero({ model }: Props) {
  const { canvasRef, failed } = useVoxelHero(model)

  if (failed) return null

  return (
    <div className={styles.root} aria-hidden>
      <canvas ref={canvasRef} className={styles.canvas} width={160} height={160} />
    </div>
  )
}
