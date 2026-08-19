'use client'

import { Children, isValidElement, cloneElement, type ReactElement } from 'react'
import { useFragments } from '../hooks/useFragments'
import { useSlide } from '../context/SlideContext'
import { useEffect } from 'react'

interface FragmentControllerProps {
  children: React.ReactNode
  keys?: string[]
  onAllFragmentsShown?: () => void
}

export function FragmentController({ children, keys, onAllFragmentsShown }: FragmentControllerProps) {
  const childrenArray = Children.toArray(children)
  const totalFragments = childrenArray.length
  const { activeIndex, advance, reset } = useFragments(totalFragments, onAllFragmentsShown)
  const { current, next } = useSlide()

  useEffect(() => {
    reset()
  }, [current, reset])

  useEffect(() => {
    function handleFragmentAdvance(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        if (activeIndex < totalFragments - 1) {
          e.preventDefault()
          e.stopPropagation()
          advance()
        }
      }
    }

    window.addEventListener('keydown', handleFragmentAdvance, true)
    return () => window.removeEventListener('keydown', handleFragmentAdvance, true)
  }, [activeIndex, totalFragments, advance])

  return (
    <>
      {childrenArray.map((child, i) => {
        if (!isValidElement(child)) return child

        return cloneElement(child as ReactElement<{ style?: React.CSSProperties; key?: string }>, {
          key: keys?.[i] ?? String(i),
          style: {
            ...(child as ReactElement<{ style?: React.CSSProperties }>).props.style,
            opacity: i <= activeIndex ? 1 : 0,
            transform: i <= activeIndex ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.3s, transform 0.3s',
          },
        })
      })}
    </>
  )
}