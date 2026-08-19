'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingShapesProps {
  count?: number
  accentColor?: string
}

const geometries = [
  new THREE.IcosahedronGeometry(0.4, 0),
  new THREE.BoxGeometry(0.45, 0.45, 0.45),
  new THREE.TorusGeometry(0.3, 0.1, 8, 12),
  new THREE.ConeGeometry(0.3, 0.6, 6),
  new THREE.OctahedronGeometry(0.35, 0),
]

function Shape({ position, geometry, color, delay }: {
  position: [number, number, number]
  geometry: THREE.BufferGeometry
  color: string
  delay: number
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8} position={position}>
      <mesh geometry={geometry} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} wireframe />
      </mesh>
    </Float>
  )
}

export function FloatingShapes({ count = 12, accentColor = '#7C3AED' }: FloatingShapesProps) {
  const groupRef = useRef<THREE.Group>(null)

  const shapes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      const radius = 3 + Math.random() * 3
      return {
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 5,
          Math.sin(angle) * radius - 2,
        ] as [number, number, number],
        geometry: geometries[i % geometries.length],
        color: new THREE.Color(accentColor)
          .multiplyScalar(0.5 + Math.random() * 0.5)
          .getStyle(),
        delay: i * 0.2,
      }
    })
  }, [count, accentColor])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Shape key={i} {...shape} />
      ))}
    </group>
  )
}