import { type HTMLAttributes, forwardRef } from 'react'

type GridLayoutProps = HTMLAttributes<HTMLDivElement> & {
  cols?: number
  gap?: number
}

export const GridLayout = forwardRef<HTMLDivElement, GridLayoutProps>(
  ({ cols = 2, gap = 6, style, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: `${gap * 4}px`,
          width: '100%',
          ...style,
        }}
        {...rest}
      />
    )
  },
)

GridLayout.displayName = 'GridLayout'