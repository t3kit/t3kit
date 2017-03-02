#!/bin/bash

chown -R xfs:xfs /source
exec bg-sync
