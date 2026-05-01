import { experiences } from '../../../data'
import { useExperiencePanel } from '../../stations/experience-panel/use-experience-panel'
import styles from '../../stations/experience-panel/experience-panel.module.css'

const EXPERIENCE_INTRO = 'Quest log of completed and ongoing campaigns. Click any to expand.'

export function ExperienceContent() {
  const { openIndex, toggle } = useExperiencePanel()

  return (
    <div>
      <p>{EXPERIENCE_INTRO}</p>
      <div className={styles.list}>
        {experiences.map((q, i) => {
          const isOpen = openIndex === i
          const questClassName = isOpen ? `${styles.quest} ${styles.questOpen}` : styles.quest
          return (
            <div key={q.company} className={questClassName}>
              <button type="button" className={styles.header} onClick={() => toggle(i)}>
                <span className={styles.chev}>{isOpen ? '▼' : '▶'}</span>
                <span className={styles.role}>{q.role}</span>
                <span className={styles.co}>@ {q.company}</span>
                <span className={styles.period}>{q.period}</span>
              </button>
              {isOpen && (
                <div className={styles.body}>
                  <p className={styles.summary}>{q.summary}</p>
                  <ul>
                    {q.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <div className={styles.stack}>
                    {q.stack.map((t) => (
                      <span key={t} className={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
