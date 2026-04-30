import { Result } from 'neverthrow'
import { PointerCaptureError, coerceErrorMessage } from './errors'

export function safeSetPointerCapture(
  el: Element,
  pointerId: number,
): Result<void, PointerCaptureError> {
  return Result.fromThrowable(
    () => {
      el.setPointerCapture(pointerId)
    },
    (e) => new PointerCaptureError(coerceErrorMessage(e)),
  )()
}

export function safeHasPointerCapture(
  el: Element,
  pointerId: number,
): Result<boolean, PointerCaptureError> {
  return Result.fromThrowable(
    () => el.hasPointerCapture(pointerId),
    (e) => new PointerCaptureError(coerceErrorMessage(e)),
  )()
}

export function safeReleasePointerCapture(
  el: Element,
  pointerId: number,
): Result<void, PointerCaptureError> {
  return Result.fromThrowable(
    () => {
      el.releasePointerCapture(pointerId)
    },
    (e) => new PointerCaptureError(coerceErrorMessage(e)),
  )()
}
