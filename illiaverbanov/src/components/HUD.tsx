import { profile } from '../data/cv'

export function HUD() {
  return (
    <div className="hud">
      <div className="hud__left">
        <div className="hud__row hud__row--name">
          <span className="hud__label">Adventurer</span>
          <span className="hud__value hud__value--name">{profile.name}</span>
        </div>
        <div className="hud__row hud__row--class">
          <span className="hud__label">Class</span>
          <span className="hud__value hud__value--class">{profile.title}</span>
        </div>
      </div>
      <div className="hud__lvl">
        <span className="hud__label">LVL</span>
        <div className="hud__lvl-row">
          <span className="hud__value hud__value--lvl">{profile.level}</span>
          <div className="hud__bar" aria-hidden>
            <div
              className="hud__bar-fill"
              style={{ width: `${(profile.level / 9) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .hud {
          flex: 0 0 auto;
          display: flex;
          gap: 8px;
          align-items: stretch;
          padding: 8px;
          background: var(--c-bg-dark);
          border-bottom: 3px solid var(--c-primary-dark);
          font-family: var(--font-body);
          z-index: 50;
        }
        .hud__left {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: rgba(36,32,56,0.55);
          border: 2px solid var(--c-border);
          padding: 6px 10px;
        }
        .hud__lvl {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: rgba(36,32,56,0.55);
          border: 2px solid var(--c-border);
          padding: 6px 10px;
          min-width: 110px;
        }
        .hud__row { display: flex; align-items: baseline; gap: 8px; min-width: 0; }
        .hud__label {
          font-family: var(--font-display);
          font-size: 8px;
          letter-spacing: 1px;
          color: var(--c-secondary);
          text-transform: uppercase;
          flex: 0 0 auto;
        }
        .hud__value {
          color: var(--c-text);
          line-height: 1.1;
          min-width: 0;
        }
        .hud__value--name { font-size: 18px; font-weight: 700; }
        .hud__value--class {
          font-size: 14px;
          color: var(--c-border);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hud__lvl-row { display: flex; align-items: center; gap: 8px; }
        .hud__value--lvl {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--c-primary);
        }
        .hud__bar {
          flex: 1 1 auto;
          height: 8px;
          background: var(--c-bg-dark);
          border: 2px solid var(--c-border);
        }
        .hud__bar-fill {
          height: 100%;
          background: var(--c-primary);
          box-shadow: inset 0 -2px 0 var(--c-primary-dark);
        }

        /* Tablet up — give HUD a touch more breathing room */
        @media (min-width: 640px) {
          .hud { padding: 10px 14px; gap: 12px; }
          .hud__left { padding: 8px 14px; }
          .hud__lvl { padding: 8px 14px; min-width: 160px; }
          .hud__value--name { font-size: 22px; }
          .hud__value--class { font-size: 17px; }
        }

        /* Tiny phones — drop the class line entirely so the LVL bar can stretch */
        @media (max-width: 380px) {
          .hud { padding: 6px; }
          .hud__row--class { display: none; }
          .hud__left { padding: 4px 8px; }
          .hud__lvl { padding: 4px 8px; min-width: 90px; }
          .hud__label { font-size: 7px; }
          .hud__value--name { font-size: 16px; }
        }

        /* Landscape phones — short height, keep HUD vertical-compact */
        @media (max-height: 420px) {
          .hud { padding: 4px 8px; }
          .hud__row--class { display: none; }
          .hud__left, .hud__lvl { padding: 4px 8px; }
        }
      `}</style>
    </div>
  )
}
