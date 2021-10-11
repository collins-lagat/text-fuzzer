import { TextFuzzer } from '@/textFuzzer'

let textFuzzer: TextFuzzer

describe('Text Generation Methods', () => {
  beforeEach(() => {
    textFuzzer = new TextFuzzer('word')
  })

  it('dummy test', () => {
    expect(textFuzzer).toBeInstanceOf(TextFuzzer)
  })
})
