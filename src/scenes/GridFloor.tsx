'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** A cold receding grid. Backdrop for the part of the talk about the problem. */
export function GridFloor({ animate = true }: { animate?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const elapsed = useRef(0)

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i < 8; i++) {
      const y = (i - 3.5) * 1.5 - 4
      points.push(new THREE.Vector3(-10, y, -4), new THREE.Vector3(10, y, -4))
    }
    for (let i = 0; i < 8; i++) {
      const x = (i - 3.5) * 1.5
      points.push(new THREE.Vector3(x, -12, -4), new THREE.Vector3(x, 12, -4))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#cc785c',
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  )

  useFrame((_, delta) => {
    if (!animate || !group.current) return
    elapsed.current += delta
    const t = elapsed.current * 0.1
    group.current.rotation.x = 0.8 + Math.sin(t * 0.2) * 0.05
    group.current.rotation.y = Math.sin(t * 0.15) * 0.05
  })

  return (
    <group ref={group} rotation={[0.8, 0, 0]}>
      <lineSegments geometry={geometry} material={material} />
    </group>
  )
}
