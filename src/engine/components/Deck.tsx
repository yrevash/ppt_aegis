'use client'

import { useEffect, useMemo } from 'react'
import { useSlideStore } from '../store/slide-store'
import { useSlideNavigation } from '../hooks/useSlideNavigation'
import { Stage } from './Stage'
import { SlideShell } from './SlideShell'
import { PresenterChrome } from './PresenterChrome'
import { Overview } from './Overview'
import { HelpOverlay } from './HelpOverlay'
import { ThreeCanvas } from './ThreeCanvas'
import type { Section, SlideSpec, ThreeSceneName } from '../types/slide'

interface DeckProps {
  slides: SlideSpec[]
  sections: Section[]
}

export function Deck({ slides, sections }: DeckProps) {
  const setSlides = useSlideStore((s) => s.setSlides)
  const current = useSlideStore((s) => s.current)
  const step = useSlideStore((s) => s.step)
  const direction = useSlideStore((s) => s.direction)

  // Register once, and again if the deck is edited during development.
  useEffect(() => {
    setSlides(slides)
  }, [slides, setSlides])

  useSlideNavigation()

  const sceneBySection = useMemo(() => {
    const map = new Map<string, ThreeSceneName>()
    for (const section of sections) map.set(section.id, section.scene)
    return map
  }, [sections])

  const activeSlide = slides[current]
  const scene: ThreeSceneName = sceneBySection.get(activeSlide?.section ?? '') ?? 'none'

  return (
    <>
      <a className="skip-link" href="#deck-stage">
        Skip to current slide
      </a>

      {/* Ambient 3D backdrop. One scene per narrative section, so it changes
          when the argument changes rather than on every slide. */}
      <ThreeCanvas scene={scene} />

      <main id="deck-stage" style={{ position: 'fixed', inset: 0 }}>
        <Stage>
          {slides.map((slide, index) => {
            const isActive = index === current
            return (
              <SlideShell
                key={slide.id}
                index={index}
                title={slide.title}
                isActive={isActive}
                direction={direction}
              >
                {/* Only the active slide receives a live step cursor, so an
                    off-stage slide never runs its reveal animations. */}
                {slide.render({ step: isActive ? step : slide.steps ?? 0, isActive })}
              </SlideShell>
            )
          })}
        </Stage>
      </main>

      {/* Announces slide changes to screen readers without stealing focus. */}
      <p aria-live="polite" className="sr-only">
        {activeSlide ? `Slide ${current + 1} of ${slides.length}. ${activeSlide.title}` : ''}
      </p>

      <PresenterChrome sections={sections} />
      <Overview sections={sections} />
      <HelpOverlay />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
