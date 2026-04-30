import { useEffect, useState } from 'react'
import { PixelWindow } from './PixelWindow'
import { NPC } from '../data/map'
import { profile } from '../data/cv'

type Props = { onClose: () => void }

export function NpcModal({ onClose }: Props) {
  const [step, setStep] = useState(0)
  const lines = [...NPC.lines, profile.summary]
  const isLast = step >= lines.length - 1

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyE') {
        e.preventDefault()
        if (isLast) onClose()
        else setStep((s) => s + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isLast, onClose])

  return (
    <div className="npc-backdrop" onClick={onClose}>
      <div className="npc-stop" onClick={(e) => e.stopPropagation()}>
        <PixelWindow title={NPC.label} onClose={onClose} width={620}>
          <div className="npc-body">
            <div className="npc-portrait" aria-hidden>
              <BardPortrait />
            </div>
            <div className="npc-text">
              {lines.slice(0, step + 1).map((line, i) => (
                <p key={i} className={i === step ? 'npc-line npc-line--active' : 'npc-line'}>
                  {line}
                </p>
              ))}
              <button
                type="button"
                className="npc-next"
                onClick={() => (isLast ? onClose() : setStep((s) => s + 1))}
              >
                {isLast ? 'Farewell ▶' : 'Next ▼'}
              </button>
            </div>
          </div>
        </PixelWindow>
      </div>
      <style>{`
        .npc-backdrop {
          position: fixed; inset: 0;
          height: 100dvh;
          background: rgba(14,10,29,0.78);
          z-index: 100;
          display: grid;
          place-items: center;
          padding: 14px 8px;
        }
        .npc-stop {
          max-height: calc(100dvh - 28px);
          display: flex;
          width: 100%;
          justify-content: center;
        }
        .npc-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          align-items: start;
          font-family: var(--font-body);
          font-size: 17px;
          color: var(--c-text);
          max-height: calc(100dvh - 110px);
          overflow-y: auto;
        }
        .npc-portrait { justify-self: center; }
        @media (min-width: 640px) {
          .npc-backdrop { padding: 28px 16px; }
          .npc-stop { max-height: calc(100dvh - 56px); }
          .npc-body {
            grid-template-columns: 96px 1fr;
            gap: 16px;
            font-size: 19px;
            max-height: calc(100dvh - 140px);
          }
          .npc-portrait { justify-self: start; }
        }
        .npc-portrait {
          padding: 6px;
          background: var(--c-bg-dark);
          border: 3px solid var(--c-primary-dark);
        }
        .npc-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .npc-line {
          margin: 0;
          padding: 6px 8px;
          background: rgba(22,19,42,0.5);
          border-left: 4px solid var(--c-primary-dark);
          color: var(--c-border);
        }
        .npc-line--active {
          color: var(--c-text);
          border-left-color: var(--c-primary);
          background: rgba(22,19,42,0.85);
          animation: typewriter 220ms steps(8) both;
        }
        @keyframes typewriter {
          from { transform: translateY(4px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        .npc-next {
          align-self: flex-end;
          margin-top: 8px;
          padding: 8px 14px;
          background: var(--c-primary-dark);
          border: 3px solid var(--c-border);
          color: var(--c-text);
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 1px;
        }
        .npc-next:hover { background: var(--c-primary); }
      `}</style>
    </div>
  )
}

function BardPortrait() {
  // 16x16 NPC face matching the in-world sprite
  const grid = [
    '....HHHHHHHH....',
    '...HPPPPPPPPH...',
    '...HSSSSSSSSh...',
    '...SSSSSSSSSS...',
    '...SKSSSSKSSS...',
    '...SSSSSSSSSS...',
    '...SBBSSSSBSS...',
    '...XBBBBBBBBX...',
    '..CCCCCCCCCCCC..',
    '..CCCCCCCCCCWWC.',
    '..CCCCCCCCCWYWC.',
    '..CCCCCCCCCWWWC.',
    '..CCCCCCCCCCCCC.',
    '..DDDDDDDDDDDDD.',
    '...KKKK....KKKK.',
    '...KKKK....KKKK.',
  ]
  const colors: Record<string, string> = {
    '.': 'transparent',
    H: 'var(--c-bg-dark)',
    P: 'var(--c-secondary)',
    h: 'var(--c-bg-dark)',
    S: 'var(--c-text)',
    K: '#0e0a1d',
    B: 'var(--c-border)',
    X: 'var(--c-border)',
    C: 'var(--c-secondary)',
    D: 'var(--c-primary-dark)',
    W: '#3a2a55',
    Y: 'var(--c-primary)',
  }
  const PX = 5
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(16, ${PX}px)`,
        gridTemplateRows: `repeat(16, ${PX}px)`,
      }}
      aria-hidden
    >
      {grid.flatMap((row, y) =>
        row.split('').map((ch, x) => (
          <div key={`${x}-${y}`} style={{ background: colors[ch] ?? 'transparent' }} />
        )),
      )}
    </div>
  )
}
