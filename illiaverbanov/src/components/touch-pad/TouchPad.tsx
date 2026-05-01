import type { CSSProperties } from 'react'
import { UI_COPY } from '../../data'
import type { Engine } from '../../game/engine'
import type { Dir } from '../../game/input'
import { useTouchPad } from './use-touch-pad'
import styles from './touch-pad.module.css'

type DirSpec = {
  dir: Exclude<Dir, null>
  label: string
  gridArea: 'up' | 'down' | 'left' | 'right'
  ariaLabel: string
}

const DIR_SPECS: readonly DirSpec[] = [
  { dir: 'up', label: '▲', gridArea: 'up', ariaLabel: UI_COPY.touchpad.aria.up },
  { dir: 'left', label: '◀', gridArea: 'left', ariaLabel: UI_COPY.touchpad.aria.left },
  { dir: 'right', label: '▶', gridArea: 'right', ariaLabel: UI_COPY.touchpad.aria.right },
  { dir: 'down', label: '▼', gridArea: 'down', ariaLabel: UI_COPY.touchpad.aria.down },
]

const DPAD_MID_STYLE: CSSProperties = { gridArea: 'mid' }

type Props = {
  engine: Engine
}

export function TouchPad({ engine }: Props) {
  const { show, buildDpadHandlers, handleAction } = useTouchPad(engine)
  if (!show) return null

  return (
    <div className={styles.touchpad}>
      <div className={styles.dpad}>
        {DIR_SPECS.map((spec) => (
          <button
            key={spec.dir}
            type="button"
            className={styles.btn}
            style={{ gridArea: spec.gridArea }}
            aria-label={spec.ariaLabel}
            {...buildDpadHandlers(spec.dir)}
          >
            {spec.label}
          </button>
        ))}
        <div className={styles.dpadMid} style={DPAD_MID_STYLE} />
      </div>
      <button
        type="button"
        className={styles.action}
        onPointerDown={handleAction}
        aria-label={UI_COPY.touchpad.aria.action}
      >
        E
      </button>
    </div>
  )
}
