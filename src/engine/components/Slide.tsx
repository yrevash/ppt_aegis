'use client'

import { useRef } from 'react'
import { useSlide } from '../context/SlideContext'
import { useSlideStore } from '../store/slide-store'
import type { SlideLayout } from '../types/slide'

interface SlideProps {
  layout?: SlideLayout
  threeScene?: string
  transition?: string
  index?: number
  children?: React.ReactNode
}

export function Slide({ index, children }: SlideProps) {
  const registered = useRef(false)
  const { current, direction } = useSlide()
  const isActive = index !== undefined && index === current
  const wasActive = useRef(false)
  const enteringDirection = useRef<'forward' | 'backward'>('forward')

  if (isActive && !wasActive.current) {
    enteringDirection.current = direction
  }
  wasActive.current = isActive

  const isEntering = isActive
  const isLeaving = !isActive

  return (
    <div
      data-slide-index={index}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 4vw, 64px) clamp(32px, 6vw, 96px)',
        overflow: 'hidden',
        opacity: isEntering ? 1 : 0,
        transform: isEntering
          ? 'translateY(0) scale(1)'
          : 'translateY(24px) scale(0.98)',
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        zIndex: isEntering ? 2 : 1,
        pointerEvents: isEntering ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}