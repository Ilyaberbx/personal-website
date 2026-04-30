import { profile, UI_COPY } from '../../../data'
import type { ContactItem } from '../../../data/types'

const TELEGRAM_HANDLE = '@ilyaberbx'
const LINKEDIN_HANDLE = 'in/illia-verbanov'
const GITHUB_HANDLE = 'ilyaberbx'

export function useContactPanel() {
  const items: ContactItem[] = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: '✉' },
    { label: 'Telegram', value: TELEGRAM_HANDLE, href: profile.links.telegram, icon: '✈' },
    { label: 'LinkedIn', value: LINKEDIN_HANDLE, href: profile.links.linkedin, icon: '◆' },
    { label: 'GitHub', value: GITHUB_HANDLE, href: profile.links.github, icon: '★' },
    {
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
      icon: '☎',
    },
  ]

  return {
    items,
    intro: UI_COPY.contact.intro,
    availability: UI_COPY.contact.availability,
  }
}
