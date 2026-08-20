'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AegisRing } from '@/scenes/AegisRing'
import { DataFlow } from '@/scenes/DataFlow'
import { GridFloor } from '@/scenes/GridFloor'
import { HexGrid } from '@/scenes/HexGrid'
import { TrustLayers } from '@/scenes/TrustLayers'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { ThreeSceneName } from '../types/slide'

function Scene({ scene, animate }: { scene: ThreeSceneName; animate: boolean }) {
  switch (scene) {
    case 'ring':
      return <AegisRing animate={animate} />
    case 'grid':
      return <GridFloor animate={animate} />
    case 'flow':
      return <DataFlow animate={animate} />
    case 'hex':
      return <HexGrid animate={animate} />
    case 'layers':
      return <TrustLayers animate={animate} />
    default:
      return null
  }
}

/**
 * One WebGL context for the whole deck. The scene swaps by section; the canvas
 * itself never remounts, so there is no context teardown between slides.
 *
 * Under `prefers-reduced-motion` the scenes still render, but hold still: the
 * composition is part of the design, the drift is the part that has to stop.
 */
export function ThreeCanvas({ scene }: { scene: ThreeSceneName }) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-scene)' as unknown as number,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        // The backdrop only changes when the section changes, so there is no
        // reason to burn frames re-rendering a scene that has not moved.
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <Scene key={scene} scene={scene} animate={!reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
