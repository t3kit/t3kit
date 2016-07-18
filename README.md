#t3kit
[![t3kit](https://img.shields.io/badge/t3kit-7.8.0-green.svg?style=flat-square)](https://github.com/t3kit/t3kit)
[![TYPO3](https://img.shields.io/badge/TYPO3-7.6.9-orange.svg?style=flat-square)](https://typo3.org/)
###Starter kit for TYPO3 CMS. Tools, extensions, configurations and templates.

### [CHANGELOG](https://github.com/t3kit/t3kit/blob/master/CHANGELOG.md)
### [Contributing to t3kit](https://github.com/t3kit/t3kit/blob/master/CONTRIBUTING.md)

### Required dependencies:

* [Git](https://git-scm.com/)
* [Composer](https://getcomposer.org/)

### Getting started with t3kit

The best way to start working with t3kit is to use our [t3kit_vagrant](https://github.com/t3kit/t3kit_vagrant) machine

***

## t3kit versioning
* Main development is on `master` branch.
* Every release synchronized with specific release of TYPO3.
* Every release tagged by `git tag` using [Semantic Versioning](http://semver.org)
* `Major` version should be almost always the same as on TYPO3.

#### For example we have t3kit version 7.9.12
- **7** - major version: version of TYPO3
- **9** - minor version: new features
- **12** - patch version: bug fixes, documentation updates, code refactoring, new tests

When we starting new `major` version of **t3kit** previous will be moved to new branch, so in this case we can keep developing new and support old one.

Examples:
* Branch `master` => _last t3kit release_ `t3kit 9.1.3 = TYPO3 9.1.0`
* Branch `t3kit8` => _last t3kit release_ `t3kit 8.3.2 = TYPO3 8.7.2`
* Branch `t3kit7` => _last t3kit release_ `t3kit 7.1.5 = TYPO3 7.7.1`

Also in some specific cases it can be possible to use new version of **TYPO3** for old version of **t3kit**
Example:
* Branch `t3kit7` => _last t3kit release_ `t3kit 7.2.0 = TYPO3 8.7.2`
