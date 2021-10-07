import { GLYPHS, KEYBOARDS } from './core/variables'

class TextFuzz implements Generate {
  private wordsGenerated: string[] = []

  constructor(
    private word: string,
    private glyphs: Map<string, string[]>,
    private keyboards: Map<string, string>[]
  ) {}

  public generate(): string[] {
    return [...this.homoglyph()]
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

  private homoglyph(): string[] {
    const range = (length: number): number[] => {
      return [...Array(length).keys()]
    }

    const mix = (word: string): Set<string> => {
      const result = new Set<string>()

      range(word.length).forEach((w) => {
        if (w === 0) return

        range(word.length - w + 1).forEach((i) => {
          const pre = word.substring(0, i)
          const win = word.substring(i, i + w)
          const suf = word.substring(i + w)

          Array.from(win).forEach((c, i) => {
            if (this.glyphs.has(c)) {
              this.glyphs.get(c)?.forEach((g) => {
                result.add(`${pre}${win.replace(c, g)}${suf}`)
              })
            }
          })
        })
      })

      return result
    }

    const result1 = mix(this.word)
    const result2 = new Set<string>()

    result1.forEach((text) => result2.add(text))

    return [...result1, ...result2]
  }
}

class TextFuzzFactory {
  private static readonly GLYPHS = GLYPHS
  private static readonly KEYBOARDS = KEYBOARDS

  public static build(word: string) {
    const glyphs = new Map(Object.entries(this.GLYPHS))
    const keyboards = this.KEYBOARDS.map(
      (keyboard) => new Map(Object.entries(keyboard))
    )
    return new TextFuzz(word, glyphs, keyboards)
  }
}

const generator = TextFuzzFactory.build('bank')

console.log(generator.generate())
