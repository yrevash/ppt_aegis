'use client'

import { useEffect } from 'react'
import { useSlide } from '../context/SlideContext'

export function useSlideNavigation() {
  const { next, prev, current } = useSlide()

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prev()
      }
    }

    let touchStartX = 0
    let touchStartY = 0

    function handleTouchStart(e: TouchEvent) {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    function handleTouchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - touchStartX
      const dy = e.changedTouches[0].clientY - touchStartY
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 50) prev()
        else if (dx < -50) next()
      } else {
        if (dy > 50) prev()
        else if (dy < -50) next()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [next, prev])

  useEffect(() => {
    let accumulating = false
    let deltaAccum = 0
    let timer: ReturnType<typeof setTimeout>

    function handleWheel(e: WheelEvent) {
      e.preventDefault()
      deltaAccum += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (!accumulating) {
        accumulating = true
        timer = setTimeout(() => {
          if (deltaAccum > 40) next()
          else if (deltaAccum < -40) prev()
          deltaAccum = 0
          accumulating = false
        }, 100)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(timer)
    }
  }, [next, prev, current])
}