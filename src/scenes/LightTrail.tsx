'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface LightTrailProps {
  color?: string
  segments?: number
  radius?: number
  speed?: number
}

export function LightTrail({
  color = '#7C3AED',
  segments = 3,
  radius = 4,
  speed = 0.5,
}: LightTrailProps) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  const rings = useMemo(() => {
    return Array.from({ length: segments }, (_, i) => ({
      rotation: [0, 0, (Math.PI / segments) * i] as [number, number, number],
      offset: (i * Math.PI * 2) / segments,
      scale: 1 - i * 0.15,
    }))
  }, [segments])

  const ringGeometry = useMemo(() => new THREE.TorusGeometry(radius, 0.04, 16, 100), [radius])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta
    const time = timeRef.current * speed
    rings.forEach((ring, i) => {
      const child = groupRef.current!.children[i] as THREE.Mesh
      if (child) {
        child.rotation.z = ring.rotation[2] + time * 0.5
        child.rotation.x = Math.sin(time * 0.3 + ring.offset) * 0.3
        child.rotation.y = Math.cos(time * 0.3 + ring.offset) * 0.3
      }
    })
  })

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh
          key={i}
          geometry={ringGeometry}
          scale={[ring.scale, ring.scale, ring.scale]}
        >
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15 - i * 0.04}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}