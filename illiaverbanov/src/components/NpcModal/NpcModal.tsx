import { UI_COPY } from '../../data'
import { PixelWindow } from '../shared/PixelWindow'
import { BardPortrait } from './BardPortrait'
import { useNpcModal } from './use-npc-modal'
import { NPC_MODAL_WIDTH } from './npc-modal.constants'
import styles from './npc-modal.module.css'

type Props = { onClose: () => void }

export function NpcModal({ onClose }: Props) {
  const { step, lines, isLast, bardName, advance } = useNpcModal(onClose)
  const buttonLabel = isLast ? UI_COPY.npc.btnFarewell : UI_COPY.npc.btnNext

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.stop} onClick={(e) => e.stopPropagation()}>
        <PixelWindow title={bardName} onClose={onClose} width={NPC_MODAL_WIDTH}>
          <div className={styles.body}>
            <div className={styles.portrait} aria-hidden>
              <BardPortrait />
            </div>
            <div className={styles.text}>
              {lines.slice(0, step + 1).map((line, i) => {
                const isActive = i === step
                const className = isActive ? `${styles.line} ${styles.lineActive}` : styles.line
                return (
                  <p key={i} className={className}>
                    {line}
                  </p>
                )
              })}
              <button type="button" className={styles.next} onClick={advance}>
                {buttonLabel}
              </button>
            </div>
          </div>
        </PixelWindow>
      </div>
    </div>
  )
}
