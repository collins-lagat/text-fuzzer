import { GLYPHS, KEYBOARDS } from './variables'

export const getGlyphs = (): Map<string, string[]> =>
  new Map(Object.entries(GLYPHS))

export const getKeyboards = (): Map<string, string>[] =>
  KEYBOARDS.map((keyboard) => new Map(Object.entries(keyboard)))
