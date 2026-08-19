import { create } from 'zustand'
import type { SlideConfig } from '../types/slide'

interface SlideStore {
  current: number
  total: number
  direction: 'forward' | 'backward'
  isTransitioning: boolean
  slides: SlideConfig[]
  setSlides: (slides: SlideConfig[]) => void
  navigateTo: (index: number) => void
  next: () => void
  prev: () => void
  setTransitioning: (v: boolean) => void
}

export const useSlideStore = create<SlideStore>((set, get) => ({
  current: 0,
  total: 0,
  direction: 'forward',
  isTransitioning: false,
  slides: [],

  setSlides: (slides) => set({ slides, total: slides.length }),

  navigateTo: (index) => {
    const { current, isTransitioning } = get()
    if (isTransitioning || index < 0 || index >= get().total) return
    set({
      direction: index > current ? 'forward' : 'backward',
      current: index,
      isTransitioning: true,
    })
    setTimeout(() => set({ isTransitioning: false }), 800)
  },

  next: () => {
    const { current, total, isTransitioning } = get()
    if (isTransitioning || current >= total - 1) return
    set({
      direction: 'forward',
      current: current + 1,
      isTransitioning: true,
    })
    setTimeout(() => set({ isTransitioning: false }), 800)
  },

  prev: () => {
    const { current, isTransitioning } = get()
    if (isTransitioning || current <= 0) return
    set({
      direction: 'backward',
      current: current - 1,
      isTransitioning: true,
    })
    setTimeout(() => set({ isTransitioning: false }), 800)
  },

  setTransitioning: (v) => set({ isTransitioning: v }),
}))