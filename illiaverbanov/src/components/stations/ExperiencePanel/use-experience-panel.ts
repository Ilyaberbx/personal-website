import { useState } from 'react'

const FIRST_OPEN_INDEX = 0
const COLLAPSED_INDEX = -1

export function useExperiencePanel() {
  const [openIndex, setOpenIndex] = useState<number>(FIRST_OPEN_INDEX)

  const toggle = (i: number) => {
    const isCurrentlyOpen = openIndex === i
    setOpenIndex(isCurrentlyOpen ? COLLAPSED_INDEX : i)
  }

  return { openIndex, toggle }
}
