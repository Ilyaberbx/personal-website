import { UI_COPY } from '../../data'
import styles from './dialog-box.module.css'

type Props = {
  label: string
  hint: string
  variant?: 'station' | 'npc'
}

export function DialogBox({ label, hint, variant = 'station' }: Props) {
  const isNpc = variant === 'npc'
  const titleClassName = isNpc ? `${styles.title} ${styles.titleNpc}` : styles.title

  return (
    <div className={styles.dialog}>
      <div className={titleClassName}>{label}</div>
      <div className={styles.hint}>
        <span className={styles.key}>{UI_COPY.dialog.interactKey}</span>
        <span>{hint}</span>
      </div>
    </div>
  )
}
