#!/bin/bash

USERNAME="t3kit"
PASSWORD="t3kit1234"
DATABASE="t3kit"

if [ -f "/.dockerenv" ]; then
	mysqldump -hdb -u"$USERNAME" -p"$PASSWORD" "$DATABASE" be_users > /var/www/shared/db/be_users.sql
else
	mysqldump -u"$USERNAME" -p"$PASSWORD" "$DATABASE" be_users > be_users.sql
fi
