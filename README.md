***

# t3kit v7 on branch [t3kit7](https://github.com/t3kit/t3kit/tree/t3kit7)


Previous version of **t3kit v7** you can find on branch [t3kit7](https://github.com/t3kit/t3kit/tree/t3kit7), or you can use git tags to chose needed version:
```
git checkout 7.11.3
or
git checkout 7.10.0
```
_this message will be here until stable version of **t3kit v8**_

***

# t3kit [![t3kit](https://img.shields.io/badge/t3kit-8.0.0-blue.svg?style=flat-square)](https://github.com/t3kit/t3kit) [![TYPO3](https://img.shields.io/badge/TYPO3-8.7.1-orange.svg?style=flat-square)](https://typo3.org/)

## [Starter kit](http://t3kit.com/) for TYPO3 CMS. Tools, extensions, configurations and templates.



***


* [Development](#development)
* [Production](#production)
* [t3kit structure](#t3kit-structure)
* [t3kit versioning](#t3kit-versioning)
* [CHANGELOG](https://github.com/t3kit/t3kit/blob/master/CHANGELOG.md)
* [Contributing to t3kit](https://github.com/t3kit/t3kit/blob/master/CONTRIBUTING.md)


***

# Development

### Required dependencies:

* [Git](https://git-scm.com/)
* [Composer](https://getcomposer.org/)
* [Docker](https://docker.com/)

### Setup development environment:

Start using **git**:
```
git clone https://github.com/t3kit/t3kit.git
cd t3kit
composer install --ignore-platform-reqs
# Note for MAC users there a specific commands further down in the documentation
docker-compose up -d
docker exec -it web /t3kit_db/setupdb.sh
```

Start using **composer**:
```
composer create-project t3kit/t3kit t3kit dev-master --keep-vcs --ignore-platform-reqs
cd t3kit
# Note for MAC users there a specific commands further down in the documentation
docker-compose up -d
docker exec -it web /t3kit_db/setupdb.sh
```

### t3kit database manipulation - Setup/Restore/Pack:

* Setup t3kit db: `docker exec -it web /t3kit_db/setupdb.sh`
* Restore t3kit db: `docker exec -it web /t3kit_db/restoredb.sh`
* Pack (save) t3kit db: `docker exec -it web /t3kit_db/packdb.sh`

### Verify the installation:

* Open in browser: `localhost:8888`


### phpMyAdmin
#### Run phpMyAdmin docker container and connect it to t3kit:

```
docker run --name phpmyadmin -dp 8889:80 --network t3kit_default --rm -e PMA_HOST=t3kit_db phpmyadmin/phpmyadmin
```

* `t3kit_default` - default docker network name based on `t3kit` folder name.
* `t3kit_db` - default t3kit database host name (from docker-compose).

***


# Production

### Required dependencies:

* [Composer](https://getcomposer.org/)

### Create new project based on t3kit:

```
composer create-project t3kit/t3kit [<directory>] [<version>] --prefer-dist --no-dev
```

***


# t3kit structure

**t3kit** consist of **three** main parts plus additional [**extension**](https://github.com/t3kit/subtheme_t3kit_template) which intended to help extend functionality for base t3kit components.
1. [**t3kit**](https://github.com/t3kit/t3kit) - main repository with (TYPO3) website root (typo3conf, fileadmin, favicons), tests, Docker configurations and CI configurations (.circleci). **t3kit** repo depend on two mentioned below composer dependencies: `theme_t3kit` and `t3kit_db`.
2. [**theme_t3kit**](https://github.com/t3kit/theme_t3kit) - main part of t3kit conception. Theme extension based on [TYPO3 Themes](http://www.typo3-themes.org/). It consists of new content elements, Gridelements configurations, predefined BE layouts, main menu, Solr search templates, bunch of TS configurations, Theme constants (main colors, typography, show/hide elements) and independent FE part called [felayout_t3kit](https://github.com/t3kit/theme_t3kit/tree/master/felayout_t3kit) (JS, CSS, images, icons, components)
3. [**t3kit_db**](https://github.com/t3kit/t3kit_db) default database for **t3kit** with configuration, page tree and examples of content elements. Also, it includes [scripts](#t3kit-database-manipulation---setuprestorepack) to operate with DB (setup, restore, pack)

* [**subtheme_t3kit_template**](https://github.com/t3kit/subtheme_t3kit_template) - additional extension template which shows us an example how easily change t3kit configuration, modify templates and layouts and create new content elements.
  * There two ways how to create new **t3kit subtheme** based on `subtheme_t3kit_template`:
    - use `t3kit-cli` (_under construction_)
    - clone `subtheme_t3kit_template` and **manually adapt** it to your needs (change name, constants, configurations, content elements, templates)


***


# t3kit versioning

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

***


# Docker-compose for mac users:

### Native docker has some performance issues on mac:
* https://github.com/docker/for-mac/issues/77
* https://docs.docker.com/docker-for-mac/osxfs/#performance-issues-solutions-and-roadmap

### We suggest to use [docker-sync](http://docker-sync.io) as a temporary solution.

Instead of using `docker-compose.yml` you can try to use alternative docker-compose configuration `docker-compose.mac.yml + docker-sync.yml`

Start containers:
```
cd t3kit
docker-sync start
docker-compose -f docker-compose.mac.yml up -d
```

Stop containers:
```
docker-sync clean
docker-compose stop
```

_Note:_ To fix issues with permission: `docker exec -it web chown -R www-data /var/www/html`

