'use client'

import { useEffect } from 'react'
import { useSlideStore } from '../store/slide-store'

const SWIPE_THRESHOLD = 48
const WHEEL_THRESHOLD = 42
const WHEEL_COOLDOWN = 420

/**
 * Keyboard, wheel and touch navigation for the deck.
 *
 * Keys follow the conventions presenters already have in their fingers from
 * reveal.js and Keynote, including the forward/back buttons most USB clickers
 * emit (PageDown / PageUp).
 */
export function useSlideNavigation() {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Never steal keys from a focused control.
      const target = e.target as HTMLElement | null
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) {
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const store = useSlideStore.getState()

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          store.next()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault()
          store.prev()
          break
        case 'Home':
          e.preventDefault()
          store.goTo(0)
          break
        case 'End':
          e.preventDefault()
          store.goTo(store.slides.length - 1)
          break
        case 'o':
        case 'O':
          e.preventDefault()
          store.toggleOverview()
          break
        case '?':
          e.preventDefault()
          store.toggleHelp()
          break
        case 'Escape':
          if (store.overviewOpen || store.helpOpen) {
            e.preventDefault()
            store.closeOverlays()
          }
          break
        case 'f':
        case 'F': {
          e.preventDefault()
          if (document.fullscreenElement) void document.exitFullscreen()
          else void document.documentElement.requestFullscreen().catch(() => {})
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Wheel and trackpad. Listener is passive: the body never scrolls, so there
  // is nothing to preventDefault and the browser can stay off the main thread.
  useEffect(() => {
    let last = 0
    function onWheel(e: WheelEvent) {
      const store = useSlideStore.getState()
      if (store.overviewOpen || store.helpOpen) return

      const now = Date.now()
      if (now - last < WHEEL_COOLDOWN) return

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (Math.abs(delta) < WHEEL_THRESHOLD) return

      last = now
      if (delta > 0) store.next()
      else store.prev()
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  // Touch swipe.
  useEffect(() => {
    let startX = 0
    let startY = 0

    function onTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    function onTouchEnd(e: TouchEvent) {
      const store = useSlideStore.getState()
      if (store.overviewOpen || store.helpOpen) return

      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      const horizontal = Math.abs(dx) > Math.abs(dy)
      const travel = horizontal ? dx : dy
      if (Math.abs(travel) < SWIPE_THRESHOLD) return

      if (travel < 0) store.next()
      else store.prev()
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])
}
