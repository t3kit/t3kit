# t3kit v8  (BETA) [![t3kit](https://img.shields.io/badge/t3kit-8.0.0-green.svg?style=flat-square)](https://github.com/t3kit/t3kit) [![TYPO3](https://img.shields.io/badge/TYPO3-8.6.1-orange.svg?style=flat-square)](https://typo3.org/)

## [Starter kit](http://t3kit.com/) for TYPO3 CMS. Tools, extensions, configurations and templates.

***

# t3kit v7


Previous version of **t3kit v7** you can find on branch [t3kit7](https://github.com/t3kit/t3kit/tree/t3kit7), or you can use git tags to chose needed version:
```
git checkout 7.11.3
or
git checkout 7.10.0
```
_this message will be here until stable version of **t3kit v8**_

***

### [CHANGELOG](https://github.com/t3kit/t3kit/blob/master/CHANGELOG.md)
### [Contributing to t3kit](https://github.com/t3kit/t3kit/blob/master/CONTRIBUTING.md)

### Required dependencies:

* [Git](https://git-scm.com/)
* [Composer](https://getcomposer.org/)
* [Docker](https://docker.com/)


### Getting started with t3kit

The best way to start working with t3kit is to use Docker:

```
git colone https://github.com/t3kit/t3kit.git
cd t3kit
composer install
docker-compose up -d

```

***

## t3kit structure
* t3kit v8 development is on `master` branch.
* t3kit v7 development is on `t3kit7` branch.
* Every release synchronized with specific release of TYPO3.
* Every release tagged by `git tag` using [Semantic Versioning](http://semver.org)
* `Major` version should be almost always the same as on TYPO3.

#### Example:
- t3kit version **7.9.12**
  - **7** - major version: version of TYPO3
  - **9** - minor version: new features in t3kit
  - **12** - patch version: bug fixes, documentation updates, code refactoring, new tests in t3kit

- t3kit version **8.1.2**
  - **8** - major version: version of TYPO3
  - **1** - minor version: new features in t3kit
  - **2** - patch version: bug fixes, documentation updates, code refactoring, new tests in t3kit

When we starting new `major` version of **t3kit** previous will be moved to new branch, so in this case we can keep developing new and support old one.

Examples:
* Branch `master` => _last t3kit release_ `t3kit 8.1.3 = TYPO3 8.6.1`
* Branch `t3kit7` => _last t3kit release_ `t3kit 7.11.3 = TYPO3 7.6.15`

