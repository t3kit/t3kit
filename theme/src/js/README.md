# Compile JS

We are using ES modules as a base, several scripts to compile TYPO3 Assets ready files and Rollup as a module bundler under the hood. At the end you will get your code inside of a self-executing function that is suitable for inclusion as a `<script>` tag

## Commands

- `npm start` to compile js files with development context and start watch process
- `npm run build` to compile js files with development and production context

## Prepare files

All root `theme/src/js` JavaScript files will be compiled as separate files to `Resources/Public/assets/development|production/Js` folder.

### File examples

- `filename.js` - Script at the bottom of the `<body>` tag
- `filename-p1.js` - Script inside `<head>` tag (`p1 = priority="1"` _TYPO3 Assets_)
- `filename--async.js` - Async script at the bottom of the `<body>` tag
- `filename--async-p1.js` - Async script inside `<head>` tag (`p1 = priority="1"` _TYPO3 Assets_)
- `filename--defer.js` - Defer script at the bottom of the `<body>` tag
- `filename--defer-p1.js` - Defer script inside `<head>` tag (`p1 = priority="1"` _TYPO3 Assets_)
- `filename--inline.js` - Inline script at the bottom of the `<body>` tag
- `filename--inline-p1.js` - Inline script inside `<head>` tag (`p1 = priority="1"` _TYPO3 Assets_)

***

## Read more about TYPO3 Assets
- [TYPO3 Assets](https://docs.typo3.org/m/typo3/reference-coreapi/10.4/en-us/ApiOverview/Assets/Index.html)
## Read more about async/defer
- [Efficiently load third-party JavaScript](https://web.dev/efficiently-load-third-party-javascript)
- [script async, defer, src, inline](https://gist.github.com/jakub-g/385ee6b41085303a53ad92c7c8afd7a6)
