export interface CameraTarget {
  position: [number, number, number]
  lookAt: [number, number, number]
}

export interface ThreeSceneConfig {
  name: string
  cameraTarget: CameraTarget
  backgroundColor: string
}

export const SCENE_CAMERA_TARGETS: Record<string, CameraTarget> = {
  particles: {
    position: [0, 0, 8],
    lookAt: [0, 0, 0],
  },
  shapes: {
    position: [3, 2, 10],
    lookAt: [0, 0, 0],
  },
  wave: {
    position: [0, 3, 12],
    lookAt: [0, 0, 0],
  },
  trail: {
    position: [0, 2, 8],
    lookAt: [0, 0, 0],
  },
  ring: {
    position: [0, 0, 6],
    lookAt: [0, 0, 0],
  },
  none: {
    position: [0, 0, 8],
    lookAt: [0, 0, 0],
  },
}