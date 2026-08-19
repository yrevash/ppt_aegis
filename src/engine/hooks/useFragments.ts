'use client'

import { useState, useEffect, useCallback } from 'react'

interface FragmentController {
  activeIndex: number
  totalFragments: number
  advance: () => void
  reset: () => void
}

export function useFragments(totalFragments: number, onComplete?: () => void): FragmentController {
  const [activeIndex, setActiveIndex] = useState(-1)

  const advance = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev + 1
      if (next >= totalFragments) {
        onComplete?.()
        return prev
      }
      return next
    })
  }, [totalFragments, onComplete])

  const reset = useCallback(() => {
    setActiveIndex(-1)
  }, [])

  return { activeIndex, totalFragments, advance, reset }
}