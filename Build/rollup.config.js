import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
    {
        input: 'dev/js/bootstrap.js',
        output: {
            file: '../Resources/Public/JavaScript/bootstrap.js',
            format: 'umd',
            name: 'bootstrap'
        },
        plugins: [
            babel({
                exclude: 'node_modules/**',
                externalHelpersWhitelist: [ // Include only required helpers
                  'defineProperties',
                  'createClass',
                  'inheritsLoose',
                  'defineProperty',
                  'objectSpread'
                ]
            }),
            commonjs(),
            resolve()
        ]
    },
    {
        input: 'dev/js/main.js',
        output: {
            file: '../Resources/Public/JavaScript/main.js',
            format: 'iife',
            name: 'main'
        },
        plugins: [
            babel({
                exclude: 'node_modules/**',
                externalHelpersWhitelist: [ // Include only required helpers
                  'defineProperties',
                  'createClass',
                  'inheritsLoose',
                  'defineProperty',
                  'objectSpread'
                ]
            }),
            resolve(),
        ]
    }
]
