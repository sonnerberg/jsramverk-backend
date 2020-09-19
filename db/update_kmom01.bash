#!/usr/bin/env bash
# -*- coding: utf-8 -*-
# Check if frontend directory exists
FILE=../../jsramverk-frontend/src/README.md
if [[ -f "$FILE" ]]; then
    echo "$FILE" is present, updating...
    /bin/cat "$FILE"  > ../reports/kmom01.md
else
    echo "FILE" not present
fi
