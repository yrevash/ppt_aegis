import type { Section } from '@/engine/types/slide'

/** Twelve slides in five movements. The 3D backdrop changes with the movement. */
export const SECTIONS: Section[] = [
  { id: 'opening', label: 'Open', scene: 'ring' },
  { id: 'problem', label: 'Problem', scene: 'grid' },
  { id: 'system', label: 'System', scene: 'flow' },
  { id: 'proof', label: 'Proof', scene: 'hex' },
  { id: 'closing', label: 'Ask', scene: 'ring' },
]
