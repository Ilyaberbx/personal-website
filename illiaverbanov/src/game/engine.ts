import type { StationId } from '../data/types'
import { STATIONS } from '../data/stations'
import { createPlayer, updatePlayer, type PlayerState } from './player'
import { computeCamera, renderWorld } from './renderer'
import { findFocus, isSameFocus, type WorldFocus } from './world'
import { Input } from './input'
import { TILE_SIZE } from './tiles'
import { MAP_HEIGHT, MAP_WIDTH, NPC_POSITION } from './map'

export const VIEW_W = 320
export const VIEW_H = 180

const MAX_FRAME_SECONDS = 1 / 30
const STATION_HEAD_TILE_OFFSET = 1

export type EngineState = {
  ready: boolean
  modal: { kind: 'station'; id: StationId } | { kind: 'npc' } | null
  focus: WorldFocus
}

type Listener = () => void

export class Engine {
  player: PlayerState
  state: EngineState
  input: Input
  private ctx: CanvasRenderingContext2D | null = null
  private rafId = 0
  private lastTime = 0
  private listeners = new Set<Listener>()
  private offAction: () => void = () => {}
  private offClose: () => void = () => {}

  constructor() {
    this.player = createPlayer()
    this.state = { ready: false, modal: null, focus: null }
    this.input = new Input()
  }

  attach(canvas: HTMLCanvasElement) {
    canvas.width = VIEW_W
    canvas.height = VIEW_H
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('unreachable: canvas 2d context guaranteed by mount')
    ctx.imageSmoothingEnabled = false
    this.ctx = ctx
    this.input.install()
    this.offAction = this.input.onAction(() => this.handleAction())
    this.offClose = this.input.onClose(() => this.handleClose())
    this.state = { ...this.state, ready: true }
    this.notify()
    this.lastTime = performance.now()
    this.rafId = requestAnimationFrame(this.tickFrame)
  }

  detach() {
    if (this.rafId) cancelAnimationFrame(this.rafId)
    this.rafId = 0
    this.offAction()
    this.offClose()
    this.input.uninstall()
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

  private tickFrame = (now: number) => {
    const frameDeltaSeconds = (now - this.lastTime) / 1000
    const clampedDeltaSeconds = Math.min(frameDeltaSeconds, MAX_FRAME_SECONDS)
    this.lastTime = now
    this.tick(clampedDeltaSeconds)
    this.draw()
    this.rafId = requestAnimationFrame(this.tickFrame)
  }

  private tick(dt: number) {
    if (this.state.modal) return
    const dir = this.input.getDir()
    updatePlayer(this.player, dt, dir)
    const focus = findFocus(this.player)
    const focusUnchanged = isSameFocus(this.state.focus, focus)
    if (focusUnchanged) return
    this.setState({ focus })
  }

  private draw() {
    if (!this.ctx) return
    const camera = computeCamera(this.player, VIEW_W, VIEW_H)
    const highlightStationId =
      this.state.focus?.kind === 'station' ? this.state.focus.id : null
    const npcFocused = this.state.focus?.kind === 'npc'
    renderWorld(this.ctx, this.player, camera, highlightStationId, npcFocused)
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

  private viewToTile(viewX: number, viewY: number) {
    const camera = computeCamera(this.player, VIEW_W, VIEW_H)
    const worldX = camera.x + viewX
    const worldY = camera.y + viewY
    return { tx: Math.floor(worldX / TILE_SIZE), ty: Math.floor(worldY / TILE_SIZE) }
  }

  pickAt(viewX: number, viewY: number): { kind: 'station'; id: StationId } | { kind: 'npc' } | null {
    const { tx, ty } = this.viewToTile(viewX, viewY)
    for (const [id, station] of Object.entries(STATIONS) as [StationId, (typeof STATIONS)[StationId]][]) {
      const isStationFootprint = station.x === tx && station.y === ty
      const isStationHead = station.x === tx && station.y - STATION_HEAD_TILE_OFFSET === ty
      if (isStationFootprint || isStationHead) return { kind: 'station', id }
    }
    const isNpcTile = NPC_POSITION.x === tx && NPC_POSITION.y === ty
    if (isNpcTile) return { kind: 'npc' }
    return null
  }

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
