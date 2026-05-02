import type { ReactNode } from 'react'
import type { StationId } from '../../data/types'
import { getVoxelModelForFocus } from '../../game/voxel/voxel-registry'
import { PixelWindow } from '../shared/PixelWindow'
import { VoxelHero } from '../shared/voxel-hero/VoxelHero'
import styles from './station-modal.module.css'

type Props = {
  title: string
  stationId: StationId
  onClose: () => void
  children: ReactNode
}

const MODAL_WIDTH = 720

export function StationModal({ title, stationId, onClose, children }: Props) {
  const voxelModel = getVoxelModelForFocus({ kind: 'station', id: stationId })

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.stop} onClick={(e) => e.stopPropagation()}>
        <PixelWindow title={title} onClose={onClose} width={MODAL_WIDTH}>
          <div className={styles.body}>
            {voxelModel && <VoxelHero model={voxelModel} />}
            {children}
          </div>
        </PixelWindow>
      </div>
    </div>
  )
}
