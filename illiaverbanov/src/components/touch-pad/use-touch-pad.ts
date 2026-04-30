import { useEffect, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { fireAction, setDpadDir, vibrate, type Dir } from '../../game/input'
import { safeHasPointerCapture, safeSetPointerCapture } from '../../lib/safe-pointer'

const DPAD_VIBRATION_MS = 6
const ACTION_VIBRATION_MS = 10

type DpadHandlers = {
  onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => void
  onPointerUp: () => void
  onPointerCancel: () => void
  onPointerLeave: (e: ReactPointerEvent<HTMLButtonElement>) => void
}

export function useTouchPad() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setShow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const buildDpadHandlers = (d: Exclude<Dir, null>): DpadHandlers => ({
    onPointerDown: (e) => {
      e.preventDefault()
      safeSetPointerCapture(e.target as Element, e.pointerId)
      setDpadDir(d)
      vibrate(DPAD_VIBRATION_MS)
    },
    onPointerUp: () => setDpadDir(null),
    onPointerCancel: () => setDpadDir(null),
    onPointerLeave: (e) => {
      const captureResult = safeHasPointerCapture(e.target as Element, e.pointerId)
      const isStillCaptured = captureResult.isOk() && captureResult.value
      if (isStillCaptured) return
      setDpadDir(null)
    },
  })

  const handleAction = (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.preventDefault()
    fireAction()
    vibrate(ACTION_VIBRATION_MS)
  }

  return { show, buildDpadHandlers, handleAction }
}
