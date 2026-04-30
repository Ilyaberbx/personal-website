type ViewToggleTarget = 'game' | 'plain'

type Props = {
  target: ViewToggleTarget
  onClick: () => void
  className?: string
}

const ICON_BY_TARGET: Record<ViewToggleTarget, string> = {
  game: '🎮',
  plain: '📄',
}

const LABEL_BY_TARGET: Record<ViewToggleTarget, string> = {
  game: 'Play game',
  plain: 'Plain view',
}

export function ViewToggle({ target, onClick, className = '' }: Props) {
  const icon = ICON_BY_TARGET[target]
  const label = LABEL_BY_TARGET[target]
  return (
    <button
      type="button"
      className={`view-toggle ${className}`}
      onClick={onClick}
      aria-label={`Switch to ${label}`}
    >
      <span className="view-toggle__icon" aria-hidden="true">{icon}</span>
      <span className="view-toggle__label">{label}</span>
    </button>
  )
}
