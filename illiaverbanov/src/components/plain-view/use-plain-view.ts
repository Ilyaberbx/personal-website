import { profile } from '../../data'
import { SECTIONS } from './plain-view.constants'

export function usePlainView() {
  return {
    hero: {
      name: profile.name,
      title: profile.title,
      location: profile.location,
      summary: profile.summary,
    },
    sections: SECTIONS,
  }
}
