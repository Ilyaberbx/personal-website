import { trophies } from '../../../data'
import { PixelArt } from '../../shared/PixelArt'
import { CUP_COLORS, CUP_GRID, CUP_PX, TROPHIES_INTRO } from '../../stations/trophies-panel/trophies-panel.constants'
import styles from '../../stations/trophies-panel/trophies-panel.module.css'

export function TrophiesContent() {
  return (
    <div>
      <p>{TROPHIES_INTRO}</p>
      <div className={styles.grid}>
        {trophies.map((t) => (
          <article key={t.title} className={styles.trophy}>
            <div className={styles.icon} aria-hidden>
              <PixelArt grid={CUP_GRID} colors={CUP_COLORS} px={CUP_PX} />
            </div>
            <div className={styles.metric}>{t.metric}</div>
            <div className={styles.title}>{t.title}</div>
            <div className={styles.context}>{t.context}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
