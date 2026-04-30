// Unified input source. Three independent channels feed `getDir()`:
//   - Keyboard (WASD / arrow keys)
//   - D-pad (held button) on mobile
//   - Joystick (drag-on-canvas) on mobile
//
// Multiple pointers (e.g. D-pad + action button + canvas drag with three
// fingers) work simultaneously because each channel is its own slot and the
// browser routes pointerevents per pointerId.

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
  if (intent === 'action') {
    if (!keysDown.has(e.code)) {
      actionListeners.forEach((l) => l())
    }
  } else if (intent === 'close') {
    if (!keysDown.has(e.code)) {
      closeListeners.forEach((l) => l())
    }
  }
  keysDown.add(e.code)
}

function onKeyUp(e: KeyboardEvent) {
  keysDown.delete(e.code)
}

let installed = false
export function installInput() {
  if (installed) return
  installed = true
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
}

export function uninstallInput() {
  if (!installed) return
  installed = false
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  keysDown.clear()
  dpadDir = null
  joystickDir = null
}

// D-pad takes priority (deliberate user input) over joystick (drag) over
// keyboard. Practically these don't co-occur, but the order is well-defined.
export function getDir(): Dir {
  if (dpadDir) return dpadDir
  if (joystickDir) return joystickDir
  if (keysDown.has('ArrowUp') || keysDown.has('KeyW')) return 'up'
  if (keysDown.has('ArrowDown') || keysDown.has('KeyS')) return 'down'
  if (keysDown.has('ArrowLeft') || keysDown.has('KeyA')) return 'left'
  if (keysDown.has('ArrowRight') || keysDown.has('KeyD')) return 'right'
  return null
}

// ─────────── D-pad channel ───────────
export function setDpadDir(d: Dir) {
  dpadDir = d
}

// ─────────── Joystick channel (canvas drag) ───────────
export function setJoystickDir(d: Dir) {
  joystickDir = d
}

// ─────────── Action / close fire-once events ───────────
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
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(ms)
    } catch {
      // ignore
    }
  }
}
