import { defineConfig } from 'tsup'
import glob from 'glob'

const entries = glob.sync('./src/*.ts')

export default defineConfig({
  name: 'tsup',
  format: ['cjs', 'esm'],
  minify: true,
  outDir: 'dist',
  dts: true,
  entry: entries,
})
