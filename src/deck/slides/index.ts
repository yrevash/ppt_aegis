import type { SlideSpec } from '@/engine/types/slide'
import { act1Slides } from './act1'
import { act2Slides } from './act2'
import { act3Slides } from './act3'
import { act4Slides } from './act4'

/**
 * Twelve slides, in order. Position in this array is the slide index, so
 * inserting one cannot desynchronise anything.
 */
export const SLIDES: SlideSpec[] = [...act1Slides, ...act2Slides, ...act3Slides, ...act4Slides]
