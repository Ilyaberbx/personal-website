import { PAL, SHADE } from './palette'

export const SPRITE_SIZE = 16
export const STATION_SIZE = 32

type SpriteCanvas = HTMLCanvasElement
const cache = new Map<string, SpriteCanvas>()

function makeCanvas(w: number, h: number): SpriteCanvas {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  return canvas
}

function paintPx(
  ctx: CanvasRenderingContext2D,
  color: string,
  x: number,
  y: number,
  w = 1,
  h = 1,
) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

export type Facing = 'down' | 'up' | 'left' | 'right'

const PLAYER_COLORS = {
  body: PAL.primary,
  bodyDark: SHADE.primaryDark,
  skin: PAL.text,
  skinShadow: SHADE.borderDim,
  hair: SHADE.bgDark,
  ink: SHADE.ink,
  cape: PAL.secondary,
  capeDark: SHADE.secondaryDark,
  boots: SHADE.bgDark,
} as const

function paintPlayerHair(ctx: CanvasRenderingContext2D) {
  const { hair, skin, skinShadow } = PLAYER_COLORS
  paintPx(ctx, hair, 5, 2, 6, 2)
  paintPx(ctx, hair, 4, 3, 1, 3)
  paintPx(ctx, hair, 11, 3, 1, 3)
  paintPx(ctx, skin, 5, 4, 6, 4)
  paintPx(ctx, skinShadow, 5, 7, 6, 1)
}

function paintPlayerFacingDown(
  ctx: CanvasRenderingContext2D,
  leftFootOffsetX: number,
  rightFootOffsetX: number,
) {
  const { body, bodyDark, skin, ink, boots } = PLAYER_COLORS
  paintPx(ctx, ink, 6, 5)
  paintPx(ctx, ink, 9, 5)
  paintPx(ctx, body, 4, 8, 8, 5)
  paintPx(ctx, bodyDark, 4, 12, 8, 1)
  paintPx(ctx, ink, 5, 11, 6, 1)
  paintPx(ctx, skin, 3, 9, 1, 3)
  paintPx(ctx, skin, 12, 9, 1, 3)
  paintPx(ctx, boots, 5 + leftFootOffsetX, 13, 2, 2)
  paintPx(ctx, boots, 9 - rightFootOffsetX, 13, 2, 2)
  paintPx(ctx, ink, 5 + leftFootOffsetX, 15, 2, 1)
  paintPx(ctx, ink, 9 - rightFootOffsetX, 15, 2, 1)
}

function paintPlayerFacingUp(
  ctx: CanvasRenderingContext2D,
  leftFootOffsetX: number,
  rightFootOffsetX: number,
) {
  const { body, cape, capeDark, skin, hair, ink, boots } = PLAYER_COLORS
  paintPx(ctx, hair, 5, 4, 6, 3)
  paintPx(ctx, skin, 5, 7, 6, 1)
  paintPx(ctx, cape, 4, 8, 8, 5)
  paintPx(ctx, capeDark, 4, 12, 8, 1)
  paintPx(ctx, body, 5, 11, 6, 1)
  paintPx(ctx, skin, 3, 9, 1, 3)
  paintPx(ctx, skin, 12, 9, 1, 3)
  paintPx(ctx, boots, 5 + leftFootOffsetX, 13, 2, 2)
  paintPx(ctx, boots, 9 - rightFootOffsetX, 13, 2, 2)
  paintPx(ctx, ink, 5 + leftFootOffsetX, 15, 2, 1)
  paintPx(ctx, ink, 9 - rightFootOffsetX, 15, 2, 1)
}

function paintPlayerFacingLeft(
  ctx: CanvasRenderingContext2D,
  leftFootOffsetX: number,
  frame: 0 | 1,
) {
  const { body, bodyDark, cape, capeDark, skin, hair, ink, boots } = PLAYER_COLORS
  paintPx(ctx, ink, 5, 5)
  paintPx(ctx, hair, 9, 3, 2, 4)
  paintPx(ctx, body, 4, 8, 7, 5)
  paintPx(ctx, bodyDark, 4, 12, 7, 1)
  paintPx(ctx, ink, 4, 11, 7, 1)
  paintPx(ctx, cape, 11, 8, 2, 5)
  paintPx(ctx, capeDark, 11, 12, 2, 1)
  paintPx(ctx, skin, 3, 9, 1, 2 + leftFootOffsetX)
  paintPx(ctx, boots, 5, 13, 2, 2)
  paintPx(ctx, boots, 8, 13, 2, 2)
  paintPx(ctx, ink, 5, 15, 2, 1)
  paintPx(ctx, ink, 8, 15, 2, 1)
  if (frame === 1) {
    paintPx(ctx, boots, 4, 14, 1, 1)
    paintPx(ctx, boots, 9, 14, 1, 1)
  }
}

function paintPlayerFacingRight(
  ctx: CanvasRenderingContext2D,
  leftFootOffsetX: number,
  frame: 0 | 1,
) {
  const { body, bodyDark, cape, capeDark, skin, hair, ink, boots } = PLAYER_COLORS
  paintPx(ctx, ink, 10, 5)
  paintPx(ctx, hair, 5, 3, 2, 4)
  paintPx(ctx, body, 5, 8, 7, 5)
  paintPx(ctx, bodyDark, 5, 12, 7, 1)
  paintPx(ctx, ink, 5, 11, 7, 1)
  paintPx(ctx, cape, 3, 8, 2, 5)
  paintPx(ctx, capeDark, 3, 12, 2, 1)
  paintPx(ctx, skin, 12, 9, 1, 2 + leftFootOffsetX)
  paintPx(ctx, boots, 6, 13, 2, 2)
  paintPx(ctx, boots, 9, 13, 2, 2)
  paintPx(ctx, ink, 6, 15, 2, 1)
  paintPx(ctx, ink, 9, 15, 2, 1)
  if (frame === 1) {
    paintPx(ctx, boots, 11, 14, 1, 1)
    paintPx(ctx, boots, 6, 14, 1, 1)
  }
}

function paintPlayer(facing: Facing, frame: 0 | 1) {
  const canvas = makeCanvas(SPRITE_SIZE, SPRITE_SIZE)
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = false

  const leftFootOffsetX = frame === 0 ? 0 : 1
  const rightFootOffsetX = frame === 0 ? 1 : 0

  paintPlayerHair(ctx)
  if (facing === 'down') paintPlayerFacingDown(ctx, leftFootOffsetX, rightFootOffsetX)
  else if (facing === 'up') paintPlayerFacingUp(ctx, leftFootOffsetX, rightFootOffsetX)
  else if (facing === 'left') paintPlayerFacingLeft(ctx, leftFootOffsetX, frame)
  else paintPlayerFacingRight(ctx, leftFootOffsetX, frame)

  return canvas
}

export function getPlayerSprite(facing: Facing, frame: 0 | 1): SpriteCanvas {
  const key = `player:${facing}:${frame}`
  const cached = cache.get(key)
  if (cached) return cached
  const sprite = paintPlayer(facing, frame)
  cache.set(key, sprite)
  return sprite
}

function paintBard(): SpriteCanvas {
  const canvas = makeCanvas(SPRITE_SIZE, SPRITE_SIZE)
  const ctx = canvas.getContext('2d')!
  paintPx(ctx, SHADE.bgDark, 4, 1, 8, 2)
  paintPx(ctx, PAL.secondary, 5, 0, 6, 1)
  paintPx(ctx, SHADE.flowerYellow, 8, 0, 1, 1)
  paintPx(ctx, PAL.text, 5, 3, 6, 4)
  paintPx(ctx, SHADE.borderDim, 5, 7, 6, 1)
  paintPx(ctx, SHADE.ink, 6, 5)
  paintPx(ctx, SHADE.ink, 9, 5)
  paintPx(ctx, PAL.border, 5, 6, 6, 1)
  paintPx(ctx, PAL.border, 6, 7, 4, 1)
  paintPx(ctx, PAL.secondary, 4, 8, 8, 6)
  paintPx(ctx, SHADE.secondaryDark, 4, 13, 8, 1)
  paintPx(ctx, SHADE.treeBark, 11, 10, 3, 3)
  paintPx(ctx, SHADE.flowerYellow, 12, 10, 1, 1)
  paintPx(ctx, SHADE.bgDark, 5, 14, 2, 2)
  paintPx(ctx, SHADE.bgDark, 9, 14, 2, 2)
  return canvas
}

let bardSpriteCache: SpriteCanvas | null = null

export function getNpcSprite(): SpriteCanvas {
  if (!bardSpriteCache) bardSpriteCache = paintBard()
  return bardSpriteCache
}

type StationSprite = 'tavern' | 'armory' | 'quest-board' | 'trophy-hall' | 'mailbox'

function paintTavernRoof(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, SHADE.primaryDark, 4, 4, 24, 2)
  paintPx(ctx, PAL.primary, 6, 6, 20, 6)
  paintPx(ctx, SHADE.bgDark, 4, 12, 24, 1)
  for (let shingleX = 7; shingleX < 26; shingleX += 4) {
    paintPx(ctx, SHADE.primaryDark, shingleX, 8, 1, 4)
  }
}

function paintTavernWalls(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, SHADE.treeBark, 6, 13, 20, 16)
  for (let grainY = 14; grainY < 28; grainY += 3) {
    paintPx(ctx, SHADE.bgDark, 7, grainY, 18, 1)
  }
}

function paintTavernDoorAndWindows(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, SHADE.ink, 14, 18, 4, 11)
  paintPx(ctx, SHADE.flowerYellow, 17, 23, 1, 1)
  paintPx(ctx, PAL.secondary, 8, 16, 4, 4)
  paintPx(ctx, PAL.secondary, 20, 16, 4, 4)
  paintPx(ctx, SHADE.flowerYellow, 9, 17, 2, 2)
  paintPx(ctx, SHADE.flowerYellow, 21, 17, 2, 2)
}

function paintTavernSign(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, SHADE.bgDark, 9, 12, 14, 1)
  paintPx(ctx, PAL.border, 11, 13, 10, 2)
  for (const inkX of [12, 14, 16, 18, 19]) paintPx(ctx, SHADE.bgDark, inkX, 13, 1, 2)
}

function paintGroundShadow(ctx: CanvasRenderingContext2D, x: number, w: number) {
  paintPx(ctx, SHADE.shadow, x, 30, w, 1)
}

function paintTavern(): SpriteCanvas {
  const canvas = makeCanvas(STATION_SIZE, STATION_SIZE)
  const ctx = canvas.getContext('2d')!
  paintTavernRoof(ctx)
  paintTavernWalls(ctx)
  paintTavernDoorAndWindows(ctx)
  paintTavernSign(ctx)
  paintGroundShadow(ctx, 6, 20)
  return canvas
}

function paintArmoryRoof(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, PAL.secondary, 5, 5, 22, 3)
  paintPx(ctx, SHADE.secondaryDark, 5, 8, 22, 2)
  for (let battlementX = 5; battlementX < 27; battlementX += 4) {
    paintPx(ctx, PAL.secondary, battlementX, 3, 2, 2)
  }
}

function paintArmoryStoneWalls(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, SHADE.borderDim, 5, 10, 22, 19)
  for (let courseY = 11; courseY < 28; courseY += 4) {
    for (let stoneX = 6; stoneX < 26; stoneX += 5) {
      paintPx(ctx, SHADE.bgDark, stoneX, courseY, 4, 1)
    }
    for (let stoneX = 8; stoneX < 26; stoneX += 5) {
      paintPx(ctx, SHADE.bgDark, stoneX, courseY + 2, 4, 1)
    }
  }
  for (let edgeY = 10; edgeY < 29; edgeY += 2) {
    paintPx(ctx, SHADE.bgDark, 5, edgeY, 1, 1)
  }
}

function paintArmoryDoor(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, SHADE.bgDark, 13, 16, 6, 13)
  paintPx(ctx, SHADE.borderDim, 14, 17, 4, 11)
  paintPx(ctx, SHADE.bgDark, 16, 17, 1, 11)
  paintPx(ctx, SHADE.bgDark, 14, 22, 4, 1)
  paintPx(ctx, PAL.text, 17, 22, 1, 1)
}

function paintArmoryCrossedSwords(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, PAL.text, 12, 12)
  paintPx(ctx, PAL.text, 13, 13)
  paintPx(ctx, PAL.text, 14, 14)
  paintPx(ctx, PAL.text, 15, 15)
  paintPx(ctx, PAL.text, 19, 12)
  paintPx(ctx, PAL.text, 18, 13)
  paintPx(ctx, PAL.text, 17, 14)
  paintPx(ctx, PAL.text, 16, 15)
  paintPx(ctx, SHADE.flowerYellow, 16, 16)
}

function paintArmory(): SpriteCanvas {
  const canvas = makeCanvas(STATION_SIZE, STATION_SIZE)
  const ctx = canvas.getContext('2d')!
  paintArmoryRoof(ctx)
  paintArmoryStoneWalls(ctx)
  paintArmoryDoor(ctx)
  paintArmoryCrossedSwords(ctx)
  paintGroundShadow(ctx, 5, 22)
  return canvas
}

function paintQuestBoardFrame(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, SHADE.treeBark, 8, 12, 2, 18)
  paintPx(ctx, SHADE.treeBark, 22, 12, 2, 18)
  paintPx(ctx, SHADE.treeBark, 6, 8, 20, 14)
  paintPx(ctx, SHADE.bgDark, 6, 8, 20, 1)
  paintPx(ctx, SHADE.bgDark, 6, 21, 20, 1)
  paintPx(ctx, SHADE.bgDark, 6, 8, 1, 14)
  paintPx(ctx, SHADE.bgDark, 25, 8, 1, 14)
  for (let plankY = 9; plankY < 21; plankY += 3) {
    paintPx(ctx, SHADE.bgDark, 7, plankY, 18, 1)
  }
  paintPx(ctx, SHADE.primaryDark, 4, 6, 24, 2)
  paintPx(ctx, PAL.primary, 4, 4, 24, 2)
}

function paintQuestBoardPapers(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, PAL.text, 9, 11, 6, 4)
  paintPx(ctx, SHADE.bgDark, 10, 12, 1)
  paintPx(ctx, SHADE.bgDark, 12, 12, 1)
  paintPx(ctx, SHADE.bgDark, 10, 14, 4, 1)
  paintPx(ctx, SHADE.flowerYellow, 11, 11, 1)
  paintPx(ctx, PAL.border, 17, 12, 7, 5)
  paintPx(ctx, SHADE.bgDark, 18, 13, 5, 1)
  paintPx(ctx, SHADE.bgDark, 18, 15, 4, 1)
  paintPx(ctx, SHADE.flowerPink, 21, 12, 1)
  paintPx(ctx, PAL.text, 12, 17, 6, 3)
  paintPx(ctx, SHADE.bgDark, 13, 18, 4, 1)
}

function paintQuestBoard(): SpriteCanvas {
  const canvas = makeCanvas(STATION_SIZE, STATION_SIZE)
  const ctx = canvas.getContext('2d')!
  paintQuestBoardFrame(ctx)
  paintQuestBoardPapers(ctx)
  paintGroundShadow(ctx, 6, 20)
  return canvas
}

function paintTrophyHallPediment(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, PAL.primary, 6, 8, 20, 2)
  paintPx(ctx, SHADE.primaryDark, 6, 10, 20, 1)
  for (let slope = 0; slope < 6; slope++) {
    paintPx(ctx, PAL.primary, 16 - slope, 7 - slope, 2 + slope * 2, 1)
  }
}

function paintTrophyHallColumns(ctx: CanvasRenderingContext2D) {
  for (const columnX of [7, 12, 17, 22]) paintPx(ctx, PAL.text, columnX, 11, 3, 16)
  for (const shadeX of [9, 14, 19, 24]) paintPx(ctx, SHADE.borderDim, shadeX, 11, 1, 16)
  paintPx(ctx, PAL.border, 5, 27, 22, 2)
  paintPx(ctx, SHADE.borderDim, 5, 29, 22, 1)
}

function paintTrophyHallTrophy(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, SHADE.flowerYellow, 14, 14, 4, 5)
  paintPx(ctx, SHADE.bgDark, 13, 14, 1, 3)
  paintPx(ctx, SHADE.bgDark, 18, 14, 1, 3)
  paintPx(ctx, SHADE.flowerYellow, 15, 19, 2, 3)
  paintPx(ctx, SHADE.flowerYellow, 13, 22, 6, 1)
}

function paintTrophyHall(): SpriteCanvas {
  const canvas = makeCanvas(STATION_SIZE, STATION_SIZE)
  const ctx = canvas.getContext('2d')!
  paintTrophyHallPediment(ctx)
  paintTrophyHallColumns(ctx)
  paintTrophyHallTrophy(ctx)
  paintGroundShadow(ctx, 5, 22)
  return canvas
}

function paintMailboxBody(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, SHADE.treeBark, 15, 18, 2, 12)
  paintPx(ctx, PAL.primary, 9, 10, 14, 10)
  paintPx(ctx, SHADE.primaryDark, 9, 19, 14, 1)
  paintPx(ctx, SHADE.primaryDark, 9, 10, 14, 1)
  paintPx(ctx, PAL.primary, 10, 9, 12, 1)
  paintPx(ctx, PAL.primary, 11, 8, 10, 1)
  paintPx(ctx, SHADE.ink, 12, 13, 8, 1)
  paintPx(ctx, SHADE.ink, 12, 14, 8, 1)
}

function paintMailboxFlagAndLetter(ctx: CanvasRenderingContext2D) {
  paintPx(ctx, SHADE.flowerPink, 23, 11, 4, 3)
  paintPx(ctx, SHADE.bgDark, 23, 11, 4, 1)
  paintPx(ctx, SHADE.bgDark, 22, 11, 1, 8)
  paintPx(ctx, PAL.text, 13, 15, 6, 3)
  paintPx(ctx, SHADE.bgDark, 14, 16, 4, 1)
}

function paintMailbox(): SpriteCanvas {
  const canvas = makeCanvas(STATION_SIZE, STATION_SIZE)
  const ctx = canvas.getContext('2d')!
  paintMailboxBody(ctx)
  paintMailboxFlagAndLetter(ctx)
  paintGroundShadow(ctx, 8, 16)
  return canvas
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
  const cached = cache.get(key)
  if (cached) return cached
  const sprite = stationPainters[name]()
  cache.set(key, sprite)
  return sprite
}

function paintFountain(): SpriteCanvas {
  const canvas = makeCanvas(SPRITE_SIZE, SPRITE_SIZE)
  const ctx = canvas.getContext('2d')!
  paintPx(ctx, SHADE.borderDim, 2, 9, 12, 5)
  paintPx(ctx, PAL.border, 3, 8, 10, 1)
  paintPx(ctx, SHADE.water, 4, 10, 8, 3)
  paintPx(ctx, SHADE.waterDeep, 4, 13, 8, 1)
  paintPx(ctx, PAL.secondary, 5, 11, 1, 1)
  paintPx(ctx, PAL.secondary, 9, 11, 1, 1)
  paintPx(ctx, PAL.border, 7, 6, 2, 4)
  paintPx(ctx, PAL.text, 7, 4, 2, 2)
  paintPx(ctx, PAL.secondary, 6, 5, 1, 1)
  paintPx(ctx, PAL.secondary, 9, 5, 1, 1)
  return canvas
}

function paintLamp(): SpriteCanvas {
  const canvas = makeCanvas(SPRITE_SIZE, SPRITE_SIZE)
  const ctx = canvas.getContext('2d')!
  paintPx(ctx, SHADE.bgDark, 7, 4, 2, 11)
  paintPx(ctx, SHADE.borderDim, 7, 14, 2, 2)
  paintPx(ctx, PAL.primary, 5, 1, 6, 4)
  paintPx(ctx, SHADE.flowerYellow, 6, 2, 4, 2)
  paintPx(ctx, PAL.text, 7, 2, 2, 1)
  paintPx(ctx, PAL.primary, 4, 2, 1, 1)
  paintPx(ctx, PAL.primary, 11, 2, 1, 1)
  return canvas
}

function paintPedestal(): SpriteCanvas {
  const canvas = makeCanvas(SPRITE_SIZE, SPRITE_SIZE)
  const ctx = canvas.getContext('2d')!
  paintPx(ctx, SHADE.borderDim, 2, 4, 12, 9)
  paintPx(ctx, PAL.border, 2, 4, 12, 1)
  paintPx(ctx, SHADE.bgDark, 2, 12, 12, 1)
  paintPx(ctx, SHADE.borderDim, 1, 13, 14, 2)
  paintPx(ctx, PAL.border, 1, 13, 14, 1)
  paintPx(ctx, SHADE.bgDark, 1, 15, 14, 1)
  for (let stripeY = 6; stripeY < 12; stripeY += 3) {
    paintPx(ctx, SHADE.bgDark, 3, stripeY, 10, 1)
  }
  paintPx(ctx, PAL.text, 3, 5, 10, 1)
  return canvas
}

function paintArchway(): SpriteCanvas {
  const canvas = makeCanvas(SPRITE_SIZE, SPRITE_SIZE)
  const ctx = canvas.getContext('2d')!
  paintPx(ctx, SHADE.borderDim, 1, 4, 14, 11)
  paintPx(ctx, PAL.border, 2, 4, 12, 1)
  paintPx(ctx, SHADE.bgDark, 4, 6, 8, 9)
  paintPx(ctx, PAL.primary, 5, 7, 6, 1)
  paintPx(ctx, SHADE.primaryDark, 5, 8, 6, 6)
  paintPx(ctx, SHADE.primaryLight, 7, 9, 2, 1)
  paintPx(ctx, SHADE.bgDark, 1, 14, 14, 1)
  paintPx(ctx, PAL.border, 1, 3, 1, 1)
  paintPx(ctx, PAL.border, 14, 3, 1, 1)
  return canvas
}

const propPainters = {
  fountain: paintFountain,
  lamp: paintLamp,
  archway: paintArchway,
  pedestal: paintPedestal,
} as const

export function getPropSprite(name: keyof typeof propPainters): SpriteCanvas {
  const key = `prop:${name}`
  const cached = cache.get(key)
  if (cached) return cached
  const sprite = propPainters[name]()
  cache.set(key, sprite)
  return sprite
}
