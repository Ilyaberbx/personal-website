import { profile } from '../../data'

export function useHud() {
  return {
    name: profile.name,
    title: profile.title,
  }
}
