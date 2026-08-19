import { type HTMLAttributes, forwardRef } from 'react'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'accent' | 'teal' | 'amber' | 'ghost'
}

const variantMap: Record<string, { bg: string; fg: string; border: string }> = {
  accent: { bg: 'rgba(204, 120, 92, 0.12)', fg: '#CC785C', border: 'rgba(204, 120, 92, 0.25)' },
  teal: { bg: 'rgba(93, 184, 166, 0.12)', fg: '#5DB8A6', border: 'rgba(93, 184, 166, 0.25)' },
  amber: { bg: 'rgba(232, 165, 90, 0.12)', fg: '#E8A55A', border: 'rgba(232, 165, 90, 0.25)' },
  ghost: { bg: 'rgba(240, 237, 232, 0.06)', fg: '#A09B93', border: 'rgba(240, 237, 232, 0.08)' },
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'ghost', style, ...rest }, ref) => {
    const v = variantMap[variant]
    return (
      <span
        ref={ref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 12px',
          fontSize: '0.75rem',
          fontWeight: 500,
          lineHeight: 1.4,
          borderRadius: 6,
          background: v.bg,
          color: v.fg,
          border: `1px solid ${v.border}`,
          fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
          letterSpacing: '0.02em',
          ...style,
        }}
        {...rest}
      />
    )
  },
)

Badge.displayName = 'Badge'