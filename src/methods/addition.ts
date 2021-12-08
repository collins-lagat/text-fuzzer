import { range } from 'lodash-es'

export const addition = (word: string): string[] => {
  return range(97, 123).map((i) => {
    return `${word}${String.fromCharCode(i)}`
  })
}
