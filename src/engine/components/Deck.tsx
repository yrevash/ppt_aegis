'use client'

import { useEffect, useRef } from 'react'
import { SlideProvider } from '../context/SlideContext'
import { useSlideStore } from '../store/slide-store'
import { useSlideNavigation } from '../hooks/useSlideNavigation'
import { Progress } from './Progress'
import type { SlideConfig, ThreeSceneName } from '../types/slide'

interface DeckProps {
  slides: SlideConfig[]
  onThreeSceneChange?: (scene: ThreeSceneName) => void
  children: React.ReactNode
}

function DeckInner({ onThreeSceneChange, children }: Omit<DeckProps, 'slides'>) {
  const slides = useSlideStore((s) => s.slides)
  const current = useSlideStore((s) => s.current)

  useSlideNavigation()

  useEffect(() => {
    const scene = slides[current]?.threeScene ?? 'none'
    onThreeSceneChange?.(scene)
  }, [current, slides, onThreeSceneChange])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0D0D0F',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {children}
      <Progress />
    </div>
  )
}

export function Deck({ slides, onThreeSceneChange, children }: DeckProps) {
  const initialized = useRef(false)

  if (!initialized.current) {
    initialized.current = true
    useSlideStore.getState().setSlides(slides)
  }

  return (
    <SlideProvider>
      <DeckInner onThreeSceneChange={onThreeSceneChange}>{children}</DeckInner>
    </SlideProvider>
  )
}