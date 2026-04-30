import { useEffect, useState } from 'react'
import { fireAction, setDpadDir, vibrate, type Dir } from '../game/input'

export function TouchPad() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setShow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (!show) return null

  const dirBtn = (d: Exclude<Dir, null>, label: string, gridArea: string) => (
    <button
      type="button"
      className="touchpad__btn"
      style={{ gridArea }}
      onPointerDown={(e) => {
        e.preventDefault()
        ;(e.target as Element).setPointerCapture?.(e.pointerId)
        setDpadDir(d)
        vibrate(6)
      }}
      onPointerUp={() => setDpadDir(null)}
      onPointerCancel={() => setDpadDir(null)}
      onPointerLeave={(e) => {
        // Only release if this pointer left during a non-captured drag
        if (!(e.target as Element).hasPointerCapture?.(e.pointerId)) {
          setDpadDir(null)
        }
      }}
      aria-label={`Move ${d}`}
    >
      {label}
    </button>
  )

  return (
    <div className="touchpad">
      <div className="touchpad__dpad">
        {dirBtn('up', '▲', 'up')}
        {dirBtn('left', '◀', 'left')}
        <div className="touchpad__dpad-mid" style={{ gridArea: 'mid' }} />
        {dirBtn('right', '▶', 'right')}
        {dirBtn('down', '▼', 'down')}
      </div>
      <button
        type="button"
        className="touchpad__action"
        onPointerDown={(e) => {
          e.preventDefault()
          fireAction()
          vibrate(10)
        }}
        aria-label="Interact"
      >
        E
      </button>
      <style>{`
        .touchpad {
          flex: 0 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 14px calc(8px + env(safe-area-inset-bottom, 0px));
          gap: 12px;
          background: var(--c-bg-dark);
          border-top: 3px solid var(--c-primary-dark);
          z-index: 200;
          touch-action: none;
        }
        .touchpad__dpad {
          display: grid;
          --cell: 44px;
          grid-template-columns: repeat(3, var(--cell));
          grid-template-rows: repeat(3, var(--cell));
          grid-template-areas:
            ".  up  ."
            "left mid right"
            ".  down .";
          gap: 2px;
        }
        .touchpad__dpad-mid {
          background: var(--c-bg);
          border: 2px solid var(--c-bg-dark);
        }
        .touchpad__btn {
          background: var(--c-bg);
          border: 3px solid var(--c-border);
          color: var(--c-text);
          font-family: var(--font-display);
          font-size: 14px;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          padding: 0;
        }
        .touchpad__btn:active,
        .touchpad__btn:focus-visible { background: var(--c-primary-dark); outline: none; }
        .touchpad__action {
          width: 64px;
          height: 64px;
          flex: 0 0 auto;
          border: 4px solid var(--c-border);
          background: var(--c-primary-dark);
          color: var(--c-text);
          font-family: var(--font-display);
          font-size: 22px;
          box-shadow: 0 4px 0 0 rgba(0,0,0,0.45);
          touch-action: none;
        }
        .touchpad__action:active {
          background: var(--c-primary);
          transform: translateY(2px);
          box-shadow: 0 2px 0 0 rgba(0,0,0,0.45);
        }

        @media (min-width: 640px) {
          .touchpad { padding: 12px 18px calc(12px + env(safe-area-inset-bottom, 0px)); }
          .touchpad__dpad { --cell: 52px; }
          .touchpad__action { width: 76px; height: 76px; font-size: 26px; }
        }

        @media (max-height: 480px) {
          .touchpad { padding: 4px 10px calc(4px + env(safe-area-inset-bottom, 0px)); }
          .touchpad__dpad { --cell: 38px; }
          .touchpad__action { width: 56px; height: 56px; font-size: 18px; }
        }
        @media (max-width: 340px) {
          .touchpad { padding: 6px 8px calc(6px + env(safe-area-inset-bottom, 0px)); gap: 6px; }
          .touchpad__dpad { --cell: 38px; }
          .touchpad__action { width: 56px; height: 56px; font-size: 18px; }
        }
      `}</style>
    </div>
  )
}
