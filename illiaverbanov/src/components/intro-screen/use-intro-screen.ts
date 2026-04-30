import { useEffect } from 'react'

const META_KEYS = new Set<string>(['Tab', 'Shift'])

function isMetaKeyboardEvent(e: KeyboardEvent | PointerEvent): boolean {
  if (!('key' in e)) return false
  return META_KEYS.has(e.key)
}

export function useIntroScreen(onStart: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent | PointerEvent) => {
      if (isMetaKeyboardEvent(e)) return
      onStart()
    }
    window.addEventListener('keydown', handler as EventListener)
    window.addEventListener('pointerdown', handler as EventListener)
    return () => {
      window.removeEventListener('keydown', handler as EventListener)
      window.removeEventListener('pointerdown', handler as EventListener)
    }
  }, [onStart])
}
