'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Concentric rings: the shield the product is named for. */
export function AegisRing({ animate = true, radius = 3.4 }: { animate?: boolean; radius?: number }) {
  const group = useRef<THREE.Group>(null)
  const elapsed = useRef(0)

  // All three geometries are built once. The previous version allocated the
  // inner torus inline on every render, leaking a geometry per frame.
  const geometries = useMemo(
    () => [
      { geo: new THREE.TorusGeometry(radius, 0.015, 12, 128), color: '#cc785c', opacity: 0.26, rot: [Math.PI / 2.5, 0, 0] as const },
      { geo: new THREE.TorusGeometry(radius * 1.25, 0.008, 8, 160), color: '#cc785c', opacity: 0.11, rot: [Math.PI / 2.5, 0.3, 0.1] as const },
      { geo: new THREE.TorusGeometry(radius * 0.74, 0.01, 8, 128), color: '#5db8a6', opacity: 0.15, rot: [Math.PI / 2.5, 0.6, -0.1] as const },
    ],
    [radius],
  )

  useFrame((_, delta) => {
    if (!animate || !group.current) return
    elapsed.current += delta
    const t = elapsed.current * 0.15
    group.current.rotation.y = Math.sin(t * 0.3) * 0.25
    group.current.rotation.x = Math.sin(t * 0.2) * 0.15
  })

  return (
    <group ref={group}>
      {geometries.map((ring, i) => (
        <mesh key={i} geometry={ring.geo} rotation={ring.rot}>
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
