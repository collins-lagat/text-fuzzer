import { range } from 'lodash-es'

export const transposition = (word: string): string[] => {
  return range(word.length - 1).map((i) => {
    return `${word.substring(0, i)}${word.charAt(i + 1)}${word.charAt(
      i
    )}${word.substring(i + 2)}`
  })
}
