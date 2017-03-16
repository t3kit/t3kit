#!/bin/bash

mkdir typo3temp
mkdir typo3conf
chown -R www-data typo3temp
chown -R www-data typo3conf

exec apache2ctl -D FOREGROUND
