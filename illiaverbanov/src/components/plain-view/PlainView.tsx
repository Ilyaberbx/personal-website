import { Avatar } from '../shared/Avatar'
import { ViewToggle } from '../shared/ViewToggle'
import { PlainSection } from './PlainSection'
import { usePlainView } from './use-plain-view'
import type { PlainViewProps } from './plain-view.types'
import styles from './plain-view.module.css'

export function PlainView({ onSwitchView }: PlainViewProps) {
  const { hero, sections } = usePlainView()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandName}>{hero.name}</span>
            <span className={styles.brandTitle}>{hero.title}</span>
          </div>
          <ViewToggle target="game" onClick={onSwitchView} />
        </div>
      </header>

      <section className={styles.hero} aria-label="Profile">
        <div className={styles.heroAvatar} aria-hidden="true">
          <Avatar px={5} />
        </div>
        <div className={styles.heroText}>
          <h1 className={styles.heroName}>{hero.name}</h1>
          <p className={styles.heroTitle}>{hero.title}</p>
          <p className={styles.heroLocation}>{hero.location}</p>
          <p className={styles.heroSummary}>{hero.summary}</p>
        </div>
      </section>

      <div className={styles.sections}>
        {sections.map(({ id, title, Panel }) => (
          <PlainSection key={id} id={id} title={title}>
            <Panel />
          </PlainSection>
        ))}
      </div>

      <footer className={styles.footer}>
        <span>{hero.name} · {hero.location}</span>
      </footer>
    </main>
  )
}
