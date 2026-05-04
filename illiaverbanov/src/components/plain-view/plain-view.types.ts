import type { ComponentType } from 'react'
import type { StationId } from '../../data/types'

export type PlainViewProps = {
  onSwitchView: () => void
}

export type SectionId = StationId | 'portfolio'

export type SectionDescriptor = {
  id: SectionId
  title: string
  Panel: ComponentType
}
