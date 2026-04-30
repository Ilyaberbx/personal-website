import type { ReactNode } from 'react'
import { PixelWindow } from '../shared/PixelWindow'
import styles from './station-modal.module.css'

type Props = {
  title: string
  onClose: () => void
  children: ReactNode
}

const MODAL_WIDTH = 720

export function StationModal({ title, onClose, children }: Props) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.stop} onClick={(e) => e.stopPropagation()}>
        <PixelWindow title={title} onClose={onClose} width={MODAL_WIDTH}>
          <div className={styles.body}>{children}</div>
        </PixelWindow>
      </div>
    </div>
  )
}
