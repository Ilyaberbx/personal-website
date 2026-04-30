export const CUP_PX = 4

// 12x12 pixel cup
export const CUP_GRID = [
  'YYYYYYYY....',
  'YKKKKKKKY...',
  'YKYYYYYYK...',
  'YKYYYYYYK.YY',
  'YKYYYYYYKYYY',
  'YKYYYYYYK.YY',
  'YKYYYYYYK...',
  '.YKKKKKKY...',
  '..YYYYYY....',
  '..YKKKKKY...',
  '.YYYYYYYYY..',
  '.KKKKKKKKK..',
] as const

export const CUP_COLORS = {
  '.': 'transparent',
  Y: 'var(--c-primary)',
  K: '#0e0a1d',
} as const

export const TROPHIES_INTRO = 'Notable achievements collected along the way.'
