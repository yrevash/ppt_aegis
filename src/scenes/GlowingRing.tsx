'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GlowingRingProps {
  color?: string
  radius?: number
  speed?: number
}

export function GlowingRing({ color = '#2563EB', radius = 4, speed = 0.3 }: GlowingRingProps) {
  const ringRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta
    const time = timeRef.current * speed
    if (ringRef.current) {
      ringRef.current.rotation.z = time
      ringRef.current.rotation.x = Math.sin(time * 0.4) * 0.3
      ringRef.current.rotation.y = Math.cos(time * 0.3) * 0.2
    }
    if (glowRef.current) {
      glowRef.current.rotation.z = -time * 0.5
      glowRef.current.rotation.x = Math.sin(time * 0.3) * 0.3
      glowRef.current.rotation.y = Math.cos(time * 0.4) * 0.2
    }
  })

  return (
    <group>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.06, 16, 120]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh ref={glowRef}>
        <torusGeometry args={[radius * 1.1, 0.02, 8, 80]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}