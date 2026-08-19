import { type HTMLAttributes, forwardRef } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  p?: number
  variant?: 'raised' | 'overlay' | 'ghost'
}

const variantMap: Record<string, { bg: string; border: string }> = {
  raised: { bg: '#141417', border: 'rgba(240, 237, 232, 0.06)' },
  overlay: { bg: '#1A1A1E', border: 'rgba(240, 237, 232, 0.1)' },
  ghost: { bg: 'transparent', border: 'rgba(240, 237, 232, 0.06)' },
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ p = 5, variant = 'raised', style, ...rest }, ref) => {
    const v = variantMap[variant]
    return (
      <div
        ref={ref}
        style={{
          padding: `${p * 4}px`,
          borderRadius: 12,
          background: v.bg,
          border: `1px solid ${v.border}`,
          ...style,
        }}
        {...rest}
      />
    )
  },
)

Card.displayName = 'Card'