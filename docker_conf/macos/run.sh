#!/bin/bash

LOGFILE=/tmp/docker-compose.txt

chown -R www-data /var/www/html/

# Make www-data user and group use id:s from hosts user to make shared folder writable.
#
# fetch current userid and groupid for user www-data
WWW_DATA_USERID=$(id -u www-data)
WWW_DATA_GROUPID=$(id -g www-data)
# if current userid doesn't equal the one from yaml, force id of user to the one from yaml
if [ "$WWW_DATA_USERID" -ne "${USERID}" ];then
    echo "run.sh : usermod -u ${USERID} www-data" >> $LOGFILE
    usermod -u ${USERID} www-data
fi
# if current groupid doesn't equal the one from yaml, force id of group to the one from yaml
if [ "$WWW_DATA_GROUPID" -ne "${GROUPID}" ];then
    echo "run.sh : groupmod -g ${GROUPID} www-data" >> $LOGFILE
    groupmod -g ${GROUPID} www-data
fi

# set solrdata group to 8983 to make folder writable for solr container
chown :8983 /var/www/html/solrdata/ -R

# start apache
exec apache2ctl -D FOREGROUND
