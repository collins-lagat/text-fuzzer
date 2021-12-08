export const bitsquatting = (word: string): string[] => {
  const masks = [1, 2, 4, 8, 16, 32, 64, 128]
  const chars = new Set<string>([...'abcdefghijklmnopqrstuvwxyz0123456789-'])
  const results = [...word].reduce<string[]>((acc, char, index) => {
    for (const mask of masks) {
      const b = String.fromCharCode(char.charCodeAt(0) ^ mask)
      if (chars.has(b)) {
        acc.push(word.substring(0, index) + b + word.substring(index + 1))
      }
    }
    return acc
  }, [])
  return results
}
