'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ORBIT_COUNT = 90

/**
 * Concentric rings with a band of orbiting points: the shield the product is
 * named for. Carries the cover and the close.
 */
export function AegisRing({ animate = true, radius = 3.4 }: { animate?: boolean; radius?: number }) {
  const group = useRef<THREE.Group>(null)
  const orbit = useRef<THREE.Points>(null)
  const elapsed = useRef(0)

  // Built once. An earlier version allocated a torus inline on every render.
  const rings = useMemo(
    () => [
      { geo: new THREE.TorusGeometry(radius, 0.014, 12, 128), color: '#cc785c', opacity: 0.3, rot: [Math.PI / 2.5, 0, 0] as const },
      { geo: new THREE.TorusGeometry(radius * 1.26, 0.007, 8, 160), color: '#cc785c', opacity: 0.13, rot: [Math.PI / 2.5, 0.3, 0.1] as const },
      { geo: new THREE.TorusGeometry(radius * 0.74, 0.01, 8, 128), color: '#5db8a6', opacity: 0.17, rot: [Math.PI / 2.5, 0.6, -0.1] as const },
      { geo: new THREE.TorusGeometry(radius * 0.5, 0.006, 8, 96), color: '#e8a55a', opacity: 0.1, rot: [Math.PI / 2.2, -0.4, 0.2] as const },
    ],
    [radius],
  )

  // Points scattered along the main ring, so the shield reads as populated
  // rather than as bare wireframe.
  const orbitPositions = useMemo(() => {
    const pos = new Float32Array(ORBIT_COUNT * 3)
    for (let i = 0; i < ORBIT_COUNT; i++) {
      const theta = (i / ORBIT_COUNT) * Math.PI * 2
      const wobble = Math.sin(i * 1.7) * 0.22
      const r = radius * 1.05 + wobble
      pos[i * 3] = Math.cos(theta) * r
      pos[i * 3 + 1] = Math.sin(theta) * r * 0.42
      pos[i * 3 + 2] = Math.sin(theta * 2) * 0.5
    }
    return pos
  }, [radius])

  useFrame((_, delta) => {
    if (!animate) return
    elapsed.current += delta
    const t = elapsed.current * 0.15
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.25
      group.current.rotation.x = Math.sin(t * 0.2) * 0.15
    }
    if (orbit.current) orbit.current.rotation.z = elapsed.current * 0.06
  })

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <mesh key={i} geometry={ring.geo} rotation={ring.rot}>
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}

      <points ref={orbit} rotation={[Math.PI / 2.5, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[orbitPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#e08d6f"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
