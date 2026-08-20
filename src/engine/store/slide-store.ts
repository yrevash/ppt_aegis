import { create } from 'zustand'
import type { SlideSpec } from '../types/slide'

interface SlideStore {
  slides: SlideSpec[]
  current: number
  /** Staged-reveal cursor within the current slide. */
  step: number
  direction: 'forward' | 'backward'
  overviewOpen: boolean
  helpOpen: boolean

  setSlides: (slides: SlideSpec[]) => void
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  toggleOverview: () => void
  closeOverlays: () => void
  toggleHelp: () => void
}

function stepsOf(slides: SlideSpec[], index: number): number {
  return slides[index]?.steps ?? 0
}

export const useSlideStore = create<SlideStore>((set, get) => ({
  slides: [],
  current: 0,
  step: 0,
  direction: 'forward',
  overviewOpen: false,
  helpOpen: false,

  setSlides: (slides) => set({ slides }),

  /**
   * Advance the staged reveal first, and only move to the next slide once the
   * current one has nothing left to show.
   */
  next: () => {
    const { current, step, slides } = get()
    if (step < stepsOf(slides, current)) {
      set({ step: step + 1 })
      return
    }
    if (current >= slides.length - 1) return
    set({ current: current + 1, step: 0, direction: 'forward' })
  },

  /** Symmetric: stepping back into a slide restores it fully revealed. */
  prev: () => {
    const { current, step, slides } = get()
    if (step > 0) {
      set({ step: step - 1 })
      return
    }
    if (current <= 0) return
    const target = current - 1
    set({ current: target, step: stepsOf(slides, target), direction: 'backward' })
  },

  goTo: (index) => {
    const { current, slides } = get()
    if (index < 0 || index >= slides.length || index === current) return
    set({
      current: index,
      step: 0,
      direction: index > current ? 'forward' : 'backward',
      overviewOpen: false,
    })
  },

  toggleOverview: () => set((s) => ({ overviewOpen: !s.overviewOpen, helpOpen: false })),
  toggleHelp: () => set((s) => ({ helpOpen: !s.helpOpen, overviewOpen: false })),
  closeOverlays: () => set({ overviewOpen: false, helpOpen: false }),
}))
