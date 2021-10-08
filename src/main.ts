import { GLYPHS, KEYBOARDS } from './core'
import { TextFuzz } from './textFuzz'

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
