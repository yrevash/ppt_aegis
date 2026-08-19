import { type HTMLAttributes, forwardRef } from 'react'

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  size?: 'sm' | 'base' | 'lg'
  color?: 'ink' | 'soft' | 'muted' | 'accent' | 'teal'
  weight?: 'normal' | 'medium' | 'semibold'
  as?: 'p' | 'span'
  mono?: boolean
  uppercase?: boolean
  tracking?: 'tight' | 'normal' | 'wide'
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)', lineHeight: 1.55 },
  base: { fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)', lineHeight: 1.6 },
  lg: { fontSize: 'clamp(1rem, 2vw, 1.3rem)', lineHeight: 1.55 },
}

const colorMap: Record<string, string> = {
  ink: '#F0EDE8',
  soft: '#A09B93',
  muted: '#6B6760',
  accent: '#CC785C',
  teal: '#5DB8A6',
}

const trackingMap: Record<string, string> = {
  tight: '-0.01em',
  normal: '0',
  wide: '0.08em',
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ size = 'base', color = 'soft', weight = 'normal', as = 'p', mono, uppercase, tracking = 'normal', style, ...rest }, ref) => {
    const Tag = as
    return (
      <Tag
        ref={ref}
        style={{
          margin: 0,
          fontFamily: mono
            ? 'var(--font-geist-mono), monospace'
            : 'var(--font-geist-sans), system-ui, sans-serif',
          fontWeight: weight === 'normal' ? 400 : weight === 'medium' ? 500 : 600,
          color: colorMap[color],
          textTransform: uppercase ? 'uppercase' : undefined,
          letterSpacing: trackingMap[tracking],
          ...sizeStyles[size],
          ...style,
        }}
        {...rest}
      />
    )
  },
)

Text.displayName = 'Text'