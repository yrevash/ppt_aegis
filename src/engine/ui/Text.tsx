import { forwardRef, type HTMLAttributes } from 'react'

type TextProps = HTMLAttributes<HTMLElement> & {
  size?: 'xs' | 'sm' | 'base' | 'lg'
  tone?: 'ink' | 'soft' | 'muted' | 'faint' | 'accent' | 'teal' | 'amber'
  weight?: 'normal' | 'medium' | 'semibold'
  as?: 'p' | 'span' | 'div' | 'dd' | 'dt' | 'li'
  mono?: boolean
  /** Small wide-tracked label. Used sparingly, never above every heading. */
  label?: boolean
}

const sizes: Record<string, React.CSSProperties> = {
  xs: { fontSize: 11.5, lineHeight: 1.5 },
  sm: { fontSize: 13, lineHeight: 1.55 },
  base: { fontSize: 15, lineHeight: 1.6 },
  lg: { fontSize: 18, lineHeight: 1.55 },
}

export const TONE: Record<string, string> = {
  ink: 'var(--ink)',
  soft: 'var(--ink-soft)',
  muted: 'var(--ink-muted)',
  faint: 'var(--ink-faint)',
  accent: 'var(--accent)',
  teal: 'var(--teal)',
  amber: 'var(--amber)',
}

const weights = { normal: 400, medium: 500, semibold: 600 } as const

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { size = 'base', tone = 'soft', weight = 'normal', as = 'p', mono, label, style, ...rest },
  ref,
) {
  const Tag = as as 'p'
  return (
    <Tag
      ref={ref as never}
      style={{
        margin: 0,
        fontFamily: mono ? 'var(--font-geist-mono), monospace' : 'var(--font-geist-sans), system-ui, sans-serif',
        fontWeight: weights[weight],
        color: TONE[tone],
        ...sizes[size],
        ...(label
          ? { fontSize: 10.5, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
          : null),
        // Avoids a single word stranded on the last line of a paragraph.
        textWrap: 'pretty',
        ...style,
      }}
      {...rest}
    />
  )
})
