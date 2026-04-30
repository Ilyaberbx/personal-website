import { useHud } from './use-hud'
import styles from './hud.module.css'

export function HUD() {
  const { name, title, level, levelPercent } = useHud()

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
      <div className={styles.lvl}>
        <span className={styles.label}>LVL</span>
        <div className={styles.lvlRow}>
          <span className={`${styles.value} ${styles.valueLvl}`}>{level}</span>
          <div className={styles.bar} aria-hidden>
            <div className={styles.barFill} style={{ width: `${levelPercent}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
