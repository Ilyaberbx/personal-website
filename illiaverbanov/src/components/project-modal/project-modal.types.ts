import type { Project } from '../../data/types'

export type ProjectModalProps = {
  projectId: string
  onClose: () => void
}

export type ProjectModalViewModel = {
  project: Project | null
}
