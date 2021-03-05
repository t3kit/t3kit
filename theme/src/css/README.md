# Compile CCS

We are using native CSS to add styles, several scripts to compile TYPO3 Assets ready files and PostCSS as a bundler under the hood.

## Commands

- `npm start` to compile CSS files with development context and start watch process
- `npm run build` to compile CSS files with development and production context

## Prepare files

All root `theme/src/css` CSS files will be compiled as separate files to `Resources/Public/assets/development|production/Css` folder.

### File examples

- `filename.css` - Css styles inside `<head>` tag
- `filename--async.css` - Async css styles inside `<head>`
- `filename--inline.css` - Inline css styles at the bottom of the `<body>` tag
- `filename--inline-p1.css` - Inline css styles inside `<head>` tag (`p1 = priority="1"` _TYPO3 Assets_)

***

## Read more about TYPO3 Assets
- [TYPO3 Assets](https://docs.typo3.org/m/typo3/reference-coreapi/10.4/en-us/ApiOverview/Assets/Index.html)
