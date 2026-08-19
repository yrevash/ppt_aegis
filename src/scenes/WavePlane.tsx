'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface WavePlaneProps {
  color?: string
  amplitude?: number
  frequency?: number
  speed?: number
}

export function WavePlane({
  color = '#2563EB',
  amplitude = 0.4,
  frequency = 2,
  speed = 1,
}: WavePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(14, 8, 80, 40)
    geo.rotateX(-Math.PI / 2.5)
    return geo
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    timeRef.current += delta
    const time = timeRef.current * speed
    const pos = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      pos.setZ(
        i,
        Math.sin(x * frequency + time) * amplitude +
          Math.cos(y * frequency * 0.7 + time * 0.8) * amplitude * 0.5,
      )
    }
    pos.needsUpdate = true
    meshRef.current.geometry.computeVertexNormals()
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -1, -2]}>
      <meshStandardMaterial
        color={color}
        roughness={0.6}
        metalness={0.2}
        transparent
        opacity={0.15}
        wireframe
      />
    </mesh>
  )
}