import { forwardRef, type HTMLAttributes } from 'react'
import { TONE } from './Text'

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: 'display' | 'xl' | 'lg' | 'md' | 'sm'
  tone?: keyof typeof TONE
  /** Playfair for slide and section titles; the sans for everything smaller. */
  serif?: boolean
}

const sizes: Record<string, React.CSSProperties> = {
  display: { fontSize: 62, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 600 },
  xl: { fontSize: 40, lineHeight: 1.08, letterSpacing: '-0.022em', fontWeight: 600 },
  lg: { fontSize: 28, lineHeight: 1.18, letterSpacing: '-0.015em', fontWeight: 600 },
  md: { fontSize: 19, lineHeight: 1.3, letterSpacing: '-0.008em', fontWeight: 600 },
  sm: { fontSize: 15, lineHeight: 1.35, fontWeight: 600 },
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { as = 'h2', size = 'md', tone = 'ink', serif = false, style, ...rest },
  ref,
) {
  const Tag = as
  return (
    <Tag
      ref={ref}
      style={{
        margin: 0,
        fontFamily: serif
          ? 'var(--font-playfair), Georgia, serif'
          : 'var(--font-geist-sans), system-ui, sans-serif',
        color: TONE[tone],
        textWrap: 'balance',
        ...sizes[size],
        ...style,
      }}
      {...rest}
    />
  )
})
