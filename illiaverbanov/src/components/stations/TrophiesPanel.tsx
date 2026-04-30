import { trophies } from '../../data/cv'

export function TrophiesPanel() {
  return (
    <div className="trophies">
      <p>Notable achievements collected along the way.</p>
      <div className="trophies__grid">
        {trophies.map((t) => (
          <article key={t.title} className="trophy">
            <div className="trophy__icon" aria-hidden>
              <Cup />
            </div>
            <div className="trophy__metric">{t.metric}</div>
            <div className="trophy__title">{t.title}</div>
            <div className="trophy__context">{t.context}</div>
          </article>
        ))}
      </div>
      <style>{`
        .trophies__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 10px;
          margin-top: 8px;
        }
        .trophy {
          background: var(--c-bg-dark);
          border: 3px solid var(--c-primary-dark);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .trophy__icon {
          align-self: flex-start;
          margin-bottom: 4px;
        }
        .trophy__metric {
          font-family: var(--font-display);
          font-size: 16px;
          color: var(--c-primary);
          letter-spacing: 1px;
          line-height: 1;
        }
        .trophy__title {
          font-family: var(--font-display);
          font-size: 9px;
          letter-spacing: 1px;
          color: var(--c-text);
          text-transform: uppercase;
        }
        .trophy__context {
          color: var(--c-border);
          font-size: 17px;
        }
      `}</style>
    </div>
  )
}

function Cup() {
  // 12x12 pixel cup
  const grid = [
    'YYYYYYYY....',
    'YKKKKKKKY...',
    'YKYYYYYYK...',
    'YKYYYYYYK.YY',
    'YKYYYYYYKYYY',
    'YKYYYYYYK.YY',
    'YKYYYYYYK...',
    '.YKKKKKKY...',
    '..YYYYYY....',
    '..YKKKKKY...',
    '.YYYYYYYYY..',
    '.KKKKKKKKK..',
  ]
  const colors: Record<string, string> = {
    '.': 'transparent',
    Y: 'var(--c-primary)',
    K: '#0e0a1d',
  }
  const PX = 4
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(12, ${PX}px)`,
        gridTemplateRows: `repeat(12, ${PX}px)`,
      }}
    >
      {grid.flatMap((row, y) =>
        row.split('').map((ch, x) => (
          <div key={`${x}-${y}`} style={{ background: colors[ch] ?? 'transparent' }} />
        )),
      )}
    </div>
  )
}
