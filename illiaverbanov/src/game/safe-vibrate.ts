import { Result } from 'neverthrow'
import { VibrationError, coerceErrorMessage } from '../lib/errors'

export function safeVibrate(ms: number): Result<void, VibrationError> {
  return Result.fromThrowable(
    () => {
      const hasNavigator = typeof navigator !== 'undefined'
      const canVibrate = hasNavigator && typeof navigator.vibrate === 'function'
      if (!canVibrate) return
      navigator.vibrate(ms)
    },
    (e) => new VibrationError(coerceErrorMessage(e)),
  )()
}
