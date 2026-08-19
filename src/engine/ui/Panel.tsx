import { forwardRef, type HTMLAttributes } from 'react'

type Variant = 'raised' | 'inset' | 'outline' | 'accent'

const variants: Record<Variant, React.CSSProperties> = {
  raised: { background: 'var(--surface)', border: '1px solid var(--hairline)' },
  inset: { background: 'rgba(9, 9, 11, 0.42)', border: '1px solid var(--hairline)' },
  outline: { background: 'transparent', border: '1px solid var(--hairline)' },
  accent: { background: 'var(--accent-dim)', border: '1px solid var(--accent-edge)' },
}

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant
  pad?: number
  as?: 'div' | 'li' | 'article' | 'section'
}

/**
 * A surface. Used only where elevation carries hierarchy; plain grouping is
 * done with spacing and hairlines instead.
 */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { variant = 'raised', pad = 16, as = 'div', style, ...rest },
  ref,
) {
  const Tag = as as 'div'
  return (
    <Tag
      ref={ref}
      style={{
        padding: pad,
        borderRadius: 'var(--r-md)',
        minWidth: 0,
        ...variants[variant],
        ...style,
      }}
      {...rest}
    />
  )
})
