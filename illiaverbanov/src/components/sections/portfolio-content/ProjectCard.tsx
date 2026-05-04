import type { Project } from '../../../data/types'
import styles from './portfolio-content.module.css'

type Props = { project: Project }

export function ProjectCard({ project }: Props) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <h4 className={styles.name}>{project.name}</h4>
        <p className={styles.tagline}>{project.tagline}</p>
      </header>

      <div className={styles.meta}>
        <span><span className={styles.metaLabel}>Role:</span>{project.role}</span>
      </div>

      <p className={styles.pitch}>{project.pitch}</p>

      <p className={styles.contributionsTitle}>What I shipped</p>
      <ul className={styles.contributions}>
        {project.contributions.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <div className={styles.stack}>
        {project.stack.map((t) => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>

      {project.link && (
        <a
          className={styles.link}
          href={project.link.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {project.link.label}
        </a>
      )}
    </article>
  )
}
