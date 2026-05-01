import type { ComponentType } from 'react'
import type { StationId } from '../../data/types'

export type PlainViewProps = {
  onSwitchView: () => void
}

export type SectionDescriptor = {
  id: StationId
  title: string
  Panel: ComponentType
}
