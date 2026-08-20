'use client'

import type { CSSProperties, ReactNode } from 'react'

interface RevealProps {
  /** The step at which this element becomes visible. */
  at: number
  /** The slide's current step cursor. */
  step: number
  /** Extra delay per item, for cascading a list in one step. */
  index?: number
  children: ReactNode
  style?: CSSProperties
}

/**
 * Staged reveal, driven by the deck's step cursor rather than by scroll.
 *
 * The motion is doing one job: it holds the audience on the point being made
 * before the next one lands. Everything animates on transform and opacity, and
 * the global reduced-motion rule collapses the transition to nothing.
 */
export function Reveal({ at, step, index = 0, children, style }: RevealProps) {
  const shown = step >= at
  return (
    <div
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 460ms var(--ease-out) ${index * 55}ms, transform 460ms var(--ease-out) ${index * 55}ms`,
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
