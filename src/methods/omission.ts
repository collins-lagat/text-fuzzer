import { range } from 'lodash-es'

export const omission = (word: string): string[] => {
  return range(word.length).map((i) => {
    return `${word.substring(0, i)}${word.substring(i + 1)}`
  })
}
