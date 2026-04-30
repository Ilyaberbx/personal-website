import type { CSSProperties } from 'react'

type Props = {
  grid: readonly string[]
  colors: Readonly<Record<string, string>>
  px: number
  dropShadow?: string
  ariaLabel?: string
}

const TRANSPARENT = 'transparent'

export function PixelArt({ grid, colors, px, dropShadow, ariaLabel }: Props) {
  const rows = grid.length
  const cols = grid[0]?.length ?? 0

  const containerStyle: CSSProperties = {
    width: cols * px,
    height: rows * px,
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${px}px)`,
    gridTemplateRows: `repeat(${rows}, ${px}px)`,
    filter: dropShadow ? `drop-shadow(${dropShadow})` : undefined,
  }

  return (
    <div style={containerStyle} aria-hidden={!ariaLabel} aria-label={ariaLabel}>
      {grid.flatMap((row, y) =>
        row.split('').map((ch, x) => (
          <div key={`${x}-${y}`} style={{ background: colors[ch] ?? TRANSPARENT }} />
        )),
      )}
    </div>
  )
}
