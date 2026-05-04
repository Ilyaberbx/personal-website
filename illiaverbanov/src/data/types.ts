import type { STATIONS } from './stations'

export type StationId = keyof typeof STATIONS

export type Language = { name: string; level: string }

export type Education = { school: string; degree: string; period: string }

export type ProfileLinks = {
  linkedin: string
  telegram: string
  github: string
}

export type Profile = {
  name: string
  title: string
  location: string
  email: string
  phone: string
  links: ProfileLinks
  summary: string
  level: number
  xpYears: number
}

export type SkillItem = { name: string; level: number }

export type SkillGroup = {
  category: string
  items: SkillItem[]
}

export type Experience = {
  role: string
  company: string
  location: string
  period: string
  summary: string
  bullets: string[]
  stack: string[]
}

export type Trophy = {
  title: string
  metric: string
  context: string
}

export type NpcId = 'wandering-bard' | 'curator'

export type NpcContent = {
  id: NpcId
  name: string
  hint: string
  lines: string[]
}

export type ProjectDomain = 'web3' | 'gamedev'

export type ProjectLink = { label: string; href: string }

export type Project = {
  id: string
  name: string
  domain: ProjectDomain
  tagline: string
  role: string
  period: string
  stack: string[]
  link?: ProjectLink
  pitch: string
  contributions: string[]
}

export type ContactItem = {
  label: string
  value: string
  href: string
  icon: string
}

export type ControlLegendItem = { key: string; label: string }
