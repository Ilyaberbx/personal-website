import { safeVibrate } from './safe-vibrate'
import { ACTION_KEYS, CLOSE_KEYS } from './input-config'

export type Dir = 'up' | 'down' | 'left' | 'right' | null

const keysDown = new Set<string>()
let dpadDir: Dir = null
let joystickDir: Dir = null
const actionListeners = new Set<() => void>()
const closeListeners = new Set<() => void>()

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

function onKeyDown(e: KeyboardEvent) {
  const isDirKey = e.code in DIR_KEY_MAP
  const isActionKey = ACTION_KEYS.has(e.code)
  const isCloseKey = CLOSE_KEYS.has(e.code)
  const isKnownKey = isDirKey || isActionKey || isCloseKey
  if (!isKnownKey) return
  e.preventDefault()
  const isFirstPress = !keysDown.has(e.code)
  if (isActionKey && isFirstPress) actionListeners.forEach((l) => l())
  else if (isCloseKey && isFirstPress) closeListeners.forEach((l) => l())
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
