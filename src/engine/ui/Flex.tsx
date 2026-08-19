import { type HTMLAttributes, forwardRef } from 'react'

type FlexProps = HTMLAttributes<HTMLDivElement> & {
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  gap?: number
  wrap?: boolean
  grow?: boolean
}

const alignMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      align = 'start',
      justify = 'start',
      gap,
      wrap,
      grow,
      style,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: direction === 'col' ? 'column' : 'row',
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          gap: gap !== undefined ? `${gap * 4}px` : undefined,
          flexWrap: wrap ? 'wrap' : undefined,
          flex: grow ? 1 : undefined,
          ...style,
        }}
        {...rest}
      />
    )
  },
)

Flex.displayName = 'Flex'