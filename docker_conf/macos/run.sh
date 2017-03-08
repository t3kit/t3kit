#!/bin/bash

chown -R www-data:www-data /var/www

exec apache2ctl -D FOREGROUND
