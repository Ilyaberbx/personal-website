import type { CSSProperties } from 'react'
import { STATIONS, UI_COPY, WANDERING_BARD } from '../../data'
import type { StationId } from '../../data/types'
import { VIEW_H, VIEW_W } from '../../game/engine'
import { DialogBox } from '../dialog-box'
import { HUD } from '../hud'
import { NpcModal } from '../npc-modal'
import { StationModal } from '../station-modal'
import { TouchPad } from '../touch-pad'
import { useWorld } from './use-world'
import styles from './world.module.css'

const VIEW_CSS_VARS = {
  ['--view-w']: VIEW_W,
  ['--view-h']: VIEW_H,
} as CSSProperties

type Props = {
  onSwitchView: () => void
}

export function World({ onSwitchView }: Props) {
  const { engine, canvasRef, modal, focus, pointerHandlers, closeModal } = useWorld()

  const stationFocus = focus?.kind === 'station' ? STATIONS[focus.id] : null
  const doorFocus = focus?.kind === 'door' ? focus : null
  const isNpcFocused = focus?.kind === 'npc'
  const isStationModal = modal?.kind === 'station'
  const isNpcModal = modal?.kind === 'npc'

  return (
    <div className={`${styles.world} scanlines`}>
      <HUD onSwitchView={onSwitchView} />

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
        {!modal && doorFocus && (
          <DialogBox label={doorFocus.label} hint={doorFocus.hint} variant="station" />
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

      <TouchPad engine={engine} />

      {isStationModal && <StationModalForId id={modal.id} onClose={closeModal} />}

      {isNpcModal && <NpcModal onClose={closeModal} />}
    </div>
  )
}

type StationModalForIdProps = {
  id: StationId
  onClose: () => void
}

function StationModalForId({ id, onClose }: StationModalForIdProps) {
  const station = STATIONS[id]
  const Panel = station.Panel
  return (
    <StationModal title={station.modalTitle} stationId={id} onClose={onClose}>
      <Panel />
    </StationModal>
  )
}
