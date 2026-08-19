'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function HexGrid({ color = '#5DB8A6', speed = 0.08 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const timeRef = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const hexGeo = useMemo(() => new THREE.CylinderGeometry(0.25, 0.25, 0.02, 6), [])

  const count = 60
  const positions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const col = i % 8
      const row = Math.floor(i / 8)
      const x = (col - 3.5) * 1.5 + (row % 2) * 0.75
      const y = (row - 3) * 1.3
      const z = -3 + Math.sin(i * 0.5) * 2
      return { x, y, z, delay: Math.random() * Math.PI * 2 }
    })
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    timeRef.current += delta
    const t = timeRef.current * speed
    positions.forEach((pos, i) => {
      dummy.position.set(pos.x, pos.y, pos.z)
      dummy.rotation.set(0, 0, t * 0.3 + pos.delay)
      dummy.scale.setScalar(0.4 + Math.sin(t + pos.delay) * 0.3)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    wireframe: true,
  }), [color])

  return (
    <instancedMesh ref={meshRef} args={[hexGeo, mat, count]} rotation={[0.5, 0, 0]}>
      <cylinderGeometry args={[0.25, 0.25, 0.02, 6]} />
    </instancedMesh>
  )
}