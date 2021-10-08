import { range } from './core'

export class TextFuzz implements Generate {
  private wordsGenerated: string[] = []

  constructor(
    private word: string,
    private glyphs: Map<string, string[]>,
    private keyboards: Map<string, string>[]
  ) {}

  public generate(): string[] {
    return [...this.repetition()]
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

  private hyphenation(): string[] {
    return range(1, this.word.length).map(
      (i) => `${this.word.substring(0, i)}-${this.word.substring(i)}`
    )
  }

  private insertion(): string[] {
    const result: Set<string> = new Set()
    range(1, this.word.length)
      .map((i) => {
        const prefix = this.word.substring(0, i)
        const origCharacter = this.word.charAt(i)
        const suffix = this.word.substring(i + 1)
        return [prefix, origCharacter, suffix]
      })
      .forEach(([prefix, origCharacter, suffix]) => {
        this.keyboards
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

  private omission(): string[] {
    return range(this.word.length).map((i) => {
      return `${this.word.substring(0, i)}${this.word.substring(i + 1)}`
    })
  }

  private repetition(): string[] {
    return Array.from(this.word).map((c, i) => {
      return `${this.word.substring(0, i)}${c}${this.word.substring(i)}`
    })
  }
}
