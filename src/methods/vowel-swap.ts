import { range } from 'lodash-es'

export const vowelSwap = (word: string): string[] => {
  const vowels = 'aeiou'
  const results: string[] = []

  range(word.length).forEach((i) => {
    Array.from(vowels).forEach((vowel) => {
      if (Array.from(vowels).includes(word.charAt(i))) {
        results.push(`${word.substring(0, i)}${vowel}${word.substring(i + 1)}`)
      }
    })
  })

  return [...new Set(results)]
}
