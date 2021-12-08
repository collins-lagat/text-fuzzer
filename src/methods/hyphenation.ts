import { range } from 'lodash-es'

export const hyphenation = (word: string): string[] => {
  return range(1, word.length).map(
    (i) => `${word.substring(0, i)}-${word.substring(i)}`
  )
}
