export class VibrationError extends Error {
  readonly kind = 'vibration' as const

  constructor(message: string) {
    super(message)
    this.name = 'VibrationError'
  }
}

export class PointerCaptureError extends Error {
  readonly kind = 'pointer-capture' as const

  constructor(message: string) {
    super(message)
    this.name = 'PointerCaptureError'
  }
}

export function coerceErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message
  return String(e)
}
