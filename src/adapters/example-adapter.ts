import type { SlideConfig, SlideLayout, ThreeSceneName } from '../engine/types/slide'

export interface ProblemContext {
  problem: string
  description: string
  solution: string
  techStack: string[]
  keyFeatures: string[]
  metrics: { label: string; value: string }[]
  team: { name: string; role: string }[]
  timeline: string
  demoUrl?: string
}

function slide(id: string, layout: SlideLayout, threeScene: ThreeSceneName = 'ring'): SlideConfig {
  return { id, layout, threeScene }
}

export const exampleAdapter = {
  id: 'aegis',
  name: 'Aegis Pitch',
  generateSlides: () => [
    slide('cover', 'cover', 'ring'),
    slide('metrics', 'content', 'particles'),
    slide('pipeline', 'blank', 'wave'),
    slide('architecture', 'blank', 'trail'),
    slide('console', 'blank', 'shapes'),
    slide('thanks', 'cover', 'ring'),
  ],
}