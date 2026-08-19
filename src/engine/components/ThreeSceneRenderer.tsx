'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { AegisRing } from '@/scenes/AegisRing'
import { TrustLayers } from '@/scenes/TrustLayers'
import { DataFlow } from '@/scenes/DataFlow'
import { HexGrid } from '@/scenes/HexGrid'
import { GridFloor } from '@/scenes/GridFloor'
import type { ThreeSceneName } from '../types/slide'
import type { CameraTarget } from '../types/three'

interface ThreeSceneRendererProps {
  sceneName: ThreeSceneName
  cameraTarget?: CameraTarget
}

function CameraAnimator({ target }: { target: CameraTarget }) {
  const { camera } = useThree()
  const { posX, posY, posZ, lookX, lookY, lookZ } = useSpring({
    posX: target.position[0],
    posY: target.position[1],
    posZ: target.position[2],
    lookX: target.lookAt[0],
    lookY: target.lookAt[1],
    lookZ: target.lookAt[2],
    config: { mass: 1.5, tension: 100, friction: 26 },
  })

  useFrame(() => {
    camera.position.set(posX.get(), posY.get(), posZ.get())
    camera.lookAt(lookX.get(), lookY.get(), lookZ.get())
  })

  return null
}

function SceneContent({ sceneName }: { sceneName: ThreeSceneName }) {
  switch (sceneName) {
    case 'particles':
      return <DataFlow color="#CC785C" count={180} />
    case 'shapes':
      return <AegisRing color="#CC785C" radius={3.5} />
    case 'wave':
      return <TrustLayers layers={6} />
    case 'trail':
      return <HexGrid color="#5DB8A6" />
    case 'ring':
      return <GridFloor color="#CC785C" />
    default:
      return <DataFlow color="#CC785C" count={100} />
  }
}

export function ThreeSceneRenderer({ sceneName, cameraTarget }: ThreeSceneRendererProps) {
  const target = cameraTarget ?? { position: [0, 0, 8], lookAt: [0, 0, 0] }

  return (
    <>
      <CameraAnimator target={target} />
      <SceneContent sceneName={sceneName} />
    </>
  )
}