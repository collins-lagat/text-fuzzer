import {
  addition,
  bitsquatting,
  homoglyph,
  hyphenation,
  insertion,
  omission,
  repetition,
  replacement,
  transposition,
  vowelSwap
} from '@/main'
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

const testWord = 'bank'

describe('Text Generation Methods', () => {
  it('bitsquatting', () => {
    const words = bitsquatting(testWord)

    expect(words.length).toEqual(expectedBitsquatting.length)
    expect(words).toEqual(expectedBitsquatting)
  })

  it('homoglyph', () => {
    const words = homoglyph(testWord)

    expect(words.length).toEqual(expectedHomoglyph.length)
    expect(words).toEqual(expect.arrayContaining(expectedHomoglyph))
  })

  it('hyphenation', () => {
    const words = hyphenation(testWord)

    expect(words.length).toEqual(expectedHyphenation.length)
    expect(words).toEqual(expect.arrayContaining(expectedHyphenation))
  })

  it('insertion', () => {
    const words = insertion(testWord)

    expect(words.length).toEqual(expectedInsertion.length)
    expect(words).toEqual(expect.arrayContaining(expectedInsertion))
  })

  it('omission', () => {
    const words = omission(testWord)

    expect(words.length).toEqual(expectedOmission.length)
    expect(words).toEqual(expect.arrayContaining(expectedOmission))
  })

  it('repetition', () => {
    const words = repetition(testWord)

    expect(words.length).toEqual(expectedRepetition.length)
    expect(words).toEqual(expect.arrayContaining(expectedRepetition))
  })

  it('replacement', () => {
    const words = replacement(testWord)

    expect(words.length).toEqual(expectedReplacement.length)
    expect(words).toEqual(expect.arrayContaining(expectedReplacement))
  })

  it('transposition', () => {
    const words = transposition(testWord)

    expect(words.length).toEqual(expectedTransposition.length)
    expect(words).toEqual(expect.arrayContaining(expectedTransposition))
  })

  it('vowel-swap', () => {
    const words = vowelSwap(testWord)

    expect(words.length).toEqual(expectedVowelSwap.length)
    expect(words).toEqual(expect.arrayContaining(expectedVowelSwap))
  })

  it('addition', () => {
    const words = addition(testWord)

    expect(words.length).toEqual(expectedAddition.length)
    expect(words).toEqual(expect.arrayContaining(expectedAddition))
  })
})
