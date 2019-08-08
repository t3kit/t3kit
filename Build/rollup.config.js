import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
    {
        input: 'dev/js/bootstrap.js',
        output: {
            file: '../Resources/Public/JavaScript/bootstrap.js',
            format: 'umd',
            name: 'bundle'
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
        input: 'dev/js/mainNew.js',
        output: {
            file: '../Resources/Public/JavaScript/mainNew.js',
            format: 'iife',
            name: 'bundle'
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
    }
]
