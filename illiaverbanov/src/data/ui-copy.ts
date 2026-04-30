import type { ControlLegendItem } from './types'

export const UI_COPY = {
  intro: {
    cta: 'PRESS ANY KEY',
    eraSuffix: 'since 2021',
  },
  controls: {
    legend: [
      { key: 'WASD', label: 'move' },
      { key: 'E / ␣', label: 'interact' },
      { key: 'ESC', label: 'close' },
    ] satisfies ControlLegendItem[],
  },
  world: {
    canvasAria:
      'Pixel-art world. Drag to walk, tap a building to enter, or use WASD on desktop.',
    hintDesktop: 'WASD / Arrows · [E] interact · [Esc] close',
    hintTouch: 'Drag to walk · tap a building to enter',
  },
  dialog: {
    interactKey: '[E]',
  },
  npc: {
    btnNext: 'Next ▼',
    btnFarewell: 'Farewell ▶',
  },
  contact: {
    intro: 'Send a raven. I respond within a day or two.',
    availability: {
      lead: 'Currently working at',
      org: 'Decentra',
      tail: '— open to interesting Web3 / fullstack collaborations and contracts.',
    },
  },
  touchpad: {
    aria: {
      up: 'Move up',
      down: 'Move down',
      left: 'Move left',
      right: 'Move right',
      action: 'Interact',
    },
  },
} as const
