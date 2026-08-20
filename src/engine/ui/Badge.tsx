import { forwardRef, type HTMLAttributes } from 'react'

type Variant = 'accent' | 'teal' | 'amber' | 'quiet'

const variants: Record<Variant, { bg: string; fg: string; border: string }> = {
  accent: { bg: 'var(--accent-dim)', fg: 'var(--accent)', border: 'var(--accent-edge)' },
  teal: { bg: 'var(--teal-dim)', fg: 'var(--teal)', border: 'var(--teal-edge)' },
  amber: { bg: 'var(--amber-dim)', fg: 'var(--amber)', border: 'var(--amber-edge)' },
  quiet: { bg: 'rgba(240, 237, 232, 0.045)', fg: 'var(--ink-soft)', border: 'var(--hairline)' },
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { variant?: Variant; mono?: boolean }

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'quiet', mono, style, ...rest },
  ref,
) {
  const v = variants[variant]
  return (
    <span
      ref={ref}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3.5px 9px',
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: '0.01em',
        fontFamily: mono
          ? 'var(--font-geist-mono), monospace'
          : 'var(--font-geist-sans), system-ui, sans-serif',
        // Square-ish, matching the panel scale. No pills anywhere in the deck.
        borderRadius: 'var(--r-xs)',
        background: v.bg,
        color: v.fg,
        border: `1px solid ${v.border}`,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    />
  )
})
