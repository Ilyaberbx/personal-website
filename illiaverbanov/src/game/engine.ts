import type { StationId } from '../data/types'
import { createPlayer, updatePlayer, type PlayerState } from './player'
import { computeCamera, renderWorld } from './renderer'
import { findFocus, isSameFocus, type WorldFocus } from './world'
import { getDir, installInput, onAction, onClose, uninstallInput } from './input'
import { TILE_SIZE } from './tiles'
import { MAP_HEIGHT, MAP_WIDTH, NPC_POSITION, STATION_IDS, STATION_POSITIONS } from './map'

// Logical render resolution (independent of CSS pixel size).
// Smaller = bigger pixels (more zoomed in). 320x180 gives ~20x11 tiles visible
// — comfortable on desktop, scales down nicely on phones.
export const VIEW_W = 320
export const VIEW_H = 180

const MAX_FRAME_DT = 1 / 30 // clamp huge gaps
const STATION_FOOTPRINT_TILE_OFFSET = 1 // sprite head occupies the tile above the footprint

export type EngineState = {
  ready: boolean
  modal: { kind: 'station'; id: StationId } | { kind: 'npc' } | null
  focus: WorldFocus
}

type Listener = () => void

export class Engine {
  player: PlayerState
  state: EngineState
  private ctx: CanvasRenderingContext2D | null = null
  private rafId = 0
  private lastTime = 0
  private listeners = new Set<Listener>()
  private offAction: () => void = () => {}
  private offClose: () => void = () => {}

  constructor() {
    this.player = createPlayer()
    this.state = { ready: false, modal: null, focus: null }
  }

  attach(canvas: HTMLCanvasElement) {
    canvas.width = VIEW_W
    canvas.height = VIEW_H
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('unreachable: canvas 2d context guaranteed by mount')
    ctx.imageSmoothingEnabled = false
    this.ctx = ctx
    installInput()
    this.offAction = onAction(() => this.handleAction())
    this.offClose = onClose(() => this.handleClose())
    this.state = { ...this.state, ready: true }
    this.notify()
    this.lastTime = performance.now()
    const loop = (t: number) => {
      const dtRaw = (t - this.lastTime) / 1000
      const dt = Math.min(dtRaw, MAX_FRAME_DT)
      this.lastTime = t
      this.tick(dt)
      this.draw()
      this.rafId = requestAnimationFrame(loop)
    }
    this.rafId = requestAnimationFrame(loop)
  }

  detach() {
    if (this.rafId) cancelAnimationFrame(this.rafId)
    this.rafId = 0
    this.offAction()
    this.offClose()
    uninstallInput()
    this.ctx = null
  }

  subscribe(l: Listener): () => void {
    this.listeners.add(l)
    return () => this.listeners.delete(l)
  }

  getSnapshot = (): EngineState => this.state

  private notify() {
    this.listeners.forEach((l) => l())
  }

  private setState(patch: Partial<EngineState>) {
    this.state = { ...this.state, ...patch }
    this.notify()
  }

  private tick(dt: number) {
    if (this.state.modal) return // freeze world while reading
    const dir = getDir()
    updatePlayer(this.player, dt, dir)
    const focus = findFocus(this.player)
    const focusUnchanged = isSameFocus(this.state.focus, focus)
    if (focusUnchanged) return
    this.setState({ focus })
  }

  private draw() {
    if (!this.ctx) return
    const cam = computeCamera(this.player, VIEW_W, VIEW_H)
    const highlightStationId =
      this.state.focus?.kind === 'station' ? this.state.focus.id : null
    const npcFocused = this.state.focus?.kind === 'npc'
    renderWorld(this.ctx, this.player, cam, highlightStationId, npcFocused)
  }

  private handleAction() {
    if (this.state.modal) return
    const f = this.state.focus
    if (!f) return
    if (f.kind === 'station') this.setState({ modal: { kind: 'station', id: f.id } })
    else this.setState({ modal: { kind: 'npc' } })
  }

  private handleClose() {
    if (this.state.modal) this.setState({ modal: null })
  }

  closeModal() {
    this.handleClose()
  }

  // Convert canvas-logical coordinates (0..VIEW_W, 0..VIEW_H) into a world tile.
  private viewToTile(viewX: number, viewY: number) {
    const cam = computeCamera(this.player, VIEW_W, VIEW_H)
    const wx = cam.x + viewX
    const wy = cam.y + viewY
    return { tx: Math.floor(wx / TILE_SIZE), ty: Math.floor(wy / TILE_SIZE) }
  }

  // Resolve a tap on the canvas. Stations are 32x32 sprites occupying the
  // station tile and the tile directly above (visual head). NPC is 16x16.
  pickAt(viewX: number, viewY: number): { kind: 'station'; id: StationId } | { kind: 'npc' } | null {
    const { tx, ty } = this.viewToTile(viewX, viewY)
    for (const id of STATION_IDS) {
      const pos = STATION_POSITIONS[id]
      const isStationFootprint = pos.x === tx && pos.y === ty
      const isStationHead = pos.x === tx && pos.y - STATION_FOOTPRINT_TILE_OFFSET === ty
      if (isStationFootprint || isStationHead) return { kind: 'station', id }
    }
    const isNpcTile = NPC_POSITION.x === tx && NPC_POSITION.y === ty
    if (isNpcTile) return { kind: 'npc' }
    return null
  }

  // Open a modal directly from a tap, regardless of player position.
  tapInteract(viewX: number, viewY: number): boolean {
    if (this.state.modal) return false
    const hit = this.pickAt(viewX, viewY)
    if (!hit) return false
    this.setState({ modal: hit })
    return true
  }
}

export function clampWorld(x: number, y: number) {
  return {
    x: Math.max(0, Math.min(MAP_WIDTH * TILE_SIZE, x)),
    y: Math.max(0, Math.min(MAP_HEIGHT * TILE_SIZE, y)),
  }
}
