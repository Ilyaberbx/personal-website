// Sprite atlas: player (4 directions × 2 frames), NPC, and station structures.
// Player is 16x16 (one tile). Stations are 32x32 (occupy 2x2 tiles visually
// but only the bottom-center tile is the "physical" station tile in the map).
import { PAL, SHADE } from './palette'

export const SPRITE_SIZE = 16
export const STATION_SIZE = 32

type SpriteCanvas = HTMLCanvasElement
const cache = new Map<string, SpriteCanvas>()

function makeCanvas(w: number, h: number): SpriteCanvas {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

function px(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w = 1, h = 1) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

// ─────────────────────── PLAYER ───────────────────────
// Hooded violet adventurer. 4 facings, 2 walk frames each.

export type Facing = 'down' | 'up' | 'left' | 'right'

function paintPlayer(facing: Facing, frame: 0 | 1) {
  const c = makeCanvas(SPRITE_SIZE, SPRITE_SIZE)
  const ctx = c.getContext('2d')!
  ctx.imageSmoothingEnabled = false

  const body = PAL.primary
  const bodyDark = SHADE.primaryDark
  const skin = PAL.text
  const skinShadow = SHADE.borderDim
  const hair = SHADE.bgDark
  const ink = SHADE.ink
  const cape = PAL.secondary
  const capeDark = SHADE.secondaryDark
  const boots = SHADE.bgDark

  // Bob: feet swap by 1px on alternate frame
  const fL = frame === 0 ? 0 : 1
  const fR = frame === 0 ? 1 : 0

  // Head + body silhouette common base
  // Head 6x6 at (5,2)
  px(ctx, hair, 5, 2, 6, 2)
  px(ctx, hair, 4, 3, 1, 3)
  px(ctx, hair, 11, 3, 1, 3)
  px(ctx, skin, 5, 4, 6, 4)
  px(ctx, skinShadow, 5, 7, 6, 1)

  if (facing === 'down') {
    // Eyes
    px(ctx, ink, 6, 5)
    px(ctx, ink, 9, 5)
    // Body (tunic)
    px(ctx, body, 4, 8, 8, 5)
    px(ctx, bodyDark, 4, 12, 8, 1)
    // Belt
    px(ctx, ink, 5, 11, 6, 1)
    // Arms
    px(ctx, skin, 3, 9, 1, 3)
    px(ctx, skin, 12, 9, 1, 3)
    // Legs / boots
    px(ctx, boots, 5 + fL, 13, 2, 2)
    px(ctx, boots, 9 - fR, 13, 2, 2)
    px(ctx, ink, 5 + fL, 15, 2, 1)
    px(ctx, ink, 9 - fR, 15, 2, 1)
  } else if (facing === 'up') {
    // Hair across face from behind
    px(ctx, hair, 5, 4, 6, 3)
    px(ctx, skin, 5, 7, 6, 1)
    // Cape
    px(ctx, cape, 4, 8, 8, 5)
    px(ctx, capeDark, 4, 12, 8, 1)
    px(ctx, body, 5, 11, 6, 1)
    // Arms
    px(ctx, skin, 3, 9, 1, 3)
    px(ctx, skin, 12, 9, 1, 3)
    // Boots
    px(ctx, boots, 5 + fL, 13, 2, 2)
    px(ctx, boots, 9 - fR, 13, 2, 2)
    px(ctx, ink, 5 + fL, 15, 2, 1)
    px(ctx, ink, 9 - fR, 15, 2, 1)
  } else if (facing === 'left') {
    // Profile: eye on left
    px(ctx, ink, 5, 5)
    px(ctx, hair, 9, 3, 2, 4)
    // Body
    px(ctx, body, 4, 8, 7, 5)
    px(ctx, bodyDark, 4, 12, 7, 1)
    px(ctx, ink, 4, 11, 7, 1)
    // Cape trailing right
    px(ctx, cape, 11, 8, 2, 5)
    px(ctx, capeDark, 11, 12, 2, 1)
    // Arm forward
    px(ctx, skin, 3, 9, 1, 2 + fL)
    // Boots
    px(ctx, boots, 5, 13, 2, 2)
    px(ctx, boots, 8, 13, 2, 2)
    px(ctx, ink, 5, 15, 2, 1)
    px(ctx, ink, 8, 15, 2, 1)
    // Frame variation: shift legs slightly
    if (frame === 1) {
      px(ctx, boots, 4, 14, 1, 1)
      px(ctx, boots, 9, 14, 1, 1)
    }
  } else {
    // right (mirror of left)
    px(ctx, ink, 10, 5)
    px(ctx, hair, 5, 3, 2, 4)
    px(ctx, body, 5, 8, 7, 5)
    px(ctx, bodyDark, 5, 12, 7, 1)
    px(ctx, ink, 5, 11, 7, 1)
    px(ctx, cape, 3, 8, 2, 5)
    px(ctx, capeDark, 3, 12, 2, 1)
    px(ctx, skin, 12, 9, 1, 2 + fL)
    px(ctx, boots, 6, 13, 2, 2)
    px(ctx, boots, 9, 13, 2, 2)
    px(ctx, ink, 6, 15, 2, 1)
    px(ctx, ink, 9, 15, 2, 1)
    if (frame === 1) {
      px(ctx, boots, 11, 14, 1, 1)
      px(ctx, boots, 6, 14, 1, 1)
    }
  }
  return c
}

export function getPlayerSprite(facing: Facing, frame: 0 | 1): SpriteCanvas {
  const key = `player:${facing}:${frame}`
  let s = cache.get(key)
  if (!s) {
    s = paintPlayer(facing, frame)
    cache.set(key, s)
  }
  return s
}

// ─────────────────────── NPC (Wandering Bard) ───────────────────────
function paintNpc(): SpriteCanvas {
  const c = makeCanvas(SPRITE_SIZE, SPRITE_SIZE)
  const ctx = c.getContext('2d')!
  // Hat
  px(ctx, SHADE.bgDark, 4, 1, 8, 2)
  px(ctx, PAL.secondary, 5, 0, 6, 1)
  px(ctx, SHADE.flowerYellow, 8, 0, 1, 1)
  // Face
  px(ctx, PAL.text, 5, 3, 6, 4)
  px(ctx, SHADE.borderDim, 5, 7, 6, 1)
  px(ctx, SHADE.ink, 6, 5)
  px(ctx, SHADE.ink, 9, 5)
  // Beard
  px(ctx, PAL.border, 5, 6, 6, 1)
  px(ctx, PAL.border, 6, 7, 4, 1)
  // Robe (lavender)
  px(ctx, PAL.secondary, 4, 8, 8, 6)
  px(ctx, SHADE.secondaryDark, 4, 13, 8, 1)
  // Lute body in arms
  px(ctx, SHADE.treeBark, 11, 10, 3, 3)
  px(ctx, SHADE.flowerYellow, 12, 10, 1, 1)
  // Boots
  px(ctx, SHADE.bgDark, 5, 14, 2, 2)
  px(ctx, SHADE.bgDark, 9, 14, 2, 2)
  return c
}
let npcCache: SpriteCanvas | null = null
export function getNpcSprite(): SpriteCanvas {
  if (!npcCache) npcCache = paintNpc()
  return npcCache
}

// ─────────────────────── STATIONS (32x32) ───────────────────────
type StationSprite = 'tavern' | 'armory' | 'quest-board' | 'trophy-hall' | 'mailbox'

function paintTavern(): SpriteCanvas {
  const c = makeCanvas(STATION_SIZE, STATION_SIZE)
  const ctx = c.getContext('2d')!
  // Roof
  px(ctx, SHADE.primaryDark, 4, 4, 24, 2)
  px(ctx, PAL.primary, 6, 6, 20, 6)
  px(ctx, SHADE.bgDark, 4, 12, 24, 1)
  // Roof shingle highlights
  for (let x = 7; x < 26; x += 4) px(ctx, SHADE.primaryDark, x, 8, 1, 4)
  // Walls
  px(ctx, SHADE.treeBark, 6, 13, 20, 16)
  // Wood grain
  for (let y = 14; y < 28; y += 3) px(ctx, SHADE.bgDark, 7, y, 18, 1)
  // Door
  px(ctx, SHADE.ink, 14, 18, 4, 11)
  px(ctx, SHADE.flowerYellow, 17, 23, 1, 1)
  // Windows
  px(ctx, PAL.secondary, 8, 16, 4, 4)
  px(ctx, PAL.secondary, 20, 16, 4, 4)
  px(ctx, SHADE.flowerYellow, 9, 17, 2, 2)
  px(ctx, SHADE.flowerYellow, 21, 17, 2, 2)
  // Sign
  px(ctx, SHADE.bgDark, 9, 12, 14, 1)
  px(ctx, PAL.border, 11, 13, 10, 2)
  px(ctx, SHADE.bgDark, 12, 13, 1, 2)
  px(ctx, SHADE.bgDark, 14, 13, 1, 2)
  px(ctx, SHADE.bgDark, 16, 13, 1, 2)
  px(ctx, SHADE.bgDark, 18, 13, 1, 2)
  px(ctx, SHADE.bgDark, 19, 13, 1, 2)
  // Ground shadow
  px(ctx, SHADE.shadow, 6, 30, 20, 1)
  return c
}

function paintArmory(): SpriteCanvas {
  const c = makeCanvas(STATION_SIZE, STATION_SIZE)
  const ctx = c.getContext('2d')!
  // Stone roof
  px(ctx, PAL.secondary, 5, 5, 22, 3)
  px(ctx, SHADE.secondaryDark, 5, 8, 22, 2)
  // Battlements
  for (let x = 5; x < 27; x += 4) {
    px(ctx, PAL.secondary, x, 3, 2, 2)
  }
  // Walls (stone block pattern)
  px(ctx, SHADE.borderDim, 5, 10, 22, 19)
  for (let y = 11; y < 28; y += 4) {
    for (let x = 6; x < 26; x += 5) {
      px(ctx, SHADE.bgDark, x, y, 4, 1)
    }
    for (let x = 8; x < 26; x += 5) {
      px(ctx, SHADE.bgDark, x, y + 2, 4, 1)
    }
  }
  for (let y = 10; y < 29; y += 2) px(ctx, SHADE.bgDark, 5, y, 1, 1)
  // Door (iron)
  px(ctx, SHADE.bgDark, 13, 16, 6, 13)
  px(ctx, SHADE.borderDim, 14, 17, 4, 11)
  px(ctx, SHADE.bgDark, 16, 17, 1, 11)
  px(ctx, SHADE.bgDark, 14, 22, 4, 1)
  px(ctx, PAL.text, 17, 22, 1, 1)
  // Crossed swords sign above door
  px(ctx, PAL.text, 12, 12)
  px(ctx, PAL.text, 13, 13)
  px(ctx, PAL.text, 14, 14)
  px(ctx, PAL.text, 15, 15)
  px(ctx, PAL.text, 19, 12)
  px(ctx, PAL.text, 18, 13)
  px(ctx, PAL.text, 17, 14)
  px(ctx, PAL.text, 16, 15)
  px(ctx, SHADE.flowerYellow, 16, 16)
  px(ctx, SHADE.shadow, 5, 30, 22, 1)
  return c
}

function paintQuestBoard(): SpriteCanvas {
  const c = makeCanvas(STATION_SIZE, STATION_SIZE)
  const ctx = c.getContext('2d')!
  // Posts
  px(ctx, SHADE.treeBark, 8, 12, 2, 18)
  px(ctx, SHADE.treeBark, 22, 12, 2, 18)
  // Board
  px(ctx, SHADE.treeBark, 6, 8, 20, 14)
  px(ctx, SHADE.bgDark, 6, 8, 20, 1)
  px(ctx, SHADE.bgDark, 6, 21, 20, 1)
  px(ctx, SHADE.bgDark, 6, 8, 1, 14)
  px(ctx, SHADE.bgDark, 25, 8, 1, 14)
  // Wood planks
  for (let y = 9; y < 21; y += 3) px(ctx, SHADE.bgDark, 7, y, 18, 1)
  // Roof / cap
  px(ctx, SHADE.primaryDark, 4, 6, 24, 2)
  px(ctx, PAL.primary, 4, 4, 24, 2)
  // Pinned papers
  px(ctx, PAL.text, 9, 11, 6, 4)
  px(ctx, SHADE.bgDark, 10, 12, 1)
  px(ctx, SHADE.bgDark, 12, 12, 1)
  px(ctx, SHADE.bgDark, 10, 14, 4, 1)
  px(ctx, SHADE.flowerYellow, 11, 11, 1)
  px(ctx, PAL.border, 17, 12, 7, 5)
  px(ctx, SHADE.bgDark, 18, 13, 5, 1)
  px(ctx, SHADE.bgDark, 18, 15, 4, 1)
  px(ctx, SHADE.flowerPink, 21, 12, 1)
  px(ctx, PAL.text, 12, 17, 6, 3)
  px(ctx, SHADE.bgDark, 13, 18, 4, 1)
  px(ctx, SHADE.shadow, 6, 30, 20, 1)
  return c
}

function paintTrophyHall(): SpriteCanvas {
  const c = makeCanvas(STATION_SIZE, STATION_SIZE)
  const ctx = c.getContext('2d')!
  // Roof / pediment (Greek temple vibe)
  px(ctx, PAL.primary, 6, 8, 20, 2)
  px(ctx, SHADE.primaryDark, 6, 10, 20, 1)
  // Triangular roof
  for (let i = 0; i < 6; i++) {
    px(ctx, PAL.primary, 16 - i, 7 - i, 2 + i * 2, 1)
  }
  // Columns
  px(ctx, PAL.text, 7, 11, 3, 16)
  px(ctx, PAL.text, 12, 11, 3, 16)
  px(ctx, PAL.text, 17, 11, 3, 16)
  px(ctx, PAL.text, 22, 11, 3, 16)
  // Column shadows
  px(ctx, SHADE.borderDim, 9, 11, 1, 16)
  px(ctx, SHADE.borderDim, 14, 11, 1, 16)
  px(ctx, SHADE.borderDim, 19, 11, 1, 16)
  px(ctx, SHADE.borderDim, 24, 11, 1, 16)
  // Base
  px(ctx, PAL.border, 5, 27, 22, 2)
  px(ctx, SHADE.borderDim, 5, 29, 22, 1)
  // Trophy in center
  px(ctx, SHADE.flowerYellow, 14, 14, 4, 5)
  px(ctx, SHADE.bgDark, 13, 14, 1, 3)
  px(ctx, SHADE.bgDark, 18, 14, 1, 3)
  px(ctx, SHADE.flowerYellow, 15, 19, 2, 3)
  px(ctx, SHADE.flowerYellow, 13, 22, 6, 1)
  px(ctx, SHADE.shadow, 5, 30, 22, 1)
  return c
}

function paintMailbox(): SpriteCanvas {
  const c = makeCanvas(STATION_SIZE, STATION_SIZE)
  const ctx = c.getContext('2d')!
  // Post
  px(ctx, SHADE.treeBark, 15, 18, 2, 12)
  // Body
  px(ctx, PAL.primary, 9, 10, 14, 10)
  px(ctx, SHADE.primaryDark, 9, 19, 14, 1)
  px(ctx, SHADE.primaryDark, 9, 10, 14, 1)
  // Rounded top
  px(ctx, PAL.primary, 10, 9, 12, 1)
  px(ctx, PAL.primary, 11, 8, 10, 1)
  // Slot
  px(ctx, SHADE.ink, 12, 13, 8, 1)
  px(ctx, SHADE.ink, 12, 14, 8, 1)
  // Flag
  px(ctx, SHADE.flowerPink, 23, 11, 4, 3)
  px(ctx, SHADE.bgDark, 23, 11, 4, 1)
  px(ctx, SHADE.bgDark, 22, 11, 1, 8)
  // Letter peeking
  px(ctx, PAL.text, 13, 15, 6, 3)
  px(ctx, SHADE.bgDark, 14, 16, 4, 1)
  px(ctx, SHADE.shadow, 8, 30, 16, 1)
  return c
}

const stationPainters: Record<StationSprite, () => SpriteCanvas> = {
  tavern: paintTavern,
  armory: paintArmory,
  'quest-board': paintQuestBoard,
  'trophy-hall': paintTrophyHall,
  mailbox: paintMailbox,
}

export function getStationSprite(name: StationSprite): SpriteCanvas {
  const key = `station:${name}`
  let s = cache.get(key)
  if (!s) {
    s = stationPainters[name]()
    cache.set(key, s)
  }
  return s
}

// ─────────────────────── PROPS ───────────────────────
function paintFountain(): SpriteCanvas {
  const c = makeCanvas(SPRITE_SIZE, SPRITE_SIZE)
  const ctx = c.getContext('2d')!
  px(ctx, SHADE.borderDim, 2, 9, 12, 5)
  px(ctx, PAL.border, 3, 8, 10, 1)
  px(ctx, SHADE.water, 4, 10, 8, 3)
  px(ctx, SHADE.waterDeep, 4, 13, 8, 1)
  px(ctx, PAL.secondary, 5, 11, 1, 1)
  px(ctx, PAL.secondary, 9, 11, 1, 1)
  // Center spout
  px(ctx, PAL.border, 7, 6, 2, 4)
  px(ctx, PAL.text, 7, 4, 2, 2)
  px(ctx, PAL.secondary, 6, 5, 1, 1)
  px(ctx, PAL.secondary, 9, 5, 1, 1)
  return c
}

function paintLamp(): SpriteCanvas {
  const c = makeCanvas(SPRITE_SIZE, SPRITE_SIZE)
  const ctx = c.getContext('2d')!
  px(ctx, SHADE.bgDark, 7, 4, 2, 11)
  px(ctx, SHADE.borderDim, 7, 14, 2, 2)
  px(ctx, PAL.primary, 5, 1, 6, 4)
  px(ctx, SHADE.flowerYellow, 6, 2, 4, 2)
  px(ctx, PAL.text, 7, 2, 2, 1)
  // Glow pixels
  px(ctx, PAL.primary, 4, 2, 1, 1)
  px(ctx, PAL.primary, 11, 2, 1, 1)
  return c
}

const propPainters = {
  fountain: paintFountain,
  lamp: paintLamp,
} as const

export function getPropSprite(name: keyof typeof propPainters): SpriteCanvas {
  const key = `prop:${name}`
  let s = cache.get(key)
  if (!s) {
    s = propPainters[name]()
    cache.set(key, s)
  }
  return s
}
