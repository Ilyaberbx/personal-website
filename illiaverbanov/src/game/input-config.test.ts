import { ACTION_KEYS, ADVANCE_KEYS, CLOSE_KEYS, META_KEYS } from './input-config'

it('ACTION_KEYS contains expected key codes', () => {
  expect(ACTION_KEYS.has('KeyE')).toBe(true)
  expect(ACTION_KEYS.has('Space')).toBe(true)
  expect(ACTION_KEYS.has('Enter')).toBe(true)
})

it('CLOSE_KEYS contains Escape', () => {
  expect(CLOSE_KEYS.has('Escape')).toBe(true)
})

it('ADVANCE_KEYS contains Enter, Space, and KeyE', () => {
  expect(ADVANCE_KEYS.has('Enter')).toBe(true)
  expect(ADVANCE_KEYS.has('Space')).toBe(true)
  expect(ADVANCE_KEYS.has('KeyE')).toBe(true)
})

it('META_KEYS contains modifier keys', () => {
  expect(META_KEYS.has('Meta')).toBe(true)
  expect(META_KEYS.has('Control')).toBe(true)
  expect(META_KEYS.has('Alt')).toBe(true)
  expect(META_KEYS.has('Tab')).toBe(true)
  expect(META_KEYS.has('Shift')).toBe(true)
})
