import styles from './about-panel.module.css'

type Props = {
  k: string
  v: string
}

export function Field({ k, v }: Props) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldKey}>{k}</span>
      <span className={styles.fieldValue}>{v}</span>
    </div>
  )
}
