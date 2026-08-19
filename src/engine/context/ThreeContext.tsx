'use client'

import tunnel from 'tunnel-rat'
import type { ThreeSceneName } from '../types/slide'

export const threeTunnel = tunnel()

export type { ThreeSceneName } from '../types/slide'

let _onSceneChange: ((scene: ThreeSceneName) => void) | null = null

export function setSceneChangeHandler(handler: (scene: ThreeSceneName) => void) {
  _onSceneChange = handler
}

export function notifySceneChange(scene: ThreeSceneName) {
  _onSceneChange?.(scene)
}