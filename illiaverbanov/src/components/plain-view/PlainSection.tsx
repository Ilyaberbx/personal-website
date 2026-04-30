import type { ReactNode } from 'react'
import styles from './plain-view.module.css'

type Props = {
  id: string
  title: string
  children: ReactNode
}

export function PlainSection({ id, title, children }: Props) {
  const headingId = `${id}-heading`
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}
