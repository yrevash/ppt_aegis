'use client'

import { useCallback, useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Tracks `prefers-reduced-motion`.
 *
 * A media query is external state, so it is read through `useSyncExternalStore`
 * rather than mirrored into `useState` from an effect. The server snapshot is
 * `false`, which is the safe default: the first paint animates nothing anyway.
 */
export function useReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(QUERY)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
