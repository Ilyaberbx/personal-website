import { useEffect } from 'react'
import { profile } from '../data/cv'

type Props = {
  onStart: () => void
}

export function IntroScreen({ onStart }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent | PointerEvent) => {
      if ('key' in e && (e.key === 'Tab' || e.key === 'Shift')) return
      onStart()
    }
    window.addEventListener('keydown', handler as EventListener)
    window.addEventListener('pointerdown', handler as EventListener)
    return () => {
      window.removeEventListener('keydown', handler as EventListener)
      window.removeEventListener('pointerdown', handler as EventListener)
    }
  }, [onStart])

  return (
    <div className="intro" role="presentation">
      <div className="intro__inner">
        <div className="intro__logo">
          {/* Stylized big-letter logo using CSS pixels */}
          <h1 className="intro__title">{profile.name.toUpperCase()}</h1>
          <div className="intro__sub">{profile.title}</div>
        </div>

        <div className="intro__avatar" aria-hidden="true">
          <Avatar />
        </div>

        <div className="intro__cta">
          <span className="intro__cta-prompt">PRESS ANY KEY</span>
          <span className="intro__cta-blink" />
        </div>

        <div className="intro__controls">
          <ControlsLegend />
        </div>

        <div className="intro__location">
          {profile.location} · since 2021
        </div>
      </div>
      <style>{`
        .intro {
          position: fixed;
          inset: 0;
          height: 100dvh;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at 50% 0%, var(--c-primary-dark) 0%, transparent 60%),
            var(--c-bg);
          color: var(--c-text);
          padding: 16px;
          overflow: hidden;
        }
        .intro::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--c-primary-dark) 1px, transparent 1px),
            linear-gradient(90deg, var(--c-primary-dark) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.18;
          pointer-events: none;
        }
        .intro__inner {
          position: relative;
          display: grid;
          gap: 16px;
          place-items: center;
          text-align: center;
          max-width: 720px;
          width: 100%;
        }
        @media (min-width: 640px) {
          .intro { padding: 24px; }
          .intro__inner { gap: 24px; }
        }
        /* Landscape phones — keep it scrollable-free */
        @media (max-height: 480px) {
          .intro__inner { gap: 8px; }
          .intro__avatar { transform: scale(0.7); margin: -10px 0; }
        }
        .intro__title {
          font-family: var(--font-display);
          font-size: clamp(20px, 5vw, 38px);
          letter-spacing: 4px;
          margin: 0;
          color: var(--c-text);
          text-shadow:
            4px 4px 0 var(--c-primary-dark),
            8px 8px 0 var(--c-bg-dark);
        }
        .intro__sub {
          font-family: var(--font-display);
          font-size: clamp(8px, 1.6vw, 11px);
          letter-spacing: 2px;
          color: var(--c-secondary);
          margin-top: 14px;
        }
        .intro__avatar {
          margin: 4px 0 8px;
        }
        .intro__cta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 2px;
          padding: 12px 20px;
          background: var(--c-primary-dark);
          border: 4px solid var(--c-border);
          box-shadow: 0 0 0 4px var(--c-bg-dark), 0 8px 0 4px rgba(0,0,0,0.5);
          margin-top: 8px;
        }
        .intro__cta-blink {
          width: 10px;
          height: 14px;
          background: var(--c-text);
          animation: blink 1s steps(2, start) infinite;
        }
        .intro__controls {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          justify-content: center;
          font-family: var(--font-body);
          font-size: 18px;
          color: var(--c-border);
        }
        .intro__location {
          font-family: var(--font-body);
          font-size: 18px;
          color: var(--c-secondary);
          opacity: 0.8;
        }
        .intro__legend-key {
          display: inline-block;
          background: var(--c-bg-dark);
          border: 2px solid var(--c-border);
          padding: 2px 6px;
          margin-right: 6px;
          font-family: var(--font-display);
          font-size: 9px;
          color: var(--c-text);
        }
      `}</style>
    </div>
  )
}

function ControlsLegend() {
  return (
    <>
      <span><span className="intro__legend-key">WASD</span>move</span>
      <span><span className="intro__legend-key">E / ␣</span>interact</span>
      <span><span className="intro__legend-key">ESC</span>close</span>
    </>
  )
}

// CSS-pixel-art avatar (4x scale). Identical to the canvas player but rendered
// in DOM for the title screen.
function Avatar() {
  // 16x16 grid expressed as a string per row.
  // colors: B=bg, S=skin, H=hair, P=primary(violet), D=primaryDark, C=cape(secondary), K=ink, X=skinShadow
  const grid = [
    '................',
    '................',
    '.....HHHHHH.....',
    '....HSSSSSSH....',
    '....SSSSSSSS....',
    '....SKSSKSSS....',
    '....SSSSSSSS....',
    '....XSSSSSSX....',
    '...SPPPPPPPPS...',
    '...SPPPPPPPPS...',
    '...SPPPPPPPPS...',
    '...SKKKKKKKKS...',
    '....DDDDDDDD....',
    '.....KKKKKK.....',
    '.....KK..KK.....',
    '.....KK..KK.....',
  ]
  const colors: Record<string, string> = {
    '.': 'transparent',
    B: 'var(--c-bg)',
    S: 'var(--c-text)',
    X: 'var(--c-border)',
    H: 'var(--c-bg-dark)',
    P: 'var(--c-primary)',
    D: 'var(--c-primary-dark)',
    C: 'var(--c-secondary)',
    K: '#0e0a1d',
  }
  const PX = 6 // 6px per pixel
  return (
    <div
      style={{
        width: 16 * PX,
        height: 16 * PX,
        display: 'grid',
        gridTemplateColumns: `repeat(16, ${PX}px)`,
        gridTemplateRows: `repeat(16, ${PX}px)`,
        filter: 'drop-shadow(6px 6px 0 rgba(0,0,0,0.55))',
      }}
      aria-hidden
    >
      {grid.flatMap((row, y) =>
        row.split('').map((ch, x) => (
          <div
            key={`${x}-${y}`}
            style={{ background: colors[ch] ?? 'transparent' }}
          />
        )),
      )}
    </div>
  )
}
