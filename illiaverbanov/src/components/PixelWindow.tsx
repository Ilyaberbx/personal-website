import type { ReactNode } from 'react'

type Props = {
  title?: string
  onClose?: () => void
  children: ReactNode
  className?: string
  width?: number | string
}

export function PixelWindow({ title, onClose, children, className = '', width }: Props) {
  const sizeStyle =
    typeof width === 'number'
      ? { width: '100%', maxWidth: width }
      : { width: width ?? '100%', maxWidth: '100%' }

  return (
    <div
      className={`pixel-window ${className}`}
      style={sizeStyle}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {title && <div className="pixel-window__title">{title}</div>}
      {onClose && (
        <button
          type="button"
          className="pixel-window__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
      {children}
    </div>
  )
}
