import type { Education, Language, Profile } from './types'

export const profile: Profile = {
  name: 'Illia Verbanov',
  title: 'Fullstack Web3 / Blockchain Engineer',
  location: 'Burgas, Bulgaria',
  email: 'ilyaberbx@gmail.com',
  phone: '+380 99 454 0187',
  links: {
    linkedin: 'https://www.linkedin.com/in/illia-verbanov/',
    telegram: 'https://t.me/ilyaberbx',
    github: 'https://github.com/ilyaberbx',
  },
  summary:
    "Blockchain / .NET developer with hands-on backend and smart-contract experience. Nearly a year in .NET (ASP.NET, C#, PostgreSQL, Redis, Azure, CI/CD) and almost two years in blockchain. Strong skills in API design, auth, and scalable architecture. Earlier 4 years in Unity (C#, multiplayer, LiveOps, 10M+ downloads) provided a solid software-engineering foundation, now applied to backend and Web3 work.",
  level: 7,
  xpYears: 4,
}

export const languages: Language[] = [
  { name: 'Ukrainian', level: 'Native' },
  { name: 'English', level: 'B2' },
]

export const education: Education = {
  school: 'Odessa Polytechnic National University',
  degree: "Bachelor's, Software Engineering",
  period: '2022 – 2026',
}
