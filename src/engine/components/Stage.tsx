'use client'

import { useEffect, useState, type ReactNode } from 'react'

/**
 * Slides are authored at a fixed 1280x720 and the whole stage is scaled to fit
 * the viewport, the way reveal.js and Slidev do it.
 *
 * Letting each slide reflow against the real viewport meant a content-heavy
 * slide could overflow at an unlucky projector resolution with no way to catch
 * it short of testing every size. With a fixed stage, a slide that fits while
 * authoring fits everywhere; only the scale factor changes.
 */
export const STAGE_WIDTH = 1280
export const STAGE_HEIGHT = 720

export function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    function fit() {
      setScale(Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT))
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
        zIndex: 'var(--z-stage)' as unknown as number,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/*
        Centred by absolute positioning rather than by grid or flex alignment.
        When the stage is wider than the viewport, the implicit grid column
        sized itself to the 1280px child, so `place-items: center` had nothing
        to centre against and the deck sat entirely off-screen on a phone.
      */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
          pointerEvents: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}
