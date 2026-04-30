import { useEffect, useMemo, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { Engine, VIEW_H, VIEW_W } from '../../game/engine'
import { setJoystickDir, vibrate, type Dir } from '../../game/input'
import { useGameState } from '../../hooks/use-game-state'
import { safeSetPointerCapture } from '../../lib/safe-pointer'
import {
  DRAG_THRESHOLD_PX,
  JOYSTICK_DEAD_ZONE_PX,
  TAP_DURATION_MAX_MS,
  TAP_INTERACT_VIBRATION_MS,
  TAP_MOVE_MAX_PX,
} from './world.constants'

type PointerInfo = {
  startX: number
  startY: number
  startTime: number
  dragging: boolean
  pointerType: string
}

function dirFromDelta(dx: number, dy: number): Dir {
  const isInsideDeadZone =
    Math.abs(dx) < JOYSTICK_DEAD_ZONE_PX && Math.abs(dy) < JOYSTICK_DEAD_ZONE_PX
  if (isInsideDeadZone) return null

  const isHorizontalDominant = Math.abs(dx) > Math.abs(dy)
  if (isHorizontalDominant) return dx > 0 ? 'right' : 'left'
  return dy > 0 ? 'down' : 'up'
}

export function useWorld() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const engine = useMemo(() => new Engine(), [])
  const state = useGameState(engine)
  const pointersRef = useRef<Map<number, PointerInfo>>(new Map())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    engine.attach(canvas)
    return () => engine.detach()
  }, [engine])

  const modal = state.modal
  const focus = state.focus

  const handlePointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (modal) return
    const canvas = canvasRef.current
    if (!canvas) return
    e.preventDefault()
    safeSetPointerCapture(canvas, e.pointerId)
    pointersRef.current.set(e.pointerId, {
      startX: e.clientX,
      startY: e.clientY,
      startTime: performance.now(),
      dragging: false,
      pointerType: e.pointerType,
    })
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const info = pointersRef.current.get(e.pointerId)
    if (!info) return
    const isMousePointer = info.pointerType === 'mouse'
    if (isMousePointer) return // no joystick for mouse

    const dx = e.clientX - info.startX
    const dy = e.clientY - info.startY
    const dist = Math.hypot(dx, dy)
    const isBelowDragThreshold = !info.dragging && dist < DRAG_THRESHOLD_PX
    if (isBelowDragThreshold) return

    info.dragging = true
    setJoystickDir(dirFromDelta(dx, dy))
  }

  const finishPointer = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const info = pointersRef.current.get(e.pointerId)
    if (!info) return
    pointersRef.current.delete(e.pointerId)

    if (info.dragging) {
      let othersDragging = false
      for (const v of pointersRef.current.values()) if (v.dragging) othersDragging = true
      if (!othersDragging) setJoystickDir(null)
      return
    }

    const dx = e.clientX - info.startX
    const dy = e.clientY - info.startY
    const dist = Math.hypot(dx, dy)
    const elapsed = performance.now() - info.startTime
    const isTooFarForTap = dist > TAP_MOVE_MAX_PX
    const isTooSlowForTap = elapsed > TAP_DURATION_MAX_MS
    if (isTooFarForTap || isTooSlowForTap) return

    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const viewX = ((e.clientX - rect.left) / rect.width) * VIEW_W
    const viewY = ((e.clientY - rect.top) / rect.height) * VIEW_H
    const opened = engine.tapInteract(viewX, viewY)
    if (opened) vibrate(TAP_INTERACT_VIBRATION_MS)
  }

  const handlePointerCancel = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const info = pointersRef.current.get(e.pointerId)
    if (info?.dragging) setJoystickDir(null)
    pointersRef.current.delete(e.pointerId)
  }

  const closeModal = () => engine.closeModal()

  return {
    canvasRef,
    modal,
    focus,
    pointerHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: finishPointer,
      onPointerCancel: handlePointerCancel,
    },
    closeModal,
  }
}
