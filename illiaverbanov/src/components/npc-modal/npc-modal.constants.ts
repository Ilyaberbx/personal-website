export const BARD_PX = 5

// 16x16 NPC face matching the in-world sprite.
export const BARD_GRID = [
  '....HHHHHHHH....',
  '...HPPPPPPPPH...',
  '...HSSSSSSSSh...',
  '...SSSSSSSSSS...',
  '...SKSSSSKSSS...',
  '...SSSSSSSSSS...',
  '...SBBSSSSBSS...',
  '...XBBBBBBBBX...',
  '..CCCCCCCCCCCC..',
  '..CCCCCCCCCCWWC.',
  '..CCCCCCCCCWYWC.',
  '..CCCCCCCCCWWWC.',
  '..CCCCCCCCCCCCC.',
  '..DDDDDDDDDDDDD.',
  '...KKKK....KKKK.',
  '...KKKK....KKKK.',
] as const

export const BARD_COLORS = {
  '.': 'transparent',
  H: 'var(--c-bg-dark)',
  P: 'var(--c-secondary)',
  h: 'var(--c-bg-dark)',
  S: 'var(--c-text)',
  K: '#0e0a1d',
  B: 'var(--c-border)',
  X: 'var(--c-border)',
  C: 'var(--c-secondary)',
  D: 'var(--c-primary-dark)',
  W: '#3a2a55',
  Y: 'var(--c-primary)',
} as const

export const NPC_MODAL_WIDTH = 620

export const ADVANCE_KEY_CODES = new Set<string>(['Space', 'Enter', 'KeyE'])
