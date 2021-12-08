import { range } from 'lodash-es'
import { getGlyphs } from '@/core'

export const homoglyph = (word: string): string[] => {
  const glyphs = getGlyphs()

  function* mix(word: string): Generator<string> {
    for (const w of range(word.length)) {
      for (const i of range(word.length - w + 1)) {
        const pre = word.substring(0, i)
        const win = word.substring(i, i + w)
        const suf = word.substring(i + w)

        for (const c of Array.from(win)) {
          for (const g of glyphs.get(c) || []) {
            yield `${pre}${win.replace(c, g)}${suf}`
          }
        }
      }
    }
  }

  const result1 = new Set(mix(word))
  let result2 = new Set<string>([...result1])

  for (const r of result1) {
    result2 = new Set([...result2, ...new Set(mix(r))])
  }

  return [...result2]
}
