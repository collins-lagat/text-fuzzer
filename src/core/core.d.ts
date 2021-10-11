export type Methods =
  | 'addition'
  | 'bitsquatting'
  | 'homoglyph'
  | 'hyphenation'
  | 'insertion'
  | 'omission'
  | 'repetition'
  | 'replacement'
  | 'transposition'
  | 'vowel-swap'

export interface GenerateText {
  generate(): string[]
}

export interface PickMethod {
  method(method: Methods): GenerateText
}
