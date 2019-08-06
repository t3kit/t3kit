import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'dev/js/bootstrap.js',
    output: {
        file: '../Resources/Public/JavaScript/bundle.js',
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
        resolve()
    ]
}

