'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { threeTunnel } from '../context/ThreeContext'

export function ThreeCanvas() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: 3 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <threeTunnel.Out />
        </Suspense>
      </Canvas>
    </div>
  )
}