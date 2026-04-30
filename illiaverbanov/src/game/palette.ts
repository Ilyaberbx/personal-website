// Custom 5-color pixel palette.
export const PAL = {
  bg: '#242038',
  primary: '#9067C6',
  secondary: '#8D86C9',
  border: '#CAC4CE',
  text: '#F7ECE1',
} as const

// Extended derived shades (used only for canvas sprites; CSS uses --c-* vars).
export const SHADE = {
  bgDark: '#16132a',
  bgMid: '#1c1830',
  primaryDark: '#5d3f93',
  primaryLight: '#b394d8',
  secondaryDark: '#5e58a4',
  borderDim: '#9b94a3',
  shadow: 'rgba(0,0,0,0.55)',
  // Accent colors used sparingly for tiles/sprites (still palette-aligned)
  grass: '#3a3055',
  grassAlt: '#312957',
  grassEdge: '#4d4170',
  pathLight: '#a59cb6',
  pathDark: '#6d6386',
  water: '#4a3a82',
  waterDeep: '#33277a',
  treeBark: '#3a2a55',
  treeLeaf: '#6a4ea6',
  treeLeafLight: '#8d77c6',
  flowerYellow: '#f7e1a1',
  flowerPink: '#d889c9',
  // Used for sprite blacks (eyes, outline)
  ink: '#0e0a1d',
} as const

export type PaletteKey = keyof typeof PAL | keyof typeof SHADE
