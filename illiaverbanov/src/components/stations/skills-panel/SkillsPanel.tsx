import { skillGroups } from '../../../data'
import { SKILLS_INTRO, SKILL_PIP_MAX } from './skills-panel.constants'
import styles from './skills-panel.module.css'

const PIP_INDICES = Array.from({ length: SKILL_PIP_MAX }, (_, i) => i)

export function SkillsPanel() {
  return (
    <div>
      <p>{SKILLS_INTRO}</p>
      {skillGroups.map((g) => (
        <section key={g.category} className={styles.group}>
          <h4>{g.category}</h4>
          <div className={styles.list}>
            {g.items.map((s) => (
              <div key={s.name} className={styles.skill}>
                <span className={styles.name}>{s.name}</span>
                <span className={styles.bar} aria-label={`${s.level} of ${SKILL_PIP_MAX}`}>
                  {PIP_INDICES.map((i) => {
                    const isOn = i < s.level
                    const className = isOn ? `${styles.pip} ${styles.pipOn}` : styles.pip
                    return <span key={i} className={className} />
                  })}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
