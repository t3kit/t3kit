# Contributing to t3kit

### Guidelines:
- [Issues](#found-an-issuebug)
- [Feature Requests](#want-to-add-new-featurefix-bug)
- [Submission Guidelines](#submission-guidelines)
- [Coding Rules](#general-coding-rules)
- [Git commit message conventions](#git-commit-message-conventions)
- [Specific contribution rules for t3kit](#specific-contribution-rules-for-t3kit)

***

## Found an Issue/Bug?
If you find a bug in the code or a mistake in the documentation, you can help us by submitting an issue to our GitHub repository, or even better you can submit a Pull Request with a fix.

**Please follow** the [Submitting an Issue Guidelines](#submitting-an-issue)


## Want to add new feature/fix bug?
You can suggest new feature by submitting an issue to our GitHub repository, or even better you can implement a new feature and add Pull Request with your changes.

**Please follow** the [Submitting a Pull Request Guidelines](#submitting-a-pull-request)

***

## Submission Guidelines

### Submitting an Issue:
Before you submit your **issue** please check that you've considered the following steps:

- **Check duplicates** - use the search feature to ensure that the bug hasn't been reported before.
- **Check dependencies** - make sure you're on the right version of dependencies.
- **Issue description** - Included as much information about the bug as possible.
- **Browsers and devices** - check out [browser and device support for t3kit](#browser-and-device-support)
- **Suggestions** -  if you can't fix the bug yourself, perhaps you can point to what might be causing the problem (line of code or commit)

### Submitting a Pull Request:
Before you submit your **pull request**  please check that you've considered the following steps:


- [Check documentation about Pull Request in Github](https://help.github.com/articles/using-pull-requests/)
- Search in GitHub for an open or closed Pull Request that relates to your submission.
- Follow our [Coding Rules](#general-coding-rules)
- Follow our [Git commit message conventions](#git-commit-message-conventions)
- Follow [Specific contribution rules for t3kit](#specific-contribution-rules-for-t3kit)
- Make your changes in a new git branch:
```shell
git checkout -b my-feature master
```
- Compile your changes locally to ensure that your fix/feature is not causing new bugs. Test it.
Push your branch to your forked GitHub repo:
```shell
git push origin my-feature
```
- In GitHub, send a pull request to original repository.
- Write a convincing description of your PR and why we should land it.


#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository

- Delete the remote branch:
```shell
git push origin --delete my-feature
```
- Check out the master branch:
```shell
git checkout master
```
- Delete the local branch:
```shell
git branch -D my-feature
```
- Update your master with the latest upstream version:
```shell
git pull upstream master
```


## General coding Rules

- **t3kit** project uses specific code rules and style guides. Those rules you can find in appropriate files on the root of project or in submodules:
```
.jscsrc
.jshintrc
.htmlhintrc
.csslintrc
.editorconfig
```
- Also for **TYPO3** extensions keep in mind [TYPO3 CMS Coding Guidelines](https://docs.typo3.org/typo3cms/CodingGuidelinesReference/Index.html).


## Git commit message conventions

Each commit message consists of a **[label](#labels)** and short **[message](#message)**.

Also it is possible to use special keywords for [closing Github issues](https://help.github.com/articles/closing-issues-via-commit-messages/) or pointing to another issue tracker.
For example to pointing commit with bug report or feature request from Podio need to add this keywords at the end of the message: **(Podio bug_21)**, **(Podio feature_12)**

### Labels:
Please use semantic labels for your messages, but if commit message is not very important, you can skip labels. All commits with labels will be added in CHANGELOG file, that's why it is important to use predefined labels on your commits.

* **[FEATURE]** - A new feature
* **[FIX]** - A bug fix
* **[REFACTOR]** - A code change that neither fixes a bug or adds a feature
* **[PERF]** - A code change that improves performance.
* **[CHORE]** - Changes to the build process (grunt) or auxiliary tools and libraries such as documentation generation and linters (jshint, jscs, etc.)
* **[DOC]** - Documentation only changes
* **[STYLE]** - Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **[TEST]** - Adding missing tests
* **[UPDATE]** - Updating git submodules, npm/bower dependencies
* **[!!!]** - Breaking Changes

**Important:** Commit label must be **only one**, except if it Breaking Changes, then we will need to add _"Breaking Changes"_ label `[!!!]` plus one more label.


For example (Breaking Changes):
```
[!!!][FIX] disable custom.js in t3kit
```

### Message:

- Use the imperative, present tense: "change" not "changed" or "changes"
- don't capitalize first letter
- no dot (.) at the end


## Specific contribution rules for t3kit

### t3kit Front-End Layouts:
- **Use existing less variables** for defining colors and some dimensions. Better to **avoid creating new less variables**, because it will cause changes in Theme extension. Check `customVariables.less` file.
```
dev/styles/customVariables.less
```
- **Keep your changes easily updatable** according original code. It should be easy to update old sites with your changes.


### t3kit TYPO3 Extensions:

- Your code should work with **multi-site/multi-language**
- Your code should work with the current **Theme of t3kit**
- Use **Theme variables and TS constants**
- **Keep your changes easily updatable** according original code. It should be easy to update old sites with new changes.
- Do not modify any existing default behaviour for **backend users**.
- Your code should ship with **correct access rights for backend user groups** defined in t3kit (might need update of t3kit_db)

### Browser and device support:
- Desktop browsers: **IE11, Microsoft Edge, Chrome, Firefox, Safari**
- Tablets & Phones: **iOS 9+, Android 4.4+**
