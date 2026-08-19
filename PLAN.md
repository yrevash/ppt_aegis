# PPT-Gen: 3D Presentation Engine — Architecture & Implementation Plan

## Overview

Build a Next.js + React Three Fiber presentation engine. A **greenfield build** — no existing open-source project combines Next.js + R3F + slide engine. We adopt architectural patterns from Slidev (slide state machine, theme system, plugin architecture), reveal.js (auto-animate, fragments), and react-three-next (canvas persistence via tunnel-rat).

**Goal:** Ship a complete, reusable engine in 7 days. Day 8-10: user plugs in their problem statement adapter.

---

## 1. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16 (App Router) | Already initialized, RSC support |
| 3D Renderer | @react-three/fiber + @react-three/drei | SOTA React + Three.js |
| Canvas Persistence | tunnel-rat | Survives route/page changes without remounting WebGL context |
| 3D Animations | @react-spring/three | Better than framer-motion-3d for declarative 3D camera transitions |
| UI Animations | framer-motion | For HTML overlay animations (content slides in/out) |
| State | zustand | Lightweight, no boilerplate, good for slide navigation state |
| Styling | Tailwind CSS v4 + CSS custom properties | Design tokens -> Tailwind theme -> CSS vars pipeline |
| Content | MDX (optional later) | Slide content as Markdown + JSX components |
| Icons | react-icons (feather set) | Clean, minimal icon set |

---

## 2. Design System — "Light Clean"

### 2.1 Color Palette

```
Primary:       #2563EB (Blue-600)  → buttons, links, active states
Secondary:     #7C3AED (Violet-600) → accents, gradients
Surface:       #FFFFFF, #FAFAFA, #F4F4F5 → slide backgrounds
Text Primary:  #18181B (Zinc-900)   → headings
Text Secondary:#52525B (Zinc-600)   → body copy
Text Tertiary: #A1A1AA (Zinc-400)   → captions, meta
Border:        #E4E4E7 (Zinc-200)   → card borders, dividers
Success:       #059669 (Emerald-600)
Warning:       #D97706 (Amber-600)
Error:         #DC2626 (Red-600)
Info:          #0891B2 (Cyan-600)
```

Neutral scale:
```
50: #FAFAFA, 100: #F4F4F5, 200: #E4E4E7, 300: #D4D4D8,
400: #A1A1AA, 500: #71717A, 600: #52525B, 700: #3F3F46,
800: #27272A, 900: #18181B, 950: #09090B
```

### 2.2 Typography

- **Headings:** Geist Sans (already bundled, Vercel font) — variable font, modern, clean
- **Body:** Geist Sans — same family for consistency
- **Mono:** Geist Mono (already bundled) — code blocks, technical text

Type scale:
```
text-xs:    0.75rem / 1rem     → caption
text-sm:    0.875rem / 1.25rem  → body-small
text-base:  1rem / 1.5rem       → body
text-lg:    1.125rem / 1.75rem  → body-large
text-xl:    1.25rem / 1.75rem   → h4
text-2xl:   1.5rem / 2rem       → h3
text-3xl:   1.875rem / 2.25rem  → h2
text-4xl:   2.25rem / 2.5rem    → h1
text-5xl:   3rem / 1.1          → cover title
text-6xl:   3.75rem / 1.1       → hero
```

### 2.3 Spacing
4px grid: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128

### 2.4 Border Radius
```
sm: 4px, default: 8px, md: 12px, lg: 16px, xl: 24px, 2xl: 32px, full: 9999px
```

### 2.5 Shadows
```
elevation-1: 0 1px 2px rgba(0,0,0,0.04)
elevation-2: 0 2px 8px rgba(0,0,0,0.06)
elevation-3: 0 4px 16px rgba(0,0,0,0.08)
elevation-4: 0 8px 32px rgba(0,0,0,0.12)
```

---

## 3. Architecture Overview

```
src/
├── engine/                           # Reusable presentation engine
│   ├── context/
│   │   ├── SlideContext.tsx           # { current, total, direction, goTo, next, prev }
│   │   ├── ThemeContext.tsx           # Design tokens, color mode
│   │   └── ThreeContext.tsx           # Camera state, scene background config
│   ├── hooks/
│   │   ├── useSlide.ts               # Access slide context
│   │   ├── useSlideNavigation.ts     # Keyboard (← → Space) + scroll + touch
│   │   ├── useThreeScene.ts          # Camera animation targets
│   │   └── useFragments.ts           # Fragment sequencing (appear/disappear)
│   ├── store/
│   │   └── slide-store.ts            # Zustand: slide index, direction, isTransitioning
│   ├── components/
│   │   ├── Deck.tsx                   # Top-level deck wrapper
│   │   ├── Slide.tsx                  # Single slide container
│   │   ├── ThreeScene.tsx             # Persistent 3D canvas
│   │   ├── SlideTransitions.tsx       # Transition definitions (fade, slide, cube-flip)
│   │   ├── Progress.tsx              # Progress bar + slide counter
│   │   └── FragmentController.tsx    # Fragment visibility manager
│   ├── layouts/                       # Slide layout templates
│   │   ├── Cover.tsx                  # Title + subtitle hero slide
│   │   ├── Content.tsx               # Heading + body + optional image
│   │   ├── Split.tsx                 # Two-column layout
│   │   ├── Grid.tsx                   # Bento grid layout
│   │   ├── Quote.tsx                  # Large quote + attribution
│   │   └── Blank.tsx                 # Empty canvas (full 3D freedom)
│   ├── ui/                            # Design system primitives
│   │   ├── Box.tsx                    # Themed container with padding/radius/shadow
│   │   ├── Flex.tsx                   # Flex layout helper
│   │   ├── GridLayout.tsx             # Grid layout helper
│   │   ├── Heading.tsx               # h1-h6 with correct sizing
│   │   ├── Text.tsx                  # Body text with variants
│   │   ├── Card.tsx                  # Bordered rounded box with shadow
│   │   ├── Badge.tsx                 # Inline label/status
│   │   └── Icon.tsx                  # Feather icon wrapper
│   └── types/
│       ├── slide.ts                   # Slide, SlideConfig, Transition types
│       ├── theme.ts                   # ThemeTokens, ColorTokens types
│       └── three.ts                   # ThreeSceneConfig types
│
├── scenes/                            # 3D scene templates (plug & play)
│   ├── ParticleField.tsx             # Animated particle background
│   ├── FloatingShapes.tsx            # Abstract floating geometry
│   ├── WavePlane.tsx                 # Animated wave surface
│   ├── LightTrail.tsx               # Light trail / energy beam effect
│   └── GlowingRing.tsx              # Rotating glowing ring
│
├── themes/
│   └── light-clean.ts                # Light Clean theme config object
│
├── adapters/                          # Plugin system for problem statements
│   ├── adapter.types.ts              # Adapter interface
│   ├── adapter-registry.ts          # Register/activate adapters
│   └── example-adapter.ts           # Template adapter
│
├── app/
│   ├── layout.tsx                     # Root layout (3D canvas persists here)
│   ├── page.tsx                       # Deck entry point
│   └── globals.css                    # Design tokens + Tailwind
│
└── presentations/                     # Your actual presentations
    └── demo.tsx                       # Demo presentation to validate engine
```

---

## 4. Data Flow

```
User Input (keyboard/scroll/touch)
  → useSlideNavigation hook
    → slide-store.ts (zustand)
      → SlideContext (React context)
        → Slide components re-render
        → ThreeScene camera animates to new target
        → Content transitions play
```

**Slide store state:**
```ts
interface SlideState {
  current: number
  total: number
  direction: 'forward' | 'backward'
  isTransitioning: boolean
  slides: SlideConfig[]
  registerSlide: (id: string, config: SlideConfig) => void
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}
```

---

## 5. Key Components Design

### 5.1 Deck (entry wrapper)
```tsx
<Deck slides={slides} adapter={myAdapter}>
  {/* Children automatically become slides */}
</Deck>
```

### 5.2 Slide
Each slide gets:
- `layout`: 'cover' | 'content' | 'split' | 'grid' | 'quote' | 'blank'
- `threeScene`: which 3D scene to render behind this slide
- `transition`: 'fade' | 'slide-left' | 'cube-flip' | 'zoom'
- `fragments`: array of content that reveals in sequence

```tsx
<Slide layout="split" threeScene="particles" transition="slide-left">
  <Slide.Left>
    <Heading>Problem</Heading>
    <Text>...</Text>
  </Slide.Left>
  <Slide.Right>
    <Card>Key Metric</Card>
  </Slide.Right>
</Slide>
```

### 5.3 ThreeScene (persistent canvas)
- Mounted once in `layout.tsx`
- Uses tunnel-rat to receive 3D elements from slide components
- Zustand store drives camera position changes
- Drei's `ScrollControls` for scroll-based camera movement
- Background scene changes per slide (particles → shapes → wave)

### 5.4 3D Transition System
Camera transitions between slides:
- **Fade:** Scene fades, new scene fades in
- **Slide-left/right:** Camera pans horizontally
- **Cube-flip:** Scene rotates like a cube face
- **Zoom:** Camera zooms into/out of content

Implemented with `@react-spring/three` `useSpring` on camera position/lookAt.

### 5.5 Fragment System (reveal.js-style)
Content elements within a slide appear in sequence:
```tsx
<Slide.Fragment index={0}>
  <Text>Point 1</Text>
</Slide.Fragment>
<Slide.Fragment index={1}>
  <Text>Point 2</Text>
</Slide.Fragment>
```

Controlled by clicks/arrow keys within the same slide before advancing.

---

## 6. Adapter System (your problem statement entry point)

The adapter is a function that takes your problem context and returns slide configs:

```ts
interface Adapter {
  id: string
  name: string
  generateSlides: (context: ProblemContext) => SlideConfig[]
}

interface ProblemContext {
  problem: string
  solution: string
  techStack: string[]
  metrics: { label: string; value: string }[]
  team: { name: string; role: string }[]
  timeline: string
  demoUrl?: string
}
```

You'll fill in `ProblemContext` with your hackathon problem statement when ready, and the adapter generates the slide deck structure automatically.

---

## 7. Implementation Phases

**Phase 1: Foundation (Day 1-2)**
- [x] Install dependencies (drei, tunnel-rat, zustand, react-spring, framer-motion)
- [ ] Set up design tokens in globals.css (colors, typography, shadows)
- [ ] Build ThemeContext + theme-store
- [ ] Build UI primitives: Box, Flex, Grid, Heading, Text, Card, Badge

**Phase 2: Slide Engine (Day 2-3)**
- [ ] Build slide-store (zustand)
- [ ] Build SlideContext + useSlide hook
- [ ] Build useSlideNavigation (keyboard, scroll, touch)
- [ ] Build Deck and Slide core components
- [ ] Build Progress component

**Phase 3: 3D Canvas (Day 3-4)**
- [ ] Set up persistent ThreeScene in layout using tunnel-rat
- [ ] Build ThreeContext + useThreeScene hook
- [ ] Build 3D scene templates: ParticleField, FloatingShapes, WavePlane
- [ ] Implement slide-to-scene mapping

**Phase 4: 3D Transitions (Day 4-5)**
- [ ] Build SlideTransitions system
- [ ] Implement fade, slide, cube-flip, zoom transitions
- [ ] Wire transitions to slide navigation

**Phase 5: Layouts & Fragments (Day 5-6)**
- [ ] Build all 6 layout templates
- [ ] Build fragment sequencing system
- [ ] Build FragmentController

**Phase 6: Adapter System (Day 6-7)**
- [ ] Build adapter types and registry
- [ ] Build example-adapter that generates a full demo deck
- [ ] Document adapter interface

**Phase 7: Polish (Day 7-8)**
- [ ] Responsive behavior (16:9 ratio locked)
- [ ] Performance optimization (useMemo, canvas DPR)
- [ ] Keyboard shortcuts overlay (?)
- [ ] Full demo presentation

---

## 8. What You'll Get

When done, you have:
1. A reusable `engine/` folder — copy it to any Next.js project
2. A design system you can customize via one theme file
3. An adapter interface — give it your problem context, get slides back
4. Ready-to-run demo presentation showing all features
5. A `presentations/` folder where you drop your hackathon deck

---

## 9. Dependencies to Install

```bash
npm install @react-three/fiber @react-three/drei three
npm install tunnel-rat zustand
npm install @react-spring/three @react-spring/web
npm install framer-motion
npm install react-icons
npm install -D @types/three
```
