import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initVoxelScene } from './voxel-scene'
import { ABOUT_VOXEL_MODEL } from './models/about-model'

type AnyFn = (...args: unknown[]) => unknown

function mockWebglContext(): WebGLRenderingContext {
  const noop: AnyFn = () => null
  const handler: ProxyHandler<Record<string, unknown>> = {
    get: (target, prop) => {
      if (prop in target) return target[prop as string]
      if (prop === 'getExtension') {
        return (name: string) => {
          if (name === 'WEBGL_lose_context') return { loseContext: noop, restoreContext: noop }
          return null
        }
      }
      if (prop === 'getParameter') return () => 'WebGL 2.0 (Mock)'
      if (prop === 'getShaderPrecisionFormat') {
        return () => ({ rangeMin: 1, rangeMax: 1, precision: 1 })
      }
      if (
        prop === 'createTexture' ||
        prop === 'createBuffer' ||
        prop === 'createProgram' ||
        prop === 'createShader' ||
        prop === 'createFramebuffer' ||
        prop === 'createRenderbuffer' ||
        prop === 'createVertexArray'
      ) {
        return () => ({})
      }
      if (prop === 'getContextAttributes') return () => ({})
      if (prop === 'getSupportedExtensions') return () => []
      if (prop === 'canvas') return target.canvas
      return noop
    },
  }
  const ctx = new Proxy({} as Record<string, unknown>, handler)
  return ctx as unknown as WebGLRenderingContext
}

describe('voxel scene engine', () => {
  let originalGetContext: typeof HTMLCanvasElement.prototype.getContext
  let rafSpy: ReturnType<typeof vi.spyOn>
  let cancelSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    originalGetContext = HTMLCanvasElement.prototype.getContext
    const fakeGetContext = function (this: HTMLCanvasElement): unknown {
      const ctx = mockWebglContext() as unknown as Record<string, unknown>
      ctx.canvas = this
      return ctx
    }
    HTMLCanvasElement.prototype.getContext =
      fakeGetContext as unknown as typeof HTMLCanvasElement.prototype.getContext
    rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation(() => 42)
    cancelSpy = vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext
    rafSpy.mockRestore()
    cancelSpy.mockRestore()
  })

  it('init returns ok and start schedules a frame, dispose cancels it', () => {
    const canvas = document.createElement('canvas')
    const result = initVoxelScene(canvas, ABOUT_VOXEL_MODEL)
    expect(result.isOk()).toBe(true)
    if (!result.isOk()) return
    const handle = result.value
    handle.start()
    expect(rafSpy).toHaveBeenCalled()
    handle.dispose()
    expect(cancelSpy).toHaveBeenCalledWith(42)
  })
})
