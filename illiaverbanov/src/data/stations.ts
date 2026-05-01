import type { ComponentType } from 'react'
import { AboutPanel } from '../components/stations/about-panel'
import { ContactPanel } from '../components/stations/contact-panel'
import { ExperiencePanel } from '../components/stations/experience-panel'
import { SkillsPanel } from '../components/stations/skills-panel'
import { TrophiesPanel } from '../components/stations/trophies-panel'

type StationEntry = {
  x: number
  y: number
  sprite: 'tavern' | 'armory' | 'quest-board' | 'trophy-hall' | 'mailbox'
  label: string
  hint: string
  modalTitle: string
  Panel: ComponentType
}

export const STATIONS = {
  about: {
    x: 6,
    y: 4,
    sprite: 'tavern',
    label: 'The Tavern',
    hint: "Read the traveler's tale",
    modalTitle: 'The Tavern — About',
    Panel: AboutPanel,
  },
  skills: {
    x: 25,
    y: 4,
    sprite: 'armory',
    label: 'The Armory',
    hint: 'Inspect equipped skills',
    modalTitle: 'The Armory — Skills',
    Panel: SkillsPanel,
  },
  experience: {
    x: 16,
    y: 2,
    sprite: 'quest-board',
    label: 'Quest Board',
    hint: 'Review completed quests',
    modalTitle: 'Quest Board — Experience',
    Panel: ExperiencePanel,
  },
  trophies: {
    x: 25,
    y: 17,
    sprite: 'trophy-hall',
    label: 'Trophy Hall',
    hint: 'Admire the trophies',
    modalTitle: 'Trophy Hall — Achievements',
    Panel: TrophiesPanel,
  },
  contact: {
    x: 6,
    y: 17,
    sprite: 'mailbox',
    label: 'The Mailbox',
    hint: 'Send a raven',
    modalTitle: 'The Mailbox — Contact',
    Panel: ContactPanel,
  },
} as const satisfies Record<string, StationEntry>
