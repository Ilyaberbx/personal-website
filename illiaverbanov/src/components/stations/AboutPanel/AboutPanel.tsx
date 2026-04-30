import { education, languages, profile } from '../../../data'
import { Field } from './Field'
import styles from './about-panel.module.css'

export function AboutPanel() {
  const xp = `${profile.xpYears}+ years software, ~2y blockchain, ~1y .NET`

  return (
    <div>
      <p className={styles.lead}>{profile.summary}</p>

      <h3>Identity</h3>
      <div className={styles.grid}>
        <Field k="Name" v={profile.name} />
        <Field k="Class" v={profile.title} />
        <Field k="Hometown" v={profile.location} />
        <Field k="XP" v={xp} />
      </div>

      <h3>Education</h3>
      <div className={styles.grid}>
        <Field k="School" v={education.school} />
        <Field k="Degree" v={education.degree} />
        <Field k="Years" v={education.period} />
      </div>

      <h3>Languages</h3>
      <div className={styles.grid}>
        {languages.map((l) => (
          <Field key={l.name} k={l.name} v={l.level} />
        ))}
      </div>
    </div>
  )
}
