<p align="center">
    <a href="http://t3kit.com/">
        <img src="https://user-images.githubusercontent.com/5150636/82044420-ff053600-96b5-11ea-8313-4158d6c0be5d.png" alt="t3kit logo" width="150" height="76">
    </a>
</p>

<h2 align="center">t3kit</h2>
<h3 align="center">TYPO3 website starter kit</h3>
<p align="center"><a href="https://t3kit.gitbook.io/doc/"><strong>t3kit documentation</strong></a></p>

![](https://github.com/t3kit/t3kit/workflows/Code%20Guidelines/badge.svg)

## Table of contents

### t3kit-starter

- [About](#about)
- [What's included](#whats-included)
- [Required dependencies](#required-dependencies)
- [File structure](#file-structure)
- [Quick start](#quick-start)
- [Changelog](CHANGELOG.md)

### General info about t3kit project

- [Documentation](https://t3kit.gitbook.io/doc)
- [t3kit Roadmap](https://t3kit.gitbook.io/doc/t3kit-roadmap)
- [Versioning](https://t3kit.gitbook.io/doc/t3kit-versioning)
- [t3kit project structure](https://t3kit.gitbook.io/doc/t3kit-project-structure)
- [Contributing to t3kit](https://github.com/t3kit/.github/blob/master/CONTRIBUTING.md)
- [Code of Conduct](https://github.com/t3kit/.github/blob/master/CODE_OF_CONDUCT.md)
- [Support](https://github.com/t3kit/.github/blob/master/SUPPORT.md)
- [Security Policy](https://github.com/t3kit/.github/blob/master/SECURITY.md)

***

## About

**t3kit** is TYPO3 site package extension which includes everything that could be needed to develop a site based on TYPO3

## What's included

- General TYPO3 configuration
- Content elements
- BElayouts
- CSS and JS files
- Icons
- Third-party extension configuration

## Required dependencies

- [Git](https://git-scm.com/)
- [Composer](https://getcomposer.org/) >= v1.9.1
- [Docker](https://docs.docker.com/install/) >= v19.03.12
- [Docker Compose](https://docs.docker.com/compose/install/) >= v1.26.2

## File structure

```text
t3kit/
├── .github/          # github actions
├── Classes/          # Contains all PHP classes
├── Configuration/    # General configuration folder. TSconfig, TypoScript, TCA, Flexforms, BElayouts
├── Resources/        # Contains the subfolders `Public/` and `Private/`, which contain resources
└── theme/            # Front-end files. CSS, JS, and compilation scripts
```

## Quick start
[t3kit-starter](https://github.com/t3kit/t3kit-starter)
