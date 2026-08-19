import type { Section } from '@/engine/types/slide'

/**
 * The talk in six movements. Each one owns a 3D backdrop, so the scene changes
 * when the argument changes rather than on every slide.
 */
export const SECTIONS: Section[] = [
  { id: 'opening', label: 'Open', scene: 'ring' },
  { id: 'problem', label: 'Problem', scene: 'grid' },
  { id: 'system', label: 'System', scene: 'flow' },
  { id: 'modules', label: 'Modules', scene: 'hex' },
  { id: 'proof', label: 'Proof', scene: 'layers' },
  { id: 'closing', label: 'Close', scene: 'ring' },
]
