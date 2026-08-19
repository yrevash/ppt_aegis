import { forwardRef, type HTMLAttributes } from 'react'

type FlexProps = HTMLAttributes<HTMLDivElement> & {
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between'
  gap?: number
  wrap?: boolean
  grow?: boolean
  as?: 'div' | 'ul' | 'li' | 'dl'
}

const alignMap = { start: 'flex-start', center: 'center', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' }
const justifyMap = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between' }

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { direction = 'row', align = 'stretch', justify = 'start', gap, wrap, grow, as = 'div', style, ...rest },
  ref,
) {
  const Tag = as as 'div'
  return (
    <Tag
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: direction === 'col' ? 'column' : 'row',
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        gap,
        flexWrap: wrap ? 'wrap' : undefined,
        flex: grow ? 1 : undefined,
        minWidth: 0,
        ...(as === 'ul' || as === 'li' ? { listStyle: 'none', margin: 0, padding: 0 } : null),
        ...style,
      }}
      {...rest}
    />
  )
})
