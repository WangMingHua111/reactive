import { defineConfig } from 'rollup';
import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// import pkg from './package.json';
// import { camelCase } from 'lodash'

// 拿到package.json的name属性来动态设置打包名称
const libName = 'reactive';
export default defineConfig({
  input: 'src/reactive.ts',
  output: [
    {
      file: `dist/${libName}.cjs.js`,
      // commonjs格式
      format: 'cjs',
    },
    {
      file: `dist/${libName}.es.js`,
      // es module
      format: 'es',
    },
    {
      file: `dist/${libName}.umd.js`,
      // 通用格式可以用于node和browser等多个场景
      format: 'umd',
      // 注意如果是umd格式的bundle的话name属性是必须的，这时可以在script标签引入后window下会挂载该属性的变量来使用你的类库方法
      // name: camelCase(libName),
      name: 'reactive',
    },
  ],
  // external: ['axios'],
  plugins: [
    commonjs(),
    babel(),
    typescript({
      module: 'ES2015',
      sourceMap: false,
      compilerOptions: {
        declaration: false,
      }
    }),
    resolve(),
  ],
});