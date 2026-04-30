import type { StationContent, StationId } from './types'

export const STATION_CONTENT: Record<StationId, StationContent> = {
  about: {
    id: 'about',
    label: 'The Tavern',
    hint: "Read the traveler's tale",
    modalTitle: 'The Tavern — About',
    panel: 'about',
  },
  skills: {
    id: 'skills',
    label: 'The Armory',
    hint: 'Inspect equipped skills',
    modalTitle: 'The Armory — Skills',
    panel: 'skills',
  },
  experience: {
    id: 'experience',
    label: 'Quest Board',
    hint: 'Review completed quests',
    modalTitle: 'Quest Board — Experience',
    panel: 'experience',
  },
  trophies: {
    id: 'trophies',
    label: 'Trophy Hall',
    hint: 'Admire the trophies',
    modalTitle: 'Trophy Hall — Achievements',
    panel: 'trophies',
  },
  contact: {
    id: 'contact',
    label: 'The Mailbox',
    hint: 'Send a raven',
    modalTitle: 'The Mailbox — Contact',
    panel: 'contact',
  },
}

export function getStationContent(id: StationId): StationContent {
  return STATION_CONTENT[id]
}
