import typescript from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: `src/standalone.ts`,
  output: [
    {
      file: `dist/standalone/standalone.umd.js`,
      format: 'umd',
      name: 'EventCapture',
      sourcemap: false,
      globals: {},
    }
  ],
  external: [],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          module: "es2015",
          declaration: false
        }
      },
    }),
    resolve({
      preferBuiltins: true,
      browser: true,
    }),
    commonjs(),
    terser(),
  ],
}
