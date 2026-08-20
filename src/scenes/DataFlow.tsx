'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * A slow shell of drifting points. Backdrop for the architecture section.
 * Positions come from a seeded generator so the field is identical on every
 * run of the deck rather than reshuffling each time a presenter reloads.
 */
export function DataFlow({ animate = true, count = 170 }: { animate?: boolean; count?: number }) {
  const points = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    // Mulberry32: small deterministic PRNG, so the scene is reproducible.
    let seed = 0x9e3779b9
    const random = () => {
      seed |= 0
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const accent = new THREE.Color('#cc785c')
    const teal = new THREE.Color('#5db8a6')

    for (let i = 0; i < count; i++) {
      const theta = random() * Math.PI * 2
      const phi = random() * Math.PI
      const r = 3 + random() * 5
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi) - 1

      const mixed = accent.clone().lerp(teal, random() * 0.6)
      col[i * 3] = mixed.r
      col[i * 3 + 1] = mixed.g
      col[i * 3 + 2] = mixed.b
    }
    return { positions: pos, colors: col }
  }, [count])

  useFrame((_, delta) => {
    if (!animate || !points.current) return
    points.current.rotation.y += delta * 0.055
    points.current.rotation.x += delta * 0.016
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        vertexColors
        transparent
        opacity={0.36}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
