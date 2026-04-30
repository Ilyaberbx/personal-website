import { profile } from '../../data'
import { MAX_LEVEL } from './hud.constants'

export function useHud() {
  const levelPercent = (profile.level / MAX_LEVEL) * 100
  return {
    name: profile.name,
    title: profile.title,
    level: profile.level,
    levelPercent,
  }
}
