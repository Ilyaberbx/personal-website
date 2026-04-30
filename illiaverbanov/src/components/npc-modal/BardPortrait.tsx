import { PixelArt } from '../shared/PixelArt'
import { BARD_COLORS, BARD_GRID, BARD_PX } from './npc-modal.constants'

export function BardPortrait() {
  return <PixelArt grid={BARD_GRID} colors={BARD_COLORS} px={BARD_PX} />
}
