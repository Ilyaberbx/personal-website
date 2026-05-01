import { useEffect, useMemo, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { Engine } from '../../game/engine'
import type { Dir } from '../../game/input'
import { safeHasPointerCapture, safeSetPointerCapture } from '../../lib/safe-pointer'
import { ACTION_VIBRATION_MS, DPAD_VIBRATION_MS } from '../../game/input-config'

type DpadHandlers = {
  onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => void
  onPointerUp: () => void
  onPointerCancel: () => void
  onPointerLeave: (e: ReactPointerEvent<HTMLButtonElement>) => void
}

export function useTouchPad(engine: Engine) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setShow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const buildDpadHandlers = useMemo(
    () =>
      (d: Exclude<Dir, null>): DpadHandlers => ({
        onPointerDown: (e) => {
          e.preventDefault()
          safeSetPointerCapture(e.target as Element, e.pointerId)
          engine.input.setDpadDir(d)
          engine.input.vibrate(DPAD_VIBRATION_MS)
        },
        onPointerUp: () => engine.input.setDpadDir(null),
        onPointerCancel: () => engine.input.setDpadDir(null),
        onPointerLeave: (e) => {
          const captureResult = safeHasPointerCapture(e.target as Element, e.pointerId)
          const isStillCaptured = captureResult.isOk() && captureResult.value
          if (isStillCaptured) return
          engine.input.setDpadDir(null)
        },
      }),
    [engine],
  )

  const handleAction = (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.preventDefault()
    engine.input.fireAction()
    engine.input.vibrate(ACTION_VIBRATION_MS)
  }

  return { show, buildDpadHandlers, handleAction }
}
