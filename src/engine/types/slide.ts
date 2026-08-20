import type { ReactNode } from 'react'

/** Ambient 3D backdrops. One per narrative section, not one per slide. */
export type ThreeSceneName =
  | 'grid'
  | 'ring'
  | 'layers'
  | 'flow'
  | 'hex'
  | 'none'

export type SectionId =
  | 'opening'
  | 'problem'
  | 'system'
  | 'modules'
  | 'proof'
  | 'closing'

export interface Section {
  id: SectionId
  label: string
  scene: ThreeSceneName
}

/** Context handed to a slide's render function. */
export interface SlideRenderContext {
  /** How many staged reveals have fired. 0 means "nothing revealed yet". */
  step: number
  /** True only for the slide currently on stage. */
  isActive: boolean
}

/**
 * One slide, declared in a single place.
 *
 * The previous engine kept slide order in `example-adapter.ts` and slide bodies
 * in `page.tsx` with hardcoded `index={n}` props, so the two drifted apart the
 * moment a slide was inserted. A spec carries its own order, scene and staging,
 * and the index is derived from array position.
 */
export interface SlideSpec {
  id: string
  /** Shown in overview mode and announced to screen readers on navigation. */
  title: string
  section: SectionId
  /** Extra reveal steps beyond the base state. 0 means the slide shows at once. */
  steps?: number
  render: (ctx: SlideRenderContext) => ReactNode
}

export interface SlideNavigationState {
  current: number
  total: number
  step: number
  direction: 'forward' | 'backward'
}
