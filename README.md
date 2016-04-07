#t3kit
[![t3kit](https://img.shields.io/badge/t3kit-7.1.2-green.svg?style=flat-square)](https://github.com/t3kit/t3kit)
[![TYPO3](https://img.shields.io/badge/TYPO3-7.6.4-orange.svg?style=flat-square)](https://typo3.org/)
###Starter kit for TYPO3 CMS. Tools, extensions, configurations and templates.

### [CHANGELOG](https://github.com/t3kit/t3kit/blob/master/CHANGELOG.md)

#### Required dependencies:

* [Git](https://git-scm.com/)
* [Composer](https://getcomposer.org/)

***

### Getting started with t3kit

The best way to start working with t3kit is to use our [t3kit_vagrant](https://github.com/t3kit/t3kit_vagrant) machine

###List of tools and extensions:

* TBD

***

# Contributing

Everyone can add feedback, bug reports and fixes. Here is several rules for contribute this repository. Please keep this in mind for better cooperation.


## Issues

If you have a question(feature) not covered in the documentation or want to report a bug, the best way to ensure it gets addressed is to file it in the appropriate **issues tracker**. Please check that you've completed the following steps:

* Make sure you're on the right version of **t3kit**
* Make sure you're on the right version of **submodules**
* Used the **search** feature to ensure that the bug hasn't been reported before
* Included as much **information about the bug** as possible, including any output you've received, what OS and version you're on, etc.
* Try to reduce your code to the bare minimum required to reproduce the issue. This makes it much easier (and much faster) to isolate and fix the issue.


## Pull Requests

* Please check to make sure that there aren't existing pull requests attempting to address the issue mentioned. We also recommend checking for issues related to the issue on the tracker, as a team member may be working on the issue in a branch or fork.
* Non-trivial changes should be discussed in an issue first
* Develop in a topic branch, not master
* Follow [Style Guides](https://github.com/t3kit/t3kit#style-guide)
* Follow [Git commit conventions](https://github.com/t3kit/t3kit#git-commit-conventions-and-output-formatting)
* Write a convincing description of your PR and why we should land it


## Internal Fixes `t3kit team`

* Non-trivial changes should be discussed in **t3kit team**
* It is permited to work on master branch, but in most of cases better to create **new branch** for your changes
* Follow [Style Guides](https://github.com/t3kit/t3kit#style-guide)
* Follow [Git commit conventions](https://github.com/t3kit/t3kit#git-commit-conventions-and-output-formatting)
* Keep in mind our [Git versioning system](https://github.com/t3kit/t3kit#versioning-system)

***

## Style Guide
This project uses special style guides. Those rules you can find on appropriate file: `.editorconfig`

* [editorconfig](http://editorconfig.org)

## Git commit conventions and output formatting
Please use semantic labels for your messages, but if commit message is not very important, you can skip labels. All commits with labels will be added in changelog, that's why it is **important to use predefined labels** on your commits.

####Git labels:
* **[FEATURE]** A new feature
* **[FIX]** A bug fix
* **[REFACTOR]** A code change that neither fixes a bug or adds a feature
* **[PERF]** A code change that improves performance.
* **[CHORE]** Changes to the build process (grunt) or auxiliary tools and libraries such as documentation generation and linters (jshint, jscs, etc.)
* **[DOC]** Documentation only changes
* **[STYLE]** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **[TEST]** Adding missing tests
* **[UPDATE]** Updating git submodules, npm/bower dependencies

Please ensure any pull requests of fixes **follow this closely**. If you notice existing code which doesn't follow these practices, feel free to shout and we will address this.


## Versioning system
* Main development is on `master` branch.
* Every release synchronized with specific release of TYPO3.
* Every release tagged by `git tag` using [Semantic Versioning](http://semver.org)
* `Major` version should be almost always the same as on TYPO3.

When we starting new `major` version of **t3kit** previous will be moved to new branch, so in this case we can keep developing new and support old one.

Examples:
* Branch `master` => _last t3kit release_ `t3kit 9.1.3 = TYPO3 9.1.0`
* Branch `t3kit8` => _last t3kit release_ `t3kit 8.3.2 = TYPO3 8.7.2`
* Branch `t3kit7` => _last t3kit release_ `t3kit 7.1.5 = TYPO3 7.7.1`

Also in some specific cases it can be possible to use new version of **TYPO3** for old version of **t3kit**
Example:
* Branch `t3kit7` => _last t3kit release_ `t3kit 7.2.0 = TYPO3 8.7.2`
