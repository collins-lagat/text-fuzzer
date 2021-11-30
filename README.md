> Note: This tools is inspired (or rather, translated) from the `DomainFuzz` class of the [dnstwist](https://github.com/elceef/dnstwist) project.

# Purpose

The aim of this tool is to generate words that **_looks_** the same as a given word.
For example, given the word **bank**, the following words can be generated:

```
[
  'cank', 'fank', 'jank',
  'rank', 'bcnk', 'benk',
  'bink', 'bqnk', 'baok',
  'balk', 'bajk', 'bafk',
  'banj', 'bani', 'bano',
  'banc'
]
```

# Basic Example

```js
import { TextFuzzer } from '@thecollinslagat/text-fuzzer'

const fuzzer = new TextFuzzer('bank')

const words = fuzzer.method('addition').generate()

console.log(words)
```
