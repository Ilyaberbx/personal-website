import { projects } from '../../data'
import type { ProjectModalViewModel } from './project-modal.types'

export function useProjectModal(projectId: string): ProjectModalViewModel {
  const project = projects.find((p) => p.id === projectId) ?? null
  return { project }
}
