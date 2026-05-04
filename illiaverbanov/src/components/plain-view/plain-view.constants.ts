import { AboutContent } from '../sections/about-content/AboutContent'
import { ContactContent } from '../sections/contact-content/ContactContent'
import { ExperienceContent } from '../sections/experience-content/ExperienceContent'
import { PortfolioContent } from '../sections/portfolio-content/PortfolioContent'
import { SkillsContent } from '../sections/skills-content/SkillsContent'
import { TrophiesContent } from '../sections/trophies-content/TrophiesContent'
import type { SectionDescriptor } from './plain-view.types'

export const SECTIONS: readonly SectionDescriptor[] = [
  { id: 'about', title: 'About', Panel: AboutContent },
  { id: 'skills', title: 'Skills', Panel: SkillsContent },
  { id: 'experience', title: 'Experience', Panel: ExperienceContent },
  { id: 'portfolio', title: 'Portfolio', Panel: PortfolioContent },
  { id: 'trophies', title: 'Trophies', Panel: TrophiesContent },
  { id: 'contact', title: 'Contact', Panel: ContactContent },
]
