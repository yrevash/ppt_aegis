'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { STAGE_HEIGHT, STAGE_WIDTH } from './Stage'

interface SlideShellProps {
  index: number
  title: string
  isActive: boolean
  direction: 'forward' | 'backward'
  children: ReactNode
}

/**
 * Positions one slide on the stage and handles enter/leave.
 *
 * Inactive slides were previously left at `opacity: 0` inside the document,
 * which keeps them fully readable to screen readers and reachable by Tab. They
 * are now marked `inert` and `aria-hidden`, so assistive tech and keyboard
 * focus only ever see the slide on stage.
 */
export function SlideShell({ index, title, isActive, direction, children }: SlideShellProps) {
  const ref = useRef<HTMLElement>(null)

  // `inert` is a boolean DOM property; React types still lag on it, so it is
  // set imperatively rather than as a JSX attribute.
  useEffect(() => {
    const node = ref.current
    if (node) node.inert = !isActive
  }, [isActive])

  const offset = direction === 'forward' ? 28 : -28

  return (
    <section
      ref={ref}
      aria-hidden={!isActive}
      aria-roledescription="slide"
      aria-label={`${index + 1}. ${title}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: STAGE_WIDTH,
        height: STAGE_HEIGHT,
        padding: '56px 72px 72px',
        display: 'flex',
        flexDirection: 'column',
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : `translateY(${offset}px)`,
        transition:
          'opacity var(--dur-slide) var(--ease-out), transform var(--dur-slide) var(--ease-out)',
        // Keeps a faded-out slide from swallowing clicks meant for the stage.
        visibility: isActive ? 'visible' : 'hidden',
        transitionProperty: 'opacity, transform, visibility',
      }}
    >
      {children}
    </section>
  )
}
