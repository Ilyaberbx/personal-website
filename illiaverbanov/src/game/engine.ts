import { createPlayer, updatePlayer, type PlayerState } from './player'
import { computeCamera, renderWorld } from './renderer'
import { findFocus, type WorldFocus } from './world'
import { getDir, installInput, onAction, onClose, uninstallInput } from './input'
import { TILE_SIZE } from './tiles'
import { MAP_HEIGHT, MAP_WIDTH, NPC, STATIONS, type StationId } from '../data/map'

// Logical render resolution (independent of CSS pixel size).
// Smaller = bigger pixels (more zoomed in). 320x180 gives ~20x11 tiles visible
// — comfortable on desktop, scales down nicely on phones.
export const VIEW_W = 320
export const VIEW_H = 180

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
    const ctx = canvas.getContext('2d')!
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
      const dt = Math.min(dtRaw, 1 / 30) // clamp huge gaps
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
    const prev = this.state.focus
    const same =
      (prev?.kind === 'station' && focus?.kind === 'station' && prev.id === focus.id) ||
      (prev?.kind === 'npc' && focus?.kind === 'npc') ||
      (prev === null && focus === null)
    if (!same) this.setState({ focus })
  }

  private draw() {
    if (!this.ctx) return
    const cam = computeCamera(this.player, VIEW_W, VIEW_H)
    renderWorld(
      this.ctx,
      this.player,
      cam,
      this.state.focus?.kind === 'station' ? this.state.focus.id : null,
      this.state.focus?.kind === 'npc',
    )
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
    for (const s of STATIONS) {
      if (s.x === tx && (s.y === ty || s.y - 1 === ty)) {
        return { kind: 'station', id: s.id }
      }
    }
    if (NPC.x === tx && NPC.y === ty) return { kind: 'npc' }
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
