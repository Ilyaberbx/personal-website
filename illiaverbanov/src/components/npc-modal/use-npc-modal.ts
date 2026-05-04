import { useEffect, useState } from 'react'
import { NPCS, profile } from '../../data'
import type { NpcId } from '../../data/types'
import { ADVANCE_KEYS } from '../../game/input-config'

function isAdvanceKey(code: string): boolean {
  return ADVANCE_KEYS.has(code)
}

function buildLines(npcId: NpcId): string[] {
  const npc = NPCS[npcId]
  if (npcId === 'wandering-bard') return [...npc.lines, profile.summary]
  return [...npc.lines]
}

export function useNpcModal(npcId: NpcId, onClose: () => void) {
  const [step, setStep] = useState(0)
  const npc = NPCS[npcId]
  const lines = buildLines(npcId)
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
    npcName: npc.name,
    advance,
  }
}
