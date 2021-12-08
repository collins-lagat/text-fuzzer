import { range } from 'lodash-es'
import { getKeyboards } from '@/core'

export const insertion = (word: string): string[] => {
  const keyboards = getKeyboards()
  const result: Set<string> = new Set()

  range(1, word.length - 1)
    .map((i) => {
      const prefix = word.substring(0, i)
      const origCharacter = word.charAt(i)
      const suffix = word.substring(i + 1)
      return [prefix, origCharacter, suffix]
    })
    .forEach(([prefix, origCharacter, suffix]) => {
      keyboards
        .map((keys) => {
          const str = keys.get(origCharacter) ?? ''
          return [...str]
        })
        .reduce<string[]>((acc, arr) => {
          arr.forEach((c) => acc.push(c))
          return acc
        }, [])
        .forEach((c) => {
          result.add(`${prefix}${c}${origCharacter}${suffix}`)
          result.add(`${prefix}${origCharacter}${c}${suffix}`)
        })
    })
  return [...result]
}
