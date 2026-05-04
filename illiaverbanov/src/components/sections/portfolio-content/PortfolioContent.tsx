import { ProjectCard } from './ProjectCard'
import { usePortfolioContent } from './use-portfolio-content'
import styles from './portfolio-content.module.css'

export function PortfolioContent() {
  const { intro, groups } = usePortfolioContent()

  return (
    <div>
      <p className={styles.intro}>{intro}</p>
      {groups.map((group) => (
        <section key={group.domain} className={styles.group} aria-label={group.label}>
          <h3 className={styles.groupLabel}>{group.label}</h3>
          <div className={styles.list}>
            {group.items.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
