import { type HTMLAttributes, forwardRef } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingLevel
  size?: 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  color?: 'ink' | 'soft' | 'muted' | 'accent' | 'teal'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  serif?: boolean
}

const sizeStyles: Record<string, React.CSSProperties> = {
  display: { fontSize: '2.8rem', lineHeight: 1.02, letterSpacing: '-0.03em' },
  xl: { fontSize: '1.875rem', lineHeight: 1.2, letterSpacing: '-0.02em' },
  lg: { fontSize: '1.5rem', lineHeight: 1.25 },
  md: { fontSize: '1.25rem', lineHeight: 1.35 },
  sm: { fontSize: '1.05rem', lineHeight: 1.4 },
  xs: { fontSize: '0.9rem', lineHeight: 1.4 },
}

const colorMap: Record<string, string> = {
  ink: '#F0EDE8',
  soft: '#A09B93',
  muted: '#6B6760',
  accent: '#CC785C',
  teal: '#5DB8A6',
}

const weightMap: Record<string, number> = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = 'h2', size = 'md', color = 'ink', weight = 'semibold', serif = false, style, ...rest }, ref) => {
    const Tag = as
    return (
      <Tag
        ref={ref}
        style={{
          margin: 0,
          fontFamily: serif
            ? 'var(--font-playfair), Georgia, serif'
            : 'var(--font-geist-sans), system-ui, sans-serif',
          fontWeight: weightMap[weight],
          color: colorMap[color],
          ...sizeStyles[size],
          ...style,
        }}
        {...rest}
      />
    )
  },
)

Heading.displayName = 'Heading'