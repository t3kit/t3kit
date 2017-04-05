#!/bin/bash

chown -R www-data /var/www/

# start apache
exec apache2ctl -D FOREGROUND
