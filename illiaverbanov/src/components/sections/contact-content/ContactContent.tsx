import { useContactPanel } from '../../stations/contact-panel/use-contact-panel'
import styles from '../../stations/contact-panel/contact-panel.module.css'

export function ContactContent() {
  const { items, intro, availability } = useContactPanel()

  return (
    <div>
      <p>{intro}</p>
      <div className={styles.list}>
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.row}
          >
            <span className={styles.icon}>{it.icon}</span>
            <span className={styles.label}>{it.label}</span>
            <span className={styles.value}>{it.value}</span>
            <span className={styles.chev}>▶</span>
          </a>
        ))}
      </div>
      <p className={styles.availability}>
        {availability.lead} <strong>{availability.org}</strong> {availability.tail}
      </p>
    </div>
  )
}
