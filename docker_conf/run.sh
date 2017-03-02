#!/bin/bash

sh /t3kit_db/restore.sh

exec apache2ctl -D FOREGROUND
