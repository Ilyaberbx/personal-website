import { profile, UI_COPY } from '../../data'
import { Avatar } from './Avatar'
import { ControlsLegend } from './ControlsLegend'
import { useIntroScreen } from './use-intro-screen'
import styles from './intro-screen.module.css'

type Props = {
  onStart: () => void
}

export function IntroScreen({ onStart }: Props) {
  useIntroScreen(onStart)

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

        <div className={styles.cta}>
          <span>{UI_COPY.intro.cta}</span>
          <span className={styles.ctaBlink} />
        </div>

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
