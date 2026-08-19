import type { SlideSpec } from '@/engine/types/slide'
import { openingSlides } from './opening'
import { problemSlides } from './problem'
import { systemSlides } from './system'
import { moduleSlides } from './modules'
import { proofSlides } from './proof'
import { closingSlides } from './closing'

/**
 * The deck, in order. Position in this array is the slide index, so inserting a
 * slide cannot desynchronise anything.
 */
export const SLIDES: SlideSpec[] = [
  ...openingSlides,
  ...problemSlides,
  ...systemSlides,
  ...moduleSlides,
  ...proofSlides,
  ...closingSlides,
]
