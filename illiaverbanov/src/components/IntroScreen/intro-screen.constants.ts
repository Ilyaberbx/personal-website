export const AVATAR_PX = 6

export const AVATAR_DROP_SHADOW = '6px 6px 0 rgba(0,0,0,0.55)'

// 16x16 grid expressed as a string per row.
// colors: B=bg, S=skin, H=hair, P=primary(violet), D=primaryDark, C=cape(secondary), K=ink, X=skinShadow
export const AVATAR_GRID = [
  '................',
  '................',
  '.....HHHHHH.....',
  '....HSSSSSSH....',
  '....SSSSSSSS....',
  '....SKSSKSSS....',
  '....SSSSSSSS....',
  '....XSSSSSSX....',
  '...SPPPPPPPPS...',
  '...SPPPPPPPPS...',
  '...SPPPPPPPPS...',
  '...SKKKKKKKKS...',
  '....DDDDDDDD....',
  '.....KKKKKK.....',
  '.....KK..KK.....',
  '.....KK..KK.....',
] as const

export const AVATAR_COLORS = {
  '.': 'transparent',
  B: 'var(--c-bg)',
  S: 'var(--c-text)',
  X: 'var(--c-border)',
  H: 'var(--c-bg-dark)',
  P: 'var(--c-primary)',
  D: 'var(--c-primary-dark)',
  C: 'var(--c-secondary)',
  K: '#0e0a1d',
} as const
