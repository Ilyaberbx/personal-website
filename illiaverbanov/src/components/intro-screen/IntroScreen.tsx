import { profile, UI_COPY } from '../../data'
import { Avatar } from '../shared/Avatar'
import { ControlsLegend } from './ControlsLegend'
import { useIntroScreen } from './use-intro-screen'
import type { IntroTarget } from './use-intro-screen'
import styles from './intro-screen.module.css'

type Props = {
  onEnter: (target: IntroTarget) => void
}

export function IntroScreen({ onEnter }: Props) {
  useIntroScreen(onEnter)

  return (
    <div className={styles.intro} role="presentation">
      <div className={styles.inner}>
        <div>
          <h1 className={styles.title}>{profile.name.toUpperCase()}</h1>
          <div className={styles.sub}>{profile.title}</div>
        </div>

        <div className={styles.avatar} aria-hidden="true">
          <Avatar />
        </div>

        <div className={styles.ctaRow}>
          <button
            type="button"
            className={`${styles.cta} ${styles.ctaPrimary}`}
            onClick={() => onEnter('game')}
          >
            <span>{UI_COPY.intro.cta}</span>
            <span className={styles.ctaBlink} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.cta} ${styles.ctaSecondary}`}
            onClick={() => onEnter('plain')}
          >
            <span>{UI_COPY.intro.ctaPlain}</span>
          </button>
        </div>

        <div className={styles.keyHint}>{UI_COPY.intro.keyHint}</div>

        <div className={styles.controls}>
          <ControlsLegend items={UI_COPY.controls.legend} />
        </div>

        <div className={styles.location}>
          {profile.location} · {UI_COPY.intro.eraSuffix}
        </div>
      </div>
    </div>
  )
}
