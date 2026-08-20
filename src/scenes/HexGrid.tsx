'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 60
const COLUMNS = 8

/** A field of hex cells. Backdrop for the module catalogue. */
export function HexGrid({ animate = true }: { animate?: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const elapsed = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const geometry = useMemo(() => new THREE.CylinderGeometry(0.25, 0.25, 0.02, 6), [])
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#5db8a6',
        transparent: true,
        opacity: 0.022,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        wireframe: true,
      }),
    [],
  )

  const cells = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const col = i % COLUMNS
        const row = Math.floor(i / COLUMNS)
        return {
          x: (col - 3.5) * 1.5 + (row % 2) * 0.75,
          y: (row - 3) * 1.3,
          // Flat, and set well back. Varying z per cell scattered the field
          // into what read as debris across the slide rather than a grid.
          z: -7,
          // Deterministic phase offset, so the field breathes unevenly but
          // identically on every run.
          phase: (i * 2.399963) % (Math.PI * 2),
        }
      }),
    [],
  )

  // Place the cells once so the scene is composed even when motion is off.
  useLayoutEffect(() => {
    if (!mesh.current) return
    cells.forEach((cell, i) => {
      dummy.position.set(cell.x, cell.y, cell.z)
      // Faces turned to the camera, so the field reads as a honeycomb
      // rather than as edge-on slivers scattered over the slide.
      dummy.rotation.set(Math.PI / 2, 0, cell.phase)
      dummy.scale.setScalar(0.85)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  }, [cells, dummy])

  useFrame((_, delta) => {
    if (!animate || !mesh.current) return
    elapsed.current += delta
    const t = elapsed.current * 0.08
    cells.forEach((cell, i) => {
      dummy.position.set(cell.x, cell.y, cell.z)
      dummy.rotation.set(Math.PI / 2, 0, cell.phase)
      dummy.scale.setScalar(0.85 + Math.sin(t + cell.phase) * 0.12)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  // Geometry and material come through args. The previous version passed them
  // here and also nested a <cylinderGeometry> child, which fought over the
  // same slot.
  return <instancedMesh ref={mesh} args={[geometry, material, COUNT]} />
}
