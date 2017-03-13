#!/bin/bash

# stop apache
apache2ctl stop

# Moving TYPO3 temp out of shared folders to improve speed
mkdir /typo3temp
chown -R www-data /typo3temp
rm -rf /var/www/html/typo3temp
ln -s /typo3temp typo3temp

# start apache
exec apache2ctl -D FOREGROUND
