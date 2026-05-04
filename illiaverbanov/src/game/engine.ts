import type { StationId } from '../data/types'
import { createPlayer, spawnPlayer, updatePlayer, type PlayerState } from './player'
import { computeCamera, renderWorld, type FocusKindForHighlight } from './renderer'
import { buildRegistry, findFocus, isSameFocus, type WorldFocus } from './world'
import { interactableAt, type InteractableEntry } from './interactable'
import { Input } from './input'
import { TILE_SIZE } from './tiles'
import type { Scene, SceneId, SceneSpawn } from './scenes/types'
import { getScene, INITIAL_SCENE_ID } from './scenes/registry'
import {
  fadeAlpha,
  initialTransition,
  isTransitionActive,
  startTransition,
  tickTransition,
  type TransitionState,
} from './transition'

export const VIEW_W = 320
export const VIEW_H = 180

const MAX_FRAME_SECONDS = 1 / 30

export type EngineModal =
  | { kind: 'station'; id: StationId }
  | { kind: 'npc' }
  | null

export type EngineState = {
  ready: boolean
  modal: EngineModal
  focus: WorldFocus
  activeSceneId: SceneId
}

type Listener = () => void

export class Engine {
  player: PlayerState
  state: EngineState
  input: Input
  private scene: Scene
  private registry: InteractableEntry[]
  private transition: TransitionState
  private ctx: CanvasRenderingContext2D | null = null
  private rafId = 0
  private lastTime = 0
  private listeners = new Set<Listener>()
  private offAction: () => void = () => {}
  private offClose: () => void = () => {}

  constructor() {
    this.scene = getScene(INITIAL_SCENE_ID)
    this.registry = buildRegistry(this.scene)
    this.player = createPlayer(this.scene.spawn)
    this.transition = initialTransition()
    this.state = {
      ready: false,
      modal: null,
      focus: null,
      activeSceneId: this.scene.id,
    }
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
    this.advanceTransition(dt)
    if (this.state.modal) return
    if (isTransitionActive(this.transition)) return
    const dir = this.input.getDir()
    updatePlayer(this.scene, this.player, dt, dir)
    const focus = findFocus(this.player, this.registry)
    const focusUnchanged = isSameFocus(this.state.focus, focus)
    if (focusUnchanged) return
    this.setState({ focus })
  }

  private advanceTransition(dt: number) {
    if (!isTransitionActive(this.transition)) return
    const result = tickTransition(this.transition, dt * 1000)
    this.transition = result.state
    if (result.event.kind === 'apply-scene') {
      this.applyScene(result.event.sceneId, result.event.spawn)
    }
  }

  private applyScene(sceneId: SceneId, spawn: SceneSpawn) {
    this.scene = getScene(sceneId)
    this.registry = buildRegistry(this.scene)
    spawnPlayer(this.player, spawn)
    this.setState({ activeSceneId: this.scene.id, focus: null })
  }

  transitionToScene(targetSceneId: SceneId, targetSpawn: SceneSpawn) {
    const next = startTransition(this.transition, targetSceneId, targetSpawn)
    this.transition = next
  }

  private draw() {
    if (!this.ctx) return
    const camera = computeCamera(this.scene, this.player, VIEW_W, VIEW_H)
    const highlight = this.toHighlight(this.state.focus)
    renderWorld(
      this.ctx,
      this.scene,
      this.player,
      camera,
      highlight,
      fadeAlpha(this.transition),
    )
  }

  private toHighlight(focus: WorldFocus): FocusKindForHighlight {
    if (!focus) return null
    if (focus.kind === 'station') return { kind: 'station', id: focus.id }
    if (focus.kind === 'npc') return { kind: 'npc' }
    return { kind: 'door', targetSceneId: focus.targetSceneId }
  }

  private handleAction() {
    if (this.state.modal) return
    if (isTransitionActive(this.transition)) return
    const f = this.state.focus
    if (!f) return
    if (f.kind === 'station') {
      this.setState({ modal: { kind: 'station', id: f.id } })
      return
    }
    if (f.kind === 'npc') {
      this.setState({ modal: { kind: 'npc' } })
      return
    }
    this.transitionToScene(f.targetSceneId, f.targetSpawn)
  }

  private handleClose() {
    if (this.state.modal) {
      this.setState({ modal: null })
      return
    }
    if (isTransitionActive(this.transition)) return
    const isInsideHall = this.scene.id === 'exhibition-hall'
    if (!isInsideHall) return
    const exitDoor = this.scene.doors[0]
    this.transitionToScene(exitDoor.targetSceneId, exitDoor.targetSpawn)
  }

  closeModal() {
    if (this.state.modal) this.setState({ modal: null })
  }

  private viewToTile(viewX: number, viewY: number) {
    const camera = computeCamera(this.scene, this.player, VIEW_W, VIEW_H)
    const worldX = camera.x + viewX
    const worldY = camera.y + viewY
    return { tx: Math.floor(worldX / TILE_SIZE), ty: Math.floor(worldY / TILE_SIZE) }
  }

  pickAt(viewX: number, viewY: number): WorldFocus {
    const tile = this.viewToTile(viewX, viewY)
    return interactableAt(tile, 'exact', this.registry)
  }

  tapInteract(viewX: number, viewY: number): boolean {
    if (this.state.modal) return false
    if (isTransitionActive(this.transition)) return false
    const hit = this.pickAt(viewX, viewY)
    if (!hit) return false
    if (hit.kind === 'door') {
      this.transitionToScene(hit.targetSceneId, hit.targetSpawn)
      return true
    }
    if (hit.kind === 'station') {
      this.setState({ modal: { kind: 'station', id: hit.id } })
      return true
    }
    this.setState({ modal: { kind: 'npc' } })
    return true
  }
}

export function clampWorld(scene: Scene, x: number, y: number) {
  return {
    x: Math.max(0, Math.min(scene.width * TILE_SIZE, x)),
    y: Math.max(0, Math.min(scene.height * TILE_SIZE, y)),
  }
}
