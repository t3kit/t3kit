#!/usr/bin/env bash

source .env

DB_CONTAINER_STATUS=$(docker inspect -f {{.State.Running}} $DB_CONTAINER_NAME)
if [ "$DB_CONTAINER_STATUS" = false ] ; then
    echo "Docker container '$DB_CONTAINER_NAME' is not running..."
    exit 255
fi

WEB_CONTAINER_STATUS=$(docker inspect -f {{.State.Running}} $WEB_CONTAINER_NAME)
if [ "$WEB_CONTAINER_STATUS" = false ] ; then
    echo "Docker container '$WEB_CONTAINER_NAME' is not running..."
    exit 255
fi
#echo "DB_CONTAINER_NAME = $DB_CONTAINER_NAME"
#echo "WEB_CONTAINER_NAME = $WEB_CONTAINER_NAME"

echo -e "\nRunning script restoredb in container:"
echo "docker exec -i "$WEB_CONTAINER_NAME" /var/www/html/vendor/t3kit/db/restoredb.sh"
echo -e "\n"
docker exec -i "$WEB_CONTAINER_NAME" /var/www/html/vendor/t3kit/db/restoredb.sh

echo -e "\nRunning database compare in container:"
echo "docker exec -i -u www-data -e TYPO3_CONTEXT=Development/Docker "$WEB_CONTAINER_NAME" /var/www/html/vendor/helhum/typo3-console/typo3cms database:updateschema"
echo -e "\n"
docker exec -i -u www-data -e TYPO3_CONTEXT=Development/Docker "$WEB_CONTAINER_NAME" /var/www/html/vendor/helhum/typo3-console/typo3cms database:updateschema

# Temporary to set "what theme to use"
echo -e "\nUpdate domain, add Theme - t3kit to static includes, add Theme -t3kit ro page ts config include in container"
docker exec -i "$WEB_CONTAINER_NAME" mysql -u"$DB_USER" -p"$DB_PASSWORD" -h"$DB_CONTAINER_NAME" "$DB_NAME" -e "UPDATE sys_domain SET domainName = 'localhost:8888' WHERE uid = 1 AND domainName != 'localhost:8888';"

docker exec -i "$WEB_CONTAINER_NAME" mysql -u"$DB_USER" -p"$DB_PASSWORD" -h"$DB_CONTAINER_NAME" "$DB_NAME" -e "UPDATE sys_template SET include_static_file = CONCAT(include_static_file,',EXT:theme_t3kit/Configuration/TypoScript/Theme/') WHERE uid = 1 AND include_static_file not like '%,EXT:theme_t3kit/Configuration/TypoScript/Theme/%';"

docker exec -i "$WEB_CONTAINER_NAME" mysql -u"$DB_USER" -p"$DB_PASSWORD" -h"$DB_CONTAINER_NAME" "$DB_NAME" -e "UPDATE pages SET tsconfig_includes = 'EXT:theme_t3kit/Configuration/TSconfig/Page/theme_t3kit.typoscript' WHERE uid = 1 AND tsconfig_includes = '';"


#* Setup t3kit db: `docker exec -it web /var/www/html/vendor/t3kit/db/setupdb.sh`
#* Restore t3kit db: `docker exec -it web /var/www/html/vendor/t3kit/db/restoredb.sh`
#* Pack (save) t3kit db: `docker exec -it web /var/www/html/vendor/t3kit/db/packdb.sh`
