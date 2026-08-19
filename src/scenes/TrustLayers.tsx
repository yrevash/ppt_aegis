'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TrustLayersProps {
  layers?: number
  colors?: string[]
  speed?: number
}

export function TrustLayers({
  layers = 6,
  colors = ['#CC785C', '#E8A55A', '#5DB8A6', '#CC785C', '#E8A55A', '#5DB8A6'],
  speed = 0.1,
}: TrustLayersProps) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  const rings = useMemo(() => {
    return Array.from({ length: layers }, (_, i) => {
      const radius = 1.2 + i * 0.7
      const tube = 0.008 + i * 0.002
      return { geometry: new THREE.TorusGeometry(radius, tube, 8, 80 + i * 20), radius, color: colors[i % colors.length] }
    })
  }, [layers, colors])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta
    const t = timeRef.current * speed
    rings.forEach((ring, i) => {
      const child = groupRef.current!.children[i] as THREE.Mesh
      if (child) {
        child.rotation.z = t * (0.3 + i * 0.1)
        child.rotation.x = Math.sin(t * 0.4 + i) * (0.15 + i * 0.05)
        child.rotation.y = Math.cos(t * 0.35 + i) * (0.15 + i * 0.05)
      }
    })
  })

  return (
    <group ref={groupRef} position={[0, 0.5, -1]}>
      {rings.map((ring, i) => (
        <mesh key={i} geometry={ring.geometry}>
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.08 + i * 0.03}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}