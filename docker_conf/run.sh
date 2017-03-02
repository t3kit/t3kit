#!/bin/bash

chown -R www-data:www-data /var/www/html

sh /t3kit_db/restore.sh

exec apache2ctl -D FOREGROUND
