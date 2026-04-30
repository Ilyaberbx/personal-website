import { useState } from 'react'
import { experiences } from '../../data/cv'

export function ExperiencePanel() {
  const [open, setOpen] = useState<number>(0)
  return (
    <div className="quests">
      <p>Quest log of completed and ongoing campaigns. Click any to expand.</p>
      <div className="quests__list">
        {experiences.map((q, i) => {
          const isOpen = open === i
          return (
            <div key={q.company} className={`quest ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="quest__header"
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="quest__chev">{isOpen ? '▼' : '▶'}</span>
                <span className="quest__role">{q.role}</span>
                <span className="quest__co">@ {q.company}</span>
                <span className="quest__period">{q.period}</span>
              </button>
              {isOpen && (
                <div className="quest__body">
                  <p className="quest__summary">{q.summary}</p>
                  <ul>
                    {q.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <div className="quest__stack">
                    {q.stack.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <style>{`
        .quests__list { display: flex; flex-direction: column; gap: 8px; }
        .quest {
          background: rgba(22,19,42,0.55);
          border: 3px solid var(--c-primary-dark);
        }
        .quest.is-open {
          border-color: var(--c-primary);
        }
        .quest__header {
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr auto;
          grid-template-areas:
            "chev role period"
            "chev co   co";
          gap: 2px 10px;
          padding: 8px 10px;
          text-align: left;
          color: var(--c-text);
          align-items: center;
        }
        .quest__chev { grid-area: chev; color: var(--c-primary); font-size: 14px; }
        .quest__role {
          grid-area: role;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 1px;
        }
        .quest__co {
          grid-area: co;
          color: var(--c-secondary);
          font-size: 17px;
        }
        .quest__period {
          grid-area: period;
          font-family: var(--font-display);
          font-size: 9px;
          color: var(--c-secondary);
          letter-spacing: 1px;
          text-align: right;
        }
        @media (max-width: 540px) {
          .quest__header {
            grid-template-columns: auto 1fr;
            grid-template-areas:
              "chev role"
              "chev co"
              "chev period";
          }
          .quest__period { text-align: left; }
        }
        .quest__body {
          padding: 4px 14px 14px 14px;
          border-top: 2px dashed var(--c-primary-dark);
        }
        .quest__summary {
          color: var(--c-border);
          margin: 8px 0 6px;
        }
        .quest__stack {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 8px;
        }
        .tag {
          font-family: var(--font-display);
          font-size: 8px;
          letter-spacing: 1px;
          padding: 4px 6px;
          background: var(--c-bg-dark);
          border: 2px solid var(--c-secondary);
          color: var(--c-text);
        }
      `}</style>
    </div>
  )
}
