import { describe, it, expect, beforeEach } from 'vitest'
import { Input } from './input'

function makeTarget(): EventTarget {
  return document.createElement('div')
}

function fireKeyDown(target: EventTarget, code: string, metaKey = false) {
  target.dispatchEvent(
    new KeyboardEvent('keydown', { code, bubbles: true, metaKey }),
  )
}

function fireKeyUp(target: EventTarget, code: string) {
  target.dispatchEvent(new KeyboardEvent('keyup', { code, bubbles: true }))
}

describe('Input class', () => {
  let target: EventTarget
  let input: Input

  beforeEach(() => {
    target = makeTarget()
    input = new Input(target)
    input.install()
  })

  it('fires action exactly once on first press, not on repeat', () => {
    let count = 0
    input.onAction(() => { count++ })
    fireKeyDown(target, 'Space')
    fireKeyDown(target, 'Space')
    expect(count).toBe(1)
  })

  it('fires action again after key release', () => {
    let count = 0
    input.onAction(() => { count++ })
    fireKeyDown(target, 'Space')
    fireKeyUp(target, 'Space')
    fireKeyDown(target, 'Space')
    expect(count).toBe(2)
  })

  it('filters meta-key-modified events', () => {
    let count = 0
    input.onAction(() => { count++ })
    fireKeyDown(target, 'Space', true)
    expect(count).toBe(0)
  })

  it('getDir returns dpad over joystick and keyboard', () => {
    fireKeyDown(target, 'ArrowUp')
    input.setJoystickDir('down')
    input.setDpadDir('left')
    expect(input.getDir()).toBe('left')
  })

  it('getDir returns joystick over keyboard when no dpad', () => {
    fireKeyDown(target, 'ArrowUp')
    input.setJoystickDir('down')
    expect(input.getDir()).toBe('down')
  })

  it('getDir returns keyboard direction when no dpad or joystick', () => {
    fireKeyDown(target, 'ArrowUp')
    expect(input.getDir()).toBe('up')
  })

  it('getDir returns null when nothing pressed', () => {
    expect(input.getDir()).toBeNull()
  })

  it('uninstall clears held keys so getDir returns null', () => {
    fireKeyDown(target, 'ArrowUp')
    input.uninstall()
    expect(input.getDir()).toBeNull()
  })

  it('uninstall clears dpad and joystick dirs', () => {
    input.setDpadDir('left')
    input.setJoystickDir('right')
    input.uninstall()
    expect(input.getDir()).toBeNull()
  })

  it('uninstall removes listeners so subsequent key events do not fire action', () => {
    let count = 0
    input.onAction(() => { count++ })
    input.uninstall()
    fireKeyDown(target, 'Space')
    expect(count).toBe(0)
  })

  it('onAction returns an unsubscribe function', () => {
    let count = 0
    const off = input.onAction(() => { count++ })
    off()
    fireKeyDown(target, 'Space')
    expect(count).toBe(0)
  })

  it('onClose fires when close key is pressed', () => {
    let fired = false
    input.onClose(() => { fired = true })
    fireKeyDown(target, 'Escape')
    expect(fired).toBe(true)
  })

  it('fireAction fires all action listeners', () => {
    let count = 0
    input.onAction(() => { count++ })
    input.onAction(() => { count++ })
    input.fireAction()
    expect(count).toBe(2)
  })

  it('fireClose fires all close listeners', () => {
    let count = 0
    input.onClose(() => { count++ })
    input.fireClose()
    expect(count).toBe(1)
  })
})
