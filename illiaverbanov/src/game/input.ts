import { safeVibrate } from './safe-vibrate'
import { ACTION_KEYS, CLOSE_KEYS, META_KEYS } from './input-config'

export type Dir = 'up' | 'down' | 'left' | 'right' | null

type DirKey = 'up' | 'down' | 'left' | 'right'

const DIR_KEY_MAP: Record<string, DirKey> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyW: 'up',
  KeyA: 'left',
  KeyS: 'down',
  KeyD: 'right',
}

export class Input {
  private target: EventTarget
  private keysDown = new Set<string>()
  private dpadDir: Dir = null
  private joystickDir: Dir = null
  private actionListeners = new Set<() => void>()
  private closeListeners = new Set<() => void>()
  private installed = false

  constructor(target: EventTarget = window) {
    this.target = target
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  private onKeyDown(e: Event) {
    const ke = e as KeyboardEvent
    const isMetaModified = ke.metaKey
    if (isMetaModified) return

    const isDirKey = ke.code in DIR_KEY_MAP
    const isActionKey = ACTION_KEYS.has(ke.code)
    const isCloseKey = CLOSE_KEYS.has(ke.code)
    const isMetaKey = META_KEYS.has(ke.code)
    const isKnownKey = isDirKey || isActionKey || isCloseKey || isMetaKey
    if (!isKnownKey) return

    e.preventDefault()
    const isFirstPress = !this.keysDown.has(ke.code)
    if (isActionKey && isFirstPress) this.actionListeners.forEach((l) => l())
    else if (isCloseKey && isFirstPress) this.closeListeners.forEach((l) => l())
    this.keysDown.add(ke.code)
  }

  private onKeyUp(e: Event) {
    this.keysDown.delete((e as KeyboardEvent).code)
  }

  install() {
    if (this.installed) return
    this.installed = true
    this.target.addEventListener('keydown', this.onKeyDown)
    this.target.addEventListener('keyup', this.onKeyUp)
  }

  uninstall() {
    if (!this.installed) return
    this.installed = false
    this.target.removeEventListener('keydown', this.onKeyDown)
    this.target.removeEventListener('keyup', this.onKeyUp)
    this.keysDown.clear()
    this.dpadDir = null
    this.joystickDir = null
  }

  private readKeyboardDir(): Dir {
    if (this.keysDown.has('ArrowUp') || this.keysDown.has('KeyW')) return 'up'
    if (this.keysDown.has('ArrowDown') || this.keysDown.has('KeyS')) return 'down'
    if (this.keysDown.has('ArrowLeft') || this.keysDown.has('KeyA')) return 'left'
    if (this.keysDown.has('ArrowRight') || this.keysDown.has('KeyD')) return 'right'
    return null
  }

  getDir(): Dir {
    return this.dpadDir ?? this.joystickDir ?? this.readKeyboardDir()
  }

  setDpadDir(d: Dir) {
    this.dpadDir = d
  }

  setJoystickDir(d: Dir) {
    this.joystickDir = d
  }

  fireAction() {
    this.actionListeners.forEach((l) => l())
  }

  fireClose() {
    this.closeListeners.forEach((l) => l())
  }

  onAction(fn: () => void): () => void {
    this.actionListeners.add(fn)
    return () => this.actionListeners.delete(fn)
  }

  onClose(fn: () => void): () => void {
    this.closeListeners.add(fn)
    return () => this.closeListeners.delete(fn)
  }

  vibrate(ms = 8) {
    safeVibrate(ms)
  }
}
