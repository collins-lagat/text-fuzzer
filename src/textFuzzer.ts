import { range } from 'lodash'
import { GLYPHS, KEYBOARDS } from './core'
import { GenerateText, Methods, PickMethod } from './core/core'

class BaseTextFuzzer implements GenerateText {
  constructor(
    private word: string,
    private method: Methods,
    private glyphs: Map<string, string[]>,
    private keyboards: Map<string, string>[]
  ) {}

  public generate(): string[] {
    let result: string[] = []

    switch (this.method) {
      case 'addition':
        result = [...this.addition()]
        break

      case 'bitsquatting':
        result = [...this.bitsquatting()]
        break

      case 'homoglyph':
        result = [...this.homoglyph()]
        break

      case 'hyphenation':
        result = [...this.hyphenation()]
        break

      case 'insertion':
        result = [...this.insertion()]
        break

      case 'omission':
        result = [...this.omission()]
        break

      case 'repetition':
        result = [...this.repetition()]
        break

      case 'replacement':
        result = [...this.replacement()]
        break

      case 'transposition':
        result = [...this.transposition()]
        break

      case 'vowel-swap':
        result = [...this.vowelSwap()]
        break

      default:
        throw new Error('invalid method chosen')
    }

    return result
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

          Array.from(win).forEach((c) => {
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
    range(1, this.word.length - 1)
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

  private replacement(): string[] {
    const result: Set<string> = new Set()

    Array.from(this.word).forEach((c, i) => {
      const pre = this.word.substring(0, i)
      const suf = this.word.substring(i + 1)

      this.keyboards.forEach((layout) => {
        const str = layout.get(c) ?? ''

        Array.from(str).forEach((r) => result.add(`${pre}${r}${suf}`))
      })
    })

    return [...result]
  }

  private transposition(): string[] {
    return range(this.word.length - 1).map((i) => {
      return `${this.word.substring(0, i)}${this.word.charAt(
        i + 1
      )}${this.word.charAt(i)}${this.word.substring(i + 2)}`
    })
  }

  private vowelSwap(): string[] {
    const vowels = 'aeiou'
    const results: string[] = []

    range(this.word.length).forEach((i) => {
      Array.from(vowels).forEach((vowel) => {
        if (Array.from(vowels).includes(this.word.charAt(i))) {
          results.push(
            `${this.word.substring(0, i)}${vowel}${this.word.substring(i + 1)}`
          )
        }
      })
    })

    return [...new Set(results)]
  }

  private addition(): string[] {
    return range(97, 123).map((i) => {
      return `${this.word}${String.fromCharCode(i)}`
    })
  }
}

class TextFuzzerFactory {
  private static readonly GLYPHS = GLYPHS
  private static readonly KEYBOARDS = KEYBOARDS

  public static build(word: string, method: Methods) {
    const glyphs = new Map(Object.entries(this.GLYPHS))
    const keyboards = this.KEYBOARDS.map(
      (keyboard) => new Map(Object.entries(keyboard))
    )
    return new BaseTextFuzzer(word, method, glyphs, keyboards)
  }
}

export class TextFuzzer implements PickMethod {
  constructor(private word: string) {}

  public method(method: Methods): BaseTextFuzzer {
    return TextFuzzerFactory.build(this.word, method)
  }
}
