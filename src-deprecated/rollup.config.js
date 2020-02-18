
import resolve from '@rollup/plugin-node-resolve'
// import babel from 'rollup-plugin-babel'
// import commonjs from 'rollup-plugin-commonjs'
import inject from '@rollup/plugin-inject';

export default [
  // {
  //   input: 'index.js',
  //   output: [
  //     {
  //       file: 'dist/bundle.js',
  //       format: 'iife',
  //       globals: {
  //         jquery: 'jQuery',
  //         'popper.js': 'Popper'
  //       }
  //     }
  //   ],
  //   external: ['jquery', 'popper.js'],
  //   // external: ['popper.js'],
  //   plugins: [
  //   //   inject({
  //   //     $: 'jquery'
  //   //   }),
  //   //   resolve()
  //   ]
  // },

  // import jquery.slim
  {
    input: 'jquery.js',
    output: [
      {
        file: 'output/jquery.js',
        format: 'iife'
      }
    ],
    context: 'window'
  },

  // import bootstrap components
  {
    input: 'bootstrap.js',
    output: [
      {
        file: 'dist/bootstrap.js',
        format: 'iife',
        globals: {
          jquery: 'jQuery',
          'popper.js': 'Popper'
        }
      }
    ],
    external: ['jquery', 'popper.js']
  }
]
