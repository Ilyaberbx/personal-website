import { useEffect, useState } from 'react'
import { profile, WANDERING_BARD } from '../../data'
import { ADVANCE_KEY_CODES } from './npc-modal.constants'

function isAdvanceKey(code: string): boolean {
  return ADVANCE_KEY_CODES.has(code)
}

export function useNpcModal(onClose: () => void) {
  const [step, setStep] = useState(0)
  const lines = [...WANDERING_BARD.lines, profile.summary]
  const isLast = step >= lines.length - 1

  function advance() {
    if (isLast) {
      onClose()
      return
    }
    setStep((s) => s + 1)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isAdvanceKey(e.code)) return
      e.preventDefault()
      advance()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLast, onClose])

  return {
    step,
    lines,
    isLast,
    bardName: WANDERING_BARD.name,
    advance,
  }
}
