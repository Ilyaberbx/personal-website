import { profile, education, languages } from '../../data/cv'

export function AboutPanel() {
  return (
    <div className="about">
      <p className="about__lead">{profile.summary}</p>

      <h3>Identity</h3>
      <div className="grid">
        <Field k="Name" v={profile.name} />
        <Field k="Class" v={profile.title} />
        <Field k="Hometown" v={profile.location} />
        <Field k="XP" v={`${profile.xpYears}+ years software, ~2y blockchain, ~1y .NET`} />
      </div>

      <h3>Education</h3>
      <div className="grid">
        <Field k="School" v={education.school} />
        <Field k="Degree" v={education.degree} />
        <Field k="Years" v={education.period} />
      </div>

      <h3>Languages</h3>
      <div className="grid">
        {languages.map((l) => (
          <Field key={l.name} k={l.name} v={l.level} />
        ))}
      </div>

      <style>{`
        .about__lead {
          padding: 12px 14px;
          background: var(--c-bg-dark);
          border-left: 4px solid var(--c-primary);
          margin: 4px 0 12px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
        }
        @media (max-width: 540px) {
          .grid { grid-template-columns: 1fr; }
        }
        .field {
          display: flex;
          flex-direction: column;
          padding: 6px 8px;
          background: rgba(22,19,42,0.55);
          border-bottom: 2px solid var(--c-primary-dark);
        }
        .field__k {
          font-family: var(--font-display);
          font-size: 9px;
          letter-spacing: 1px;
          color: var(--c-secondary);
          text-transform: uppercase;
        }
        .field__v {
          color: var(--c-text);
        }
      `}</style>
    </div>
  )
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="field">
      <span className="field__k">{k}</span>
      <span className="field__v">{v}</span>
    </div>
  )
}
