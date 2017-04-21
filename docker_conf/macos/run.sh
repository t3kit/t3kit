#!/bin/bash

LOGFILE=/tmp/docker-compose.txt

chown -R www-data /var/www/

# set solrdata group to 8983 to make folder writable for solr container
chown :8983 /var/www/html/solrdata/ -R

# start apache
exec apache2ctl -D FOREGROUND
