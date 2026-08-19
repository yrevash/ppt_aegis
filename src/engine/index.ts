// Engine — barrel export
export { Deck } from './components/Deck'
export { Slide } from './components/Slide'
export { ThreeCanvas } from './components/ThreeCanvas'
export { ThreeSceneRenderer } from './components/ThreeSceneRenderer'
export { Progress } from './components/Progress'
export { FragmentController } from './components/FragmentController'
export { SlideProvider, useSlide } from './context/SlideContext'
export { useSlideNavigation } from './hooks/useSlideNavigation'
export { useFragments } from './hooks/useFragments'
export { useSlideStore } from './store/slide-store'

// Layouts
export { Cover } from './layouts/Cover'
export { Content } from './layouts/Content'
export { Split } from './layouts/Split'
export { Grid } from './layouts/Grid'
export { Quote } from './layouts/Quote'
export { Blank } from './layouts/Blank'

// UI
export { Box } from './ui/Box'
export { Flex } from './ui/Flex'
export { GridLayout } from './ui/GridLayout'
export { Heading } from './ui/Heading'
export { Text } from './ui/Text'
export { Card } from './ui/Card'
export { Badge } from './ui/Badge'

// Types
export type {
  SlideLayout,
  SlideTransition,
  ThreeSceneName,
  SlideConfig,
  SlideNavigationState,
  SlideContextType,
  ThemeTokens,
} from './types'