export type SlideLayout = 'cover' | 'content' | 'split' | 'grid' | 'quote' | 'blank'

export type SlideTransition = 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'zoom' | 'cube-flip' | 'none'

export type ThreeSceneName = 'particles' | 'shapes' | 'wave' | 'trail' | 'ring' | 'none'

export interface SlideFragment {
  id: string
}

export interface SlideConfig {
  id: string
  layout: SlideLayout
  transition?: SlideTransition
  threeScene?: ThreeSceneName
  content?: Record<string, unknown>
}

export interface SlideNavigationState {
  current: number
  total: number
  direction: 'forward' | 'backward'
  isTransitioning: boolean
}

export interface SlideContextType extends SlideNavigationState {
  navigateTo: (index: number) => void
  next: () => void
  prev: () => void
}