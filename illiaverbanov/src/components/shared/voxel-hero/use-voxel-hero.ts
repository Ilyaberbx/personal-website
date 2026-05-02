import { useEffect, useRef, useState } from 'react'
import type { VoxelModel } from '../../../game/voxel/voxel.types'
import { initVoxelScene, type SceneHandle } from '../../../game/voxel/voxel-scene'

type UseVoxelHeroReturn = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  failed: boolean
}

export function useVoxelHero(model: VoxelModel): UseVoxelHeroReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const result = initVoxelScene(canvas, model)
    if (result.isErr()) {
      setFailed(true)
      return
    }
    const handle: SceneHandle = result.value
    handle.start()
    return () => {
      handle.stop()
      handle.dispose()
    }
  }, [model])

  return { canvasRef, failed }
}
