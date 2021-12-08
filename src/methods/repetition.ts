export const repetition = (word: string): string[] => {
  return Array.from(word).map((c, i) => {
    return `${word.substring(0, i)}${c}${word.substring(i)}`
  })
}
