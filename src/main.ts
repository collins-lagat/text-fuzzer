import { GLYPHS, KEYBOARDS } from './core/variables'

type glyphs = Record<string, string[]>
type keyboards = Record<string, string>[]

class TextFuzz implements Generate {
  private wordsGenerated: string[] = []

  constructor(
    private word: string,
    private glyphs: glyphs = GLYPHS,
    private keyboard: keyboards = KEYBOARDS
  ) {}

  public generate(): string[] {
    return [...this.bitsquatting()]
  }

  private bitsquatting(): string[] {
    const masks = [1, 2, 4, 8, 16, 32, 64, 128]
    const chars = new Set<string>([...'abcdefghijklmnopqrstuvwxyz0123456789-'])
    const results = [...this.word].reduce<string[]>((acc, char, index) => {
      for (const mask of masks) {
        const b = String.fromCharCode(char.charCodeAt(0) ^ mask)
        if (chars.has(b)) {
          acc.push(
            this.word.substring(0, index) + b + this.word.substring(index + 1)
          )
        }
      }
      return acc
    }, [])
    return results
  }
}

const generator = new TextFuzz('bank')

console.log(generator.generate())
