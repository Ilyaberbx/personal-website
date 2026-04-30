import { safeVibrate } from './safe-vibrate'

export type Dir = 'up' | 'down' | 'left' | 'right' | null

const keysDown = new Set<string>()
let dpadDir: Dir = null
let joystickDir: Dir = null
const actionListeners = new Set<() => void>()
const closeListeners = new Set<() => void>()

const KEY_MAP: Record<string, Dir | 'action' | 'close'> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyW: 'up',
  KeyA: 'left',
  KeyS: 'down',
  KeyD: 'right',
  KeyE: 'action',
  Space: 'action',
  Enter: 'action',
  Escape: 'close',
}

function onKeyDown(e: KeyboardEvent) {
  const intent = KEY_MAP[e.code]
  if (!intent) return
  e.preventDefault()
  const isFirstPress = !keysDown.has(e.code)
  if (intent === 'action' && isFirstPress) actionListeners.forEach((l) => l())
  else if (intent === 'close' && isFirstPress) closeListeners.forEach((l) => l())
  keysDown.add(e.code)
}

function onKeyUp(e: KeyboardEvent) {
  keysDown.delete(e.code)
}

let isInputInstalled = false

export function installInput() {
  if (isInputInstalled) return
  isInputInstalled = true
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
}

export function uninstallInput() {
  if (!isInputInstalled) return
  isInputInstalled = false
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  keysDown.clear()
  dpadDir = null
  joystickDir = null
}

function readKeyboardDir(): Dir {
  if (keysDown.has('ArrowUp') || keysDown.has('KeyW')) return 'up'
  if (keysDown.has('ArrowDown') || keysDown.has('KeyS')) return 'down'
  if (keysDown.has('ArrowLeft') || keysDown.has('KeyA')) return 'left'
  if (keysDown.has('ArrowRight') || keysDown.has('KeyD')) return 'right'
  return null
}

export function getDir(): Dir {
  return dpadDir ?? joystickDir ?? readKeyboardDir()
}

export function setDpadDir(d: Dir) {
  dpadDir = d
}

export function setJoystickDir(d: Dir) {
  joystickDir = d
}

export function fireAction() {
  actionListeners.forEach((l) => l())
}

export function fireClose() {
  closeListeners.forEach((l) => l())
}

export function onAction(fn: () => void): () => void {
  actionListeners.add(fn)
  return () => actionListeners.delete(fn)
}

export function onClose(fn: () => void): () => void {
  closeListeners.add(fn)
  return () => closeListeners.delete(fn)
}

export function vibrate(ms = 8) {
  safeVibrate(ms)
}
