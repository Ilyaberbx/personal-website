import type { ControlLegendItem } from '../../data/types'
import styles from './intro-screen.module.css'

type Props = {
  items: readonly ControlLegendItem[]
}

export function ControlsLegend({ items }: Props) {
  return (
    <>
      {items.map((item) => (
        <span key={item.key}>
          <span className={styles.legendKey}>{item.key}</span>
          {item.label}
        </span>
      ))}
    </>
  )
}
