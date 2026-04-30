import type { ComponentType } from 'react'
import type { PanelKey } from '../../data/types'

export type PlainViewProps = {
  onSwitchView: () => void
}

export type SectionDescriptor = {
  id: PanelKey
  title: string
  Panel: ComponentType
}
