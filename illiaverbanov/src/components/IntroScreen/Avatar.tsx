import { PixelArt } from '../shared/PixelArt'
import { AVATAR_COLORS, AVATAR_DROP_SHADOW, AVATAR_GRID, AVATAR_PX } from './intro-screen.constants'

export function Avatar() {
  return (
    <PixelArt
      grid={AVATAR_GRID}
      colors={AVATAR_COLORS}
      px={AVATAR_PX}
      dropShadow={AVATAR_DROP_SHADOW}
    />
  )
}
