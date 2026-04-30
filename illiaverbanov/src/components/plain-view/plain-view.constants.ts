import { AboutPanel } from '../stations/about-panel'
import { ContactPanel } from '../stations/contact-panel'
import { ExperiencePanel } from '../stations/experience-panel'
import { SkillsPanel } from '../stations/skills-panel'
import { TrophiesPanel } from '../stations/trophies-panel'
import type { SectionDescriptor } from './plain-view.types'

export const SECTIONS: readonly SectionDescriptor[] = [
  { id: 'about', title: 'About', Panel: AboutPanel },
  { id: 'skills', title: 'Skills', Panel: SkillsPanel },
  { id: 'experience', title: 'Experience', Panel: ExperiencePanel },
  { id: 'trophies', title: 'Trophies', Panel: TrophiesPanel },
  { id: 'contact', title: 'Contact', Panel: ContactPanel },
]
