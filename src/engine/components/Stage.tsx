'use client'

import { useEffect, useState, type ReactNode } from 'react'

/**
 * Slides are authored at a fixed 1280x720 and the whole stage is scaled to fit
 * the viewport, the way reveal.js and Slidev do it.
 *
 * The previous engine let each slide reflow against the real viewport, which
 * meant a content-heavy slide could overflow at an unlucky projector
 * resolution and there was no way to catch it short of testing every size.
 * With a fixed stage, a slide that fits while authoring fits everywhere: the
 * only thing that changes across screens is the scale factor.
 */
export const STAGE_WIDTH = 1280
export const STAGE_HEIGHT = 720

export function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    function fit() {
      // 100dvh rather than innerHeight semantics: on mobile browsers the
      // address bar would otherwise make the stage jump on first scroll.
      const vw = window.innerWidth
      const vh = window.innerHeight
      setScale(Math.min(vw / STAGE_WIDTH, vh / STAGE_HEIGHT))
    }
    fit()
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        zIndex: 'var(--z-stage)' as unknown as number,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'relative',
          flexShrink: 0,
          pointerEvents: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}
