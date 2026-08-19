'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function AegisRing({ color = '#CC785C', radius = 3.5, speed = 0.15 }) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  const segments = 120
  const ringGeo = useMemo(() => new THREE.TorusGeometry(radius, 0.015, 16, segments), [radius])
  const outerGeo = useMemo(() => new THREE.TorusGeometry(radius * 1.25, 0.008, 8, segments * 2), [radius])

  useFrame((_, delta) => {
    timeRef.current += delta
    const t = timeRef.current * speed
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.25
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main ring */}
      <mesh ref={ringRef} geometry={ringGeo} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Outer glow ring */}
      <mesh geometry={outerGeo} rotation={[Math.PI / 2.5, 0.3, 0.1]}>
        <meshBasicMaterial color={color} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Inner ring */}
      <mesh geometry={new THREE.TorusGeometry(radius * 0.75, 0.01, 8, segments)} rotation={[Math.PI / 2.5, 0.6, -0.1]}>
        <meshBasicMaterial color="#5DB8A6" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}