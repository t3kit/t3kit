import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default [
    {
        input: 'dev/js/jquery.js',
        output: {
            file: '../Resources/Public/JavaScript/jquery.js',
            format: 'iife',
            name: 'jquery',
            globals: {
                window: 'window',
            },
        },
        plugins: [
            resolve()
        ]
    },
    {
        input: 'dev/js/bootstrap.js',
        output: {
            file: '../Resources/Public/JavaScript/bootstrap.js',
            format: 'umd',
            name: 'bootstrap',
            globals: {
                jquery: '$'
            },
        },
        external: ['jquery'],
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
