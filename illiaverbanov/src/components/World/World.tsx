import type { CSSProperties, ComponentType } from 'react'
import { getStationContent, UI_COPY, WANDERING_BARD } from '../../data'
import type { PanelKey } from '../../data/types'
import { VIEW_H, VIEW_W } from '../../game/engine'
import { DialogBox } from '../DialogBox'
import { HUD } from '../HUD'
import { NpcModal } from '../NpcModal'
import { StationModal } from '../StationModal'
import { TouchPad } from '../TouchPad'
import { AboutPanel } from '../stations/AboutPanel'
import { ContactPanel } from '../stations/ContactPanel'
import { ExperiencePanel } from '../stations/ExperiencePanel'
import { SkillsPanel } from '../stations/SkillsPanel'
import { TrophiesPanel } from '../stations/TrophiesPanel'
import { useWorld } from './use-world'
import styles from './world.module.css'

const PANEL_BY_KEY: Record<PanelKey, ComponentType> = {
  about: AboutPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  trophies: TrophiesPanel,
  contact: ContactPanel,
}

const VIEW_CSS_VARS = {
  ['--view-w']: VIEW_W,
  ['--view-h']: VIEW_H,
} as CSSProperties

export function World() {
  const { canvasRef, modal, focus, pointerHandlers, closeModal } = useWorld()

  const stationFocus = focus?.kind === 'station' ? getStationContent(focus.id) : null
  const isNpcFocused = focus?.kind === 'npc'
  const isStationModal = modal?.kind === 'station'
  const isNpcModal = modal?.kind === 'npc'

  return (
    <div className={`${styles.world} scanlines`}>
      <HUD />

      <div className={styles.viewport}>
        <canvas
          ref={canvasRef}
          width={VIEW_W}
          height={VIEW_H}
          className={styles.canvas}
          style={VIEW_CSS_VARS}
          aria-label={UI_COPY.world.canvasAria}
          tabIndex={0}
          {...pointerHandlers}
        />

        {!modal && stationFocus && (
          <DialogBox label={stationFocus.label} hint={stationFocus.hint} variant="station" />
        )}
        {!modal && isNpcFocused && (
          <DialogBox label={WANDERING_BARD.name} hint={WANDERING_BARD.hint} variant="npc" />
        )}

        <div className={styles.hint} aria-hidden={!!modal}>
          {UI_COPY.world.hintDesktop}
        </div>
        <div className={styles.hintTouch} aria-hidden={!!modal}>
          {UI_COPY.world.hintTouch}
        </div>
      </div>

      <TouchPad />

      {isStationModal && <StationModalForId id={modal.id} onClose={closeModal} />}

      {isNpcModal && <NpcModal onClose={closeModal} />}
    </div>
  )
}

type StationModalForIdProps = {
  id: PanelKey
  onClose: () => void
}

function StationModalForId({ id, onClose }: StationModalForIdProps) {
  const content = getStationContent(id)
  const Panel = PANEL_BY_KEY[content.panel]
  return (
    <StationModal title={content.modalTitle} onClose={onClose}>
      <Panel />
    </StationModal>
  )
}
