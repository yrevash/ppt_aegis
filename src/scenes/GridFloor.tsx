'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function GridFloor({ color = '#CC785C', speed = 0.1 }) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  const lines = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const offset = (i - 7.5) * 1.5
      const isHoriz = i < 8
      const pts = isHoriz
        ? [new THREE.Vector3(-10, offset - 4, -4), new THREE.Vector3(10, offset - 4, -4)]
        : [new THREE.Vector3(offset - 10, -12, -4), new THREE.Vector3(offset - 10, 12, -4)]
      return {
        geometry: new THREE.BufferGeometry().setFromPoints(pts),
        offset: isHoriz ? offset : offset * 0.7,
      }
    })
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta
    const t = timeRef.current * speed
    groupRef.current.rotation.x = 0.8 + Math.sin(t * 0.2) * 0.05
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.05
  })

  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.04,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [color])

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <lineSegments key={i} geometry={line.geometry} material={mat} />
      ))}
    </group>
  )
}