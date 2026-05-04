import { getVoxelModelForFocus } from '../../game/voxel/voxel-registry'
import { PixelWindow } from '../shared/PixelWindow'
import { VoxelHero } from '../shared/voxel-hero/VoxelHero'
import shell from '../station-modal/station-modal.module.css'
import { PROJECT_MODAL_WIDTH, CONTRIBUTIONS_TITLE } from './project-modal.constants'
import { useProjectModal } from './use-project-modal'
import type { ProjectModalProps } from './project-modal.types'
import styles from './project-modal.module.css'

export function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const { project } = useProjectModal(projectId)
  const voxelModel = getVoxelModelForFocus({ kind: 'sculpture', projectId })
  const title = project?.name ?? 'Project'

  return (
    <div className={shell.backdrop} onClick={onClose}>
      <div className={shell.stop} onClick={(e) => e.stopPropagation()}>
        <PixelWindow title={title} onClose={onClose} width={PROJECT_MODAL_WIDTH}>
          <div className={shell.body}>
            {voxelModel && <VoxelHero model={voxelModel} />}
            {!project && <p className={styles.empty}>Project not found.</p>}
            {project && (
              <>
                <header className={styles.head}>
                  <h3 className={styles.name}>{project.name}</h3>
                  <p className={styles.tagline}>{project.tagline}</p>
                </header>

                <div className={styles.meta}>
                  <span>
                    <span className={styles.metaLabel}>Role:</span>
                    {project.role}
                  </span>
                </div>

                <p>{project.pitch}</p>

                <h4>{CONTRIBUTIONS_TITLE}</h4>
                <ul>
                  {project.contributions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>

                <div className={styles.stack}>
                  {project.stack.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    className={styles.link}
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {project.link.label}
                  </a>
                )}
              </>
            )}
          </div>
        </PixelWindow>
      </div>
    </div>
  )
}
