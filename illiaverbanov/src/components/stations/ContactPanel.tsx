import { profile } from '../../data/cv'

export function ContactPanel() {
  const items = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: '✉' },
    { label: 'Telegram', value: '@ilyaberbx', href: profile.links.telegram, icon: '✈' },
    { label: 'LinkedIn', value: 'in/illia-verbanov', href: profile.links.linkedin, icon: '◆' },
    { label: 'GitHub', value: 'ilyaberbx', href: profile.links.github, icon: '★' },
    { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: '☎' },
  ]
  return (
    <div className="contact">
      <p>Send a raven. I respond within a day or two.</p>
      <div className="contact__list">
        {items.map((it) => (
          <a key={it.label} href={it.href} target="_blank" rel="noreferrer noopener" className="contact__row">
            <span className="contact__icon">{it.icon}</span>
            <span className="contact__label">{it.label}</span>
            <span className="contact__value">{it.value}</span>
            <span className="contact__chev">▶</span>
          </a>
        ))}
      </div>
      <p className="contact__avail">
        Currently working at <strong>Decentra</strong> — open to interesting Web3 / fullstack collaborations and contracts.
      </p>
      <style>{`
        .contact__list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 10px 0;
        }
        .contact__row {
          display: grid;
          grid-template-columns: 28px 100px 1fr auto;
          gap: 10px;
          align-items: center;
          padding: 8px 12px;
          background: var(--c-bg-dark);
          border: 3px solid var(--c-primary-dark);
          color: var(--c-text);
          font-size: 18px;
        }
        .contact__row:hover {
          border-color: var(--c-primary);
          background: var(--c-bg);
          color: var(--c-text);
        }
        .contact__icon {
          font-size: 18px;
          color: var(--c-primary);
          text-align: center;
        }
        .contact__label {
          font-family: var(--font-display);
          font-size: 9px;
          letter-spacing: 1px;
          color: var(--c-secondary);
          text-transform: uppercase;
        }
        .contact__value {
          color: var(--c-text);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .contact__chev {
          color: var(--c-primary);
        }
        @media (max-width: 540px) {
          .contact__row {
            grid-template-columns: 24px 1fr auto;
          }
          .contact__label { display: none; }
        }
        .contact__avail {
          font-style: italic;
          color: var(--c-border);
          margin-top: 12px;
        }
        .contact__avail strong {
          color: var(--c-primary);
          font-style: normal;
        }
      `}</style>
    </div>
  )
}
