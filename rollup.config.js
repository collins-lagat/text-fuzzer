import path from 'path'
import typescript from '@rollup/plugin-typescript'
import sourcemaps from 'rollup-plugin-sourcemaps'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

/**
 * @type { import('rollup').RollupOptions }
 */
const config = {
  input: path.resolve(__dirname, 'src/main.ts'),
  output: [
    {
      file: path.resolve(__dirname, 'dist/main.js'),
      format: 'esm',
      sourcemap: true,
    },
    {
      file: path.resolve(__dirname, 'dist/main.min.js'),
      format: 'esm',
      sourcemap: true,
      plugins: [
        process.env.NODE_ENV === 'production' && terser(),
      ]
    }
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    replace({
      preventAssignment: true,
      __buildDate__: () => JSON.stringify(new Date())
    }),
    typescript(),
    sourcemaps(),
  ]
}

export default config
