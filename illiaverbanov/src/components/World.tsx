import { useEffect, useMemo, useRef } from 'react'
import { Engine, VIEW_H, VIEW_W } from '../game/engine'
import { useGameState } from '../hooks/useGameState'
import { HUD } from './HUD'
import { DialogBox } from './DialogBox'
import { StationModal } from './StationModal'
import { TouchPad } from './TouchPad'
import { NpcModal } from './NpcModal'
import { STATIONS } from '../data/map'
import { setJoystickDir, vibrate, type Dir } from '../game/input'
import { AboutPanel } from './stations/AboutPanel'
import { SkillsPanel } from './stations/SkillsPanel'
import { ExperiencePanel } from './stations/ExperiencePanel'
import { TrophiesPanel } from './stations/TrophiesPanel'
import { ContactPanel } from './stations/ContactPanel'

const PANEL_BY_ID = {
  about: { title: 'The Tavern — About', component: AboutPanel },
  skills: { title: 'The Armory — Skills', component: SkillsPanel },
  experience: { title: 'Quest Board — Experience', component: ExperiencePanel },
  trophies: { title: 'Trophy Hall — Achievements', component: TrophiesPanel },
  contact: { title: 'The Mailbox — Contact', component: ContactPanel },
} as const

type PointerInfo = {
  startX: number
  startY: number
  startTime: number
  dragging: boolean
  pointerType: string
}

const DRAG_THRESHOLD = 12 // px in client space before a touch becomes a drag
const TAP_DURATION_MAX = 350 // ms
const TAP_MOVE_MAX = 14 // px

function dirFromDelta(dx: number, dy: number): Dir {
  if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return null
  return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up'
}

export function World() {
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

  const focus = state.focus
  const station = focus?.kind === 'station' ? STATIONS.find((s) => s.id === focus.id) : null
  const modal = state.modal

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (modal) return
    const canvas = canvasRef.current
    if (!canvas) return
    e.preventDefault()
    try {
      canvas.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    pointersRef.current.set(e.pointerId, {
      startX: e.clientX,
      startY: e.clientY,
      startTime: performance.now(),
      dragging: false,
      pointerType: e.pointerType,
    })
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const info = pointersRef.current.get(e.pointerId)
    if (!info) return
    if (info.pointerType === 'mouse') return // no joystick for mouse
    const dx = e.clientX - info.startX
    const dy = e.clientY - info.startY
    const dist = Math.hypot(dx, dy)
    if (!info.dragging && dist < DRAG_THRESHOLD) return
    info.dragging = true
    const dir = dirFromDelta(dx, dy)
    setJoystickDir(dir)
  }

  const finishPointer = (e: React.PointerEvent<HTMLCanvasElement>, fired: boolean) => {
    const info = pointersRef.current.get(e.pointerId)
    if (!info) return
    pointersRef.current.delete(e.pointerId)

    if (info.dragging) {
      // Clear joystick only when no other finger is still dragging
      let othersDragging = false
      for (const v of pointersRef.current.values()) if (v.dragging) othersDragging = true
      if (!othersDragging) setJoystickDir(null)
      return
    }

    if (fired) return

    const dx = e.clientX - info.startX
    const dy = e.clientY - info.startY
    const dist = Math.hypot(dx, dy)
    const elapsed = performance.now() - info.startTime
    if (dist > TAP_MOVE_MAX || elapsed > TAP_DURATION_MAX) return

    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const viewX = ((e.clientX - rect.left) / rect.width) * VIEW_W
    const viewY = ((e.clientY - rect.top) / rect.height) * VIEW_H
    const opened = engine.tapInteract(viewX, viewY)
    if (opened) vibrate(12)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => finishPointer(e, false)
  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const info = pointersRef.current.get(e.pointerId)
    if (info?.dragging) setJoystickDir(null)
    pointersRef.current.delete(e.pointerId)
  }

  return (
    <div className="world scanlines">
      <HUD />

      <div className="world__viewport">
        <canvas
          ref={canvasRef}
          width={VIEW_W}
          height={VIEW_H}
          className="world__canvas"
          aria-label="Pixel-art world. Drag to walk, tap a building to enter, or use WASD on desktop."
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        />

        {!modal && station && (
          <DialogBox label={station.label} hint={station.hint} variant="station" />
        )}
        {!modal && focus?.kind === 'npc' && (
          <DialogBox label="Wandering Bard" hint="Hear the bard's tale" variant="npc" />
        )}

        <div className="world__hint" aria-hidden={!!modal}>
          WASD / Arrows · [E] interact · [Esc] close
        </div>
        <div className="world__hint world__hint--touch" aria-hidden={!!modal}>
          Drag to walk · tap a building to enter
        </div>
      </div>

      <TouchPad />

      {modal?.kind === 'station' &&
        (() => {
          const cfg = PANEL_BY_ID[modal.id]
          const Comp = cfg.component
          return (
            <StationModal title={cfg.title} onClose={() => engine.closeModal()}>
              <Comp />
            </StationModal>
          )
        })()}

      {modal?.kind === 'npc' && <NpcModal onClose={() => engine.closeModal()} />}

      <style>{`
        .world {
          position: fixed;
          inset: 0;
          height: 100dvh;
          width: 100vw;
          background: var(--c-bg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .world__viewport {
          flex: 1 1 0;
          min-height: 0;
          position: relative;
          display: grid;
          place-items: center;
          padding: 8px;
        }
        .world__canvas {
          display: block;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          aspect-ratio: ${VIEW_W} / ${VIEW_H};
          image-rendering: pixelated;
          background: var(--c-bg-dark);
          border: 4px solid var(--c-border);
          box-shadow: 0 0 0 4px var(--c-bg-dark), 0 0 32px rgba(144, 103, 198, 0.35);
          outline: none;
          touch-action: none;
          cursor: pointer;
        }
        .world__hint {
          position: absolute;
          right: 10px;
          bottom: 6px;
          font-family: var(--font-display);
          font-size: 8px;
          letter-spacing: 1px;
          color: var(--c-secondary);
          opacity: 0.6;
          pointer-events: none;
          z-index: 5;
          max-width: 60%;
          text-align: right;
        }
        .world__hint--touch { display: none; }

        @media (max-width: 720px), (pointer: coarse) {
          .world__hint { display: none; }
          .world__hint--touch {
            display: block;
            left: 10px;
            right: auto;
            text-align: left;
          }
          .world__viewport { padding: 4px; }
          .world__canvas {
            border-width: 3px;
            box-shadow: 0 0 0 3px var(--c-bg-dark), 0 0 16px rgba(144, 103, 198, 0.3);
          }
        }
      `}</style>
    </div>
  )
}
