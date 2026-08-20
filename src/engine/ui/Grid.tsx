import { forwardRef, type HTMLAttributes } from 'react'

type GridProps = HTMLAttributes<HTMLDivElement> & {
  /** Explicit track definition wins; otherwise an equal N-column grid. */
  cols?: number | string
  rows?: string
  gap?: number | string
  as?: 'div' | 'ul' | 'ol'
}

/** CSS Grid for every multi-column layout. No flexbox percentage math. */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { cols = 2, rows, gap = 14, as = 'div', style, ...rest },
  ref,
) {
  const Tag = as as 'div'
  return (
    <Tag
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: typeof cols === 'number' ? `repeat(${cols}, minmax(0, 1fr))` : cols,
        gridTemplateRows: rows,
        gap,
        minWidth: 0,
        ...(as !== 'div' ? { listStyle: 'none', margin: 0, padding: 0 } : null),
        ...style,
      }}
      {...rest}
    />
  )
})
