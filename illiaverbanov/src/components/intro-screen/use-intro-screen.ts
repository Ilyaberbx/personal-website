import { useEffect } from 'react'
import { META_KEYS } from '../../game/input-config'

export type IntroTarget = 'game' | 'plain'

function isMetaKey(key: string): boolean {
  return META_KEYS.has(key)
}

export function useIntroScreen(onEnter: (target: IntroTarget) => void) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isMetaKey(e.key)) return
      const isPlainShortcut = e.key === 'p' || e.key === 'P'
      if (isPlainShortcut) {
        onEnter('plain')
        return
      }
      onEnter('game')
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [onEnter])
}
