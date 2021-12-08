import path from 'path'
import { readFileSync } from 'fs'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import fileSize from 'rollup-plugin-filesize'

/** @type { (import('rollup').OutputOptions)[] } */
const output = []

if (process.env.NODE_ENV === 'production') {
  output.push({
    file: path.resolve(__dirname, 'dist/text-fuzzer.min.js'),
    name: 'textFuzzer',
    format: 'umd',
    plugins: [terser(), fileSize()],
    banner: () => `/** ${readFileSync(path.resolve(__dirname, 'LICENSE'))}*/`
  })
  output.push({
    file: path.resolve(__dirname, 'dist/text-fuzzer.js'),
    format: 'cjs',
    plugins: [fileSize()],
    banner: () => `/** ${readFileSync(path.resolve(__dirname, 'LICENSE'))}*/`
  })
  output.push({
    file: path.resolve(__dirname, 'dist/text-fuzzer.esm.js'),
    format: 'esm',
    plugins: [fileSize()],
    banner: () => `/** ${readFileSync(path.resolve(__dirname, 'LICENSE'))}*/`
  })
} else {
  output.push({
    file: path.resolve(__dirname, 'dist/main.js'),
    format: 'esm',
    sourcemap: true,
    banner: () => `/** ${readFileSync(path.resolve(__dirname, 'LICENSE'))}*/`
  })
}

/**
 * @type { import('rollup').RollupOptions }
 */
const config = {
  input: path.resolve(__dirname, 'src/main.ts'),
  output,
  plugins: [
    commonjs(),
    nodeResolve(),
    replace({
      preventAssignment: true,
      __buildDate__: () => JSON.stringify(new Date())
    }),
    typescript()
  ]
}

export default config
