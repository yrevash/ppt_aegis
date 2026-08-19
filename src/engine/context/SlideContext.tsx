'use client'

import { createContext, useContext, useCallback } from 'react'
import { useSlideStore } from '../store/slide-store'
import type { SlideContextType } from '../types/slide'

const SlideContext = createContext<SlideContextType | null>(null)

export function SlideProvider({ children }: { children: React.ReactNode }) {
  const current = useSlideStore((s) => s.current)
  const total = useSlideStore((s) => s.total)
  const direction = useSlideStore((s) => s.direction)
  const isTransitioning = useSlideStore((s) => s.isTransitioning)
  const navigateTo = useSlideStore((s) => s.navigateTo)
  const next = useSlideStore((s) => s.next)
  const prev = useSlideStore((s) => s.prev)

  const goTo = useCallback(
    (index: number) => navigateTo(index),
    [navigateTo],
  )

  return (
    <SlideContext.Provider
      value={{ current, total, direction, isTransitioning, navigateTo: goTo, next, prev }}
    >
      {children}
    </SlideContext.Provider>
  )
}

export function useSlide(): SlideContextType {
  const ctx = useContext(SlideContext)
  if (!ctx) throw new Error('useSlide must be used within SlideProvider')
  return ctx
}