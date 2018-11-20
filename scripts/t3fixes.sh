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

echo -e "\nRunning script in container:"
echo "docker exec -i -u www-data "$WEB_CONTAINER_NAME" /var/www/html/vendor/helhum/typo3-console/typo3cms install:fixfolderstructure"
echo -e "\n"
docker exec -i -u www-data "$WEB_CONTAINER_NAME" /var/www/html/vendor/helhum/typo3-console/typo3cms install:fixfolderstructure

echo -e "\nRunning script in container:"
echo "docker exec -i -u www-data "$WEB_CONTAINER_NAME" /var/www/html/vendor/helhum/typo3-console/typo3cms install:generatepackagestates"
echo -e "\n"
docker exec -i -u www-data "$WEB_CONTAINER_NAME" /var/www/html/vendor/helhum/typo3-console/typo3cms install:generatepackagestates
