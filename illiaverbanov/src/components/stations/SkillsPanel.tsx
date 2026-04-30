import { skillGroups } from '../../data/cv'

export function SkillsPanel() {
  return (
    <div className="skills">
      <p>Inventory of equipped technologies. The bar shows hands-on depth, not years.</p>
      {skillGroups.map((g) => (
        <section key={g.category} className="skills__group">
          <h4>{g.category}</h4>
          <div className="skills__list">
            {g.items.map((s) => (
              <div key={s.name} className="skill">
                <span className="skill__name">{s.name}</span>
                <span className="skill__bar" aria-label={`${s.level} of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`skill__pip ${i < s.level ? 'is-on' : ''}`}
                    />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
      <style>{`
        .skills__group + .skills__group { margin-top: 14px; }
        .skills__list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px 18px;
        }
        @media (max-width: 540px) {
          .skills__list { grid-template-columns: 1fr; }
        }
        .skill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 4px 6px;
          border-bottom: 2px dotted var(--c-primary-dark);
        }
        .skill__name { color: var(--c-text); }
        .skill__bar {
          display: inline-flex;
          gap: 3px;
        }
        .skill__pip {
          display: inline-block;
          width: 14px;
          height: 12px;
          background: var(--c-bg-dark);
          border: 2px solid var(--c-border);
        }
        .skill__pip.is-on {
          background: var(--c-primary);
          box-shadow: inset 0 -3px 0 var(--c-primary-dark);
        }
      `}</style>
    </div>
  )
}
