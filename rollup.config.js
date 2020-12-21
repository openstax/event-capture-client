import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'


export default {
  input: `src/${process.env.entry}.ts`,
  output: [
    {
      file: `dist/${process.env.entry}.js`,
      format: 'cjs',
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          module: "es2015"
        }
      },
    }),
    commonjs(),
  ],
}
