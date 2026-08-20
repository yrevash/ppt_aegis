'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PALETTE = ['#cc785c', '#e8a55a', '#5db8a6', '#cc785c', '#e8a55a', '#5db8a6']

/** Six nested rings, one per trust checkpoint. Backdrop for the proof section. */
export function TrustLayers({ animate = true, layers = 6 }: { animate?: boolean; layers?: number }) {
  const group = useRef<THREE.Group>(null)
  const elapsed = useRef(0)

  const rings = useMemo(
    () =>
      Array.from({ length: layers }, (_, i) => ({
        geometry: new THREE.TorusGeometry(1.2 + i * 0.7, 0.008 + i * 0.002, 8, 80 + i * 20),
        color: PALETTE[i % PALETTE.length],
        opacity: 0.03 + i * 0.011,
      })),
    [layers],
  )

  useFrame((_, delta) => {
    if (!animate || !group.current) return
    elapsed.current += delta
    const t = elapsed.current * 0.1
    group.current.children.forEach((child, i) => {
      child.rotation.z = t * (0.3 + i * 0.1)
      child.rotation.x = Math.sin(t * 0.4 + i) * (0.15 + i * 0.05)
      child.rotation.y = Math.cos(t * 0.35 + i) * (0.15 + i * 0.05)
    })
  })

  return (
    <group ref={group} position={[0, 0.4, -5]}>
      {rings.map((ring, i) => (
        <mesh key={i} geometry={ring.geometry}>
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
