import { PixelArt } from './PixelArt'

const AVATAR_PX = 6
const AVATAR_DROP_SHADOW = '6px 6px 0 rgba(0,0,0,0.55)'

const AVATAR_GRID = [
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

const AVATAR_COLORS = {
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

type Props = {
  px?: number
}

export function Avatar({ px = AVATAR_PX }: Props = {}) {
  return (
    <PixelArt
      grid={AVATAR_GRID}
      colors={AVATAR_COLORS}
      px={px}
      dropShadow={AVATAR_DROP_SHADOW}
    />
  )
}
