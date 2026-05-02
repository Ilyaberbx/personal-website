import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  InstancedMesh,
  MeshLambertMaterial,
  Object3D,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import { Result } from 'neverthrow'
import { PAL, SHADE, type PaletteKey } from '../palette'
import { VoxelHeroInitError } from './voxel-errors'
import type { VoxelModel } from './voxel.types'

const INTERNAL_RES = 160
const FIT_MARGIN = 1.1
const ROTATION_SPEED_RAD_PER_SEC = 0.5
const KEY_LIGHT_COLOR = 0xffe6c2
const FILL_LIGHT_COLOR = 0x9bb6ff
const AMBIENT_COLOR = 0x404060

export type SceneHandle = {
  start: () => void
  stop: () => void
  dispose: () => void
  setModel: (model: VoxelModel) => void
}

type Internals = {
  renderer: WebGLRenderer
  scene: Scene
  camera: OrthographicCamera
  mesh: InstancedMesh | null
  geometry: BoxGeometry
  material: MeshLambertMaterial
  rafId: number
  lastTime: number
  rotationY: number
  resizeObserver: ResizeObserver | null
  canvas: HTMLCanvasElement
  disposed: boolean
}

function paletteColor(key: PaletteKey): string {
  if (key in PAL) return PAL[key as keyof typeof PAL]
  return SHADE[key as keyof typeof SHADE]
}

function createRenderer(canvas: HTMLCanvasElement): Result<WebGLRenderer, VoxelHeroInitError> {
  const create = Result.fromThrowable(
    () =>
      new WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        premultipliedAlpha: true,
      }),
    (e) => new VoxelHeroInitError(e instanceof Error ? e.message : String(e)),
  )
  return create()
}

function recenterAndFit(model: VoxelModel, camera: OrthographicCamera): { cx: number; cy: number; cz: number } {
  let minX = Infinity
  let minY = Infinity
  let minZ = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let maxZ = -Infinity
  for (const v of model.voxels) {
    if (v.x < minX) minX = v.x
    if (v.y < minY) minY = v.y
    if (v.z < minZ) minZ = v.z
    if (v.x > maxX) maxX = v.x
    if (v.y > maxY) maxY = v.y
    if (v.z > maxZ) maxZ = v.z
  }
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  const cz = (minZ + maxZ) / 2
  const width = maxX - minX + 1
  const height = maxY - minY + 1
  const depth = maxZ - minZ + 1
  const largest = Math.max(width, height, depth)
  const halfFit = (largest * FIT_MARGIN) / 2
  camera.left = -halfFit
  camera.right = halfFit
  camera.top = halfFit
  camera.bottom = -halfFit
  camera.near = -100
  camera.far = 100
  camera.updateProjectionMatrix()
  return { cx, cy, cz }
}

function buildMesh(
  model: VoxelModel,
  geometry: BoxGeometry,
  material: MeshLambertMaterial,
  centre: { cx: number; cy: number; cz: number },
): InstancedMesh {
  const mesh = new InstancedMesh(geometry, material, model.voxels.length)
  const dummy = new Object3D()
  const color = new Color()
  model.voxels.forEach((voxel, i) => {
    dummy.position.set(voxel.x - centre.cx, voxel.y - centre.cy, voxel.z - centre.cz)
    dummy.updateMatrix()
    mesh.setMatrixAt(i, dummy.matrix)
    color.set(paletteColor(voxel.color))
    mesh.setColorAt(i, color)
  })
  mesh.instanceMatrix.needsUpdate = true
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  return mesh
}

function disposeMesh(internals: Internals): void {
  if (!internals.mesh) return
  internals.scene.remove(internals.mesh)
  internals.mesh.dispose()
  internals.mesh = null
}

function setModelOn(internals: Internals, model: VoxelModel): void {
  disposeMesh(internals)
  const centre = recenterAndFit(model, internals.camera)
  internals.mesh = buildMesh(model, internals.geometry, internals.material, centre)
  internals.scene.add(internals.mesh)
}

function tick(internals: Internals, now: number): void {
  if (internals.disposed) return
  const dt = internals.lastTime === 0 ? 0 : (now - internals.lastTime) / 1000
  internals.lastTime = now
  internals.rotationY += ROTATION_SPEED_RAD_PER_SEC * dt
  if (internals.mesh) internals.mesh.rotation.y = internals.rotationY
  internals.renderer.render(internals.scene, internals.camera)
  internals.rafId = requestAnimationFrame((t) => tick(internals, t))
}

function syncSize(internals: Internals): void {
  internals.renderer.setPixelRatio(1)
  internals.renderer.setSize(INTERNAL_RES, INTERNAL_RES, false)
}

function attachResizeObserver(internals: Internals): ResizeObserver | null {
  if (typeof ResizeObserver === 'undefined') return null
  const observer = new ResizeObserver(() => syncSize(internals))
  observer.observe(internals.canvas)
  return observer
}

export function initVoxelScene(
  canvas: HTMLCanvasElement,
  model: VoxelModel,
): Result<SceneHandle, VoxelHeroInitError> {
  return createRenderer(canvas).map((renderer) => {
    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, -100, 100)
    camera.position.set(8, 8, 8)
    camera.lookAt(0, 0, 0)

    const ambient = new AmbientLight(AMBIENT_COLOR, 0.6)
    const key = new DirectionalLight(KEY_LIGHT_COLOR, 1.0)
    key.position.set(4, 6, 3)
    const fill = new DirectionalLight(FILL_LIGHT_COLOR, 0.5)
    fill.position.set(-3, 2, -4)
    scene.add(ambient, key, fill)

    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshLambertMaterial({ vertexColors: false })

    const internals: Internals = {
      renderer,
      scene,
      camera,
      mesh: null,
      geometry,
      material,
      rafId: 0,
      lastTime: 0,
      rotationY: 0,
      resizeObserver: null,
      canvas,
      disposed: false,
    }

    syncSize(internals)
    setModelOn(internals, model)
    internals.resizeObserver = attachResizeObserver(internals)

    return {
      start: () => {
        if (internals.disposed) return
        if (internals.rafId !== 0) return
        internals.lastTime = 0
        internals.rafId = requestAnimationFrame((t) => tick(internals, t))
      },
      stop: () => {
        if (internals.rafId === 0) return
        cancelAnimationFrame(internals.rafId)
        internals.rafId = 0
      },
      dispose: () => {
        if (internals.disposed) return
        internals.disposed = true
        if (internals.rafId !== 0) {
          cancelAnimationFrame(internals.rafId)
          internals.rafId = 0
        }
        internals.resizeObserver?.disconnect()
        disposeMesh(internals)
        internals.geometry.dispose()
        internals.material.dispose()
        internals.renderer.dispose()
        const ctx = internals.renderer.getContext()
        const lose = ctx.getExtension('WEBGL_lose_context')
        lose?.loseContext()
      },
      setModel: (m: VoxelModel) => {
        if (internals.disposed) return
        setModelOn(internals, m)
      },
    }
  })
}

export { VoxelHeroInitError } from './voxel-errors'
