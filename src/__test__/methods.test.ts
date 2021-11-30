import { TextFuzzer } from '@/textFuzzer'
import {
  expectedAddition,
  expectedBitsquatting,
  expectedHomoglyph,
  expectedHyphenation,
  expectedInsertion,
  expectedOmission,
  expectedRepetition,
  expectedReplacement,
  expectedTransposition,
  expectedVowelSwap
} from './fixtures'

let textFuzzer: TextFuzzer

describe('Text Generation Methods', () => {
  beforeAll(() => {
    textFuzzer = new TextFuzzer('bank')
  })

  it('bitsquatting', () => {
    const words = textFuzzer.method('bitsquatting').generate()

    expect(words.length).toEqual(expectedBitsquatting.length)
    expect(words).toEqual(expectedBitsquatting)
  })

  it('homoglyph', () => {
    const words = textFuzzer.method('homoglyph').generate()

    expect(words.length).toEqual(expectedHomoglyph.length)
    expect(words).toEqual(expect.arrayContaining(expectedHomoglyph))
  })

  it('hyphenation', () => {
    const words = textFuzzer.method('hyphenation').generate()

    expect(words.length).toEqual(expectedHyphenation.length)
    expect(words).toEqual(expect.arrayContaining(expectedHyphenation))
  })

  it('insertion', () => {
    const words = textFuzzer.method('insertion').generate()

    expect(words.length).toEqual(expectedInsertion.length)
    expect(words).toEqual(expect.arrayContaining(expectedInsertion))
  })

  it('omission', () => {
    const words = textFuzzer.method('omission').generate()

    expect(words.length).toEqual(expectedOmission.length)
    expect(words).toEqual(expect.arrayContaining(expectedOmission))
  })

  it('repetition', () => {
    const words = textFuzzer.method('repetition').generate()

    expect(words.length).toEqual(expectedRepetition.length)
    expect(words).toEqual(expect.arrayContaining(expectedRepetition))
  })

  it('replacement', () => {
    const words = textFuzzer.method('replacement').generate()

    expect(words.length).toEqual(expectedReplacement.length)
    expect(words).toEqual(expect.arrayContaining(expectedReplacement))
  })

  it('transposition', () => {
    const words = textFuzzer.method('transposition').generate()

    expect(words.length).toEqual(expectedTransposition.length)
    expect(words).toEqual(expect.arrayContaining(expectedTransposition))
  })

  it('vowel-swap', () => {
    const words = textFuzzer.method('vowel-swap').generate()

    expect(words.length).toEqual(expectedVowelSwap.length)
    expect(words).toEqual(expect.arrayContaining(expectedVowelSwap))
  })

  it('addition', () => {
    const words = textFuzzer.method('addition').generate()

    expect(words.length).toEqual(expectedAddition.length)
    expect(words).toEqual(expect.arrayContaining(expectedAddition))
  })
})
