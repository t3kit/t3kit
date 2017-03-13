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

# t3kit v8  (BETA) [![t3kit](https://img.shields.io/badge/t3kit-8.0.0-green.svg?style=flat-square)](https://github.com/t3kit/t3kit) [![TYPO3](https://img.shields.io/badge/TYPO3-8.5.0-orange.svg?style=flat-square)](https://typo3.org/)

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
composer install
docker-compose up -d
docker exec -it web /t3kit_db/setupdb.sh
```

Start using **composer**:
```
composer create-project t3kit/t3kit t3kit dev-master --keep-vcs
cd t3kit
docker-compose up -d
docker exec -it web /t3kit_db/setupdb.sh
```

### t3kit database manipulation - Setup/Restore/Pack:

* Setup t3kit db: `docker exec -it web /t3kit_db/setupdb.sh`
* Restore t3kit db: `docker exec -it web /t3kit_db/restoredb.sh`
* Pack (save) t3kit db: `docker exec -it web /t3kit_db/packdb.sh`


### phpMyAdmin
#### Run phpMyAdmin docker container and connect it to t3kit:

```
docker run --name phpmyadmin -dp 8889:80 --network t3kit_default --rm -e PMA_HOST=db phpmyadmin/phpmyadmin
```

* `t3kit_default` - default docker network name based on `t3kit` folder name.
* `db ` - default t3kit database host name (from docker-compose).

***


# Production

### Required dependencies:

* [Composer](https://getcomposer.org/)

### Create new project based on t3kit:

```
composer create-project t3kit/t3kit [<directory>] [<version>] --prefer-dist --no-dev
```


# t3kit structure

...


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

### We found some temporary workaround how to fix it partly:

Instead of using `docker-compose up -d` you can try to use alternative docker-compose configuration `docker-compose -f docker-compose.mac.yml up -d`

Also, keep in mind after executing this script you have to wait ~5 - 8 min until all files will be synced.

_Note:_ To fix issues with permission: `d exec -it web chown -R www-data /var/www/html/typo3conf`
