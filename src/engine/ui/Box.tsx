import { type HTMLAttributes, forwardRef } from 'react'

type BoxProps = HTMLAttributes<HTMLDivElement> & {
  p?: number | string
  px?: number | string
  py?: number | string
  pt?: number | string
  pb?: number | string
  pl?: number | string
  pr?: number | string
  m?: number | string
  mx?: number | string
  my?: number | string
  rounded?: 'sm' | 'card' | 'slide' | 'none'
  shadow?: 'card' | 'cardHover' | 'slide' | 'none'
  bg?: 'surface' | 'surfaceAlt' | 'surfaceRaised' | 'brand' | 'accent' | 'none'
  border?: boolean
}

function parse(n: number | string | undefined): string | undefined {
  if (n === undefined) return undefined
  return typeof n === 'number' ? `${n * 4}px` : n
}

const radiusMap: Record<string, string> = {
  sm: 'var(--radius-sm)',
  card: 'var(--radius-card)',
  slide: 'var(--radius-slide)',
}

const shadowMap: Record<string, string> = {
  card: 'var(--shadow-card)',
  cardHover: 'var(--shadow-card-hover)',
  slide: 'var(--shadow-slide)',
}

const bgMap: Record<string, string> = {
  surface: '#FFFFFF',
  surfaceAlt: '#FAFAFA',
  surfaceRaised: '#F4F4F5',
  brand: '#2563EB',
  accent: '#7C3AED',
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      p,
      px,
      py,
      pt,
      pb,
      pl,
      pr,
      m,
      mx,
      my,
      rounded = 'none',
      shadow = 'none',
      bg = 'none',
      border = false,
      style,
      ...rest
    },
    ref,
  ) => {
    const paddingTop = parse(pt ?? py ?? p)
    const paddingBottom = parse(pb ?? py ?? p)
    const paddingLeft = parse(pl ?? px ?? p)
    const paddingRight = parse(pr ?? px ?? p)
    const marginTop = parse(my ?? m)
    const marginRight = parse(mx ?? m)
    const marginBottom = parse(my ?? m)
    const marginLeft = parse(mx ?? m)

    return (
      <div
        ref={ref}
        style={{
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          borderRadius: rounded !== 'none' ? radiusMap[rounded] : undefined,
          boxShadow: shadow !== 'none' ? shadowMap[shadow] : undefined,
          background: bg !== 'none' ? bgMap[bg] : undefined,
          border: border ? '1px solid var(--border)' : undefined,
          ...style,
        }}
        {...rest}
      />
    )
  },
)

Box.displayName = 'Box'