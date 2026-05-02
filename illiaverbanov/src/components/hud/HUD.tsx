import { ViewToggle } from '../shared/ViewToggle'
import { useHud } from './use-hud'
import styles from './hud.module.css'

type Props = {
  onSwitchView: () => void
}

export function HUD({ onSwitchView }: Props) {
  const { name, title } = useHud()

  return (
    <div className={styles.hud}>
      <div className={styles.left}>
        <div className={`${styles.row}`}>
          <span className={styles.label}>Adventurer</span>
          <span className={`${styles.value} ${styles.valueName}`}>{name}</span>
        </div>
        <div className={`${styles.row} ${styles.rowClass}`}>
          <span className={styles.label}>Class</span>
          <span className={`${styles.value} ${styles.valueClass}`}>{title}</span>
        </div>
      </div>
      <div className={styles.toggle}>
        <ViewToggle target="plain" onClick={onSwitchView} />
      </div>
    </div>
  )
}
