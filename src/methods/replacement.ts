import { getKeyboards } from '@/core'

export const replacement = (word: string): string[] => {
  const keyboards = getKeyboards()
  const result: Set<string> = new Set()

  Array.from(word).forEach((c, i) => {
    const pre = word.substring(0, i)
    const suf = word.substring(i + 1)

    keyboards.forEach((layout) => {
      const str = layout.get(c) ?? ''

      Array.from(str).forEach((r) => result.add(`${pre}${r}${suf}`))
    })
  })

  return [...result]
}
