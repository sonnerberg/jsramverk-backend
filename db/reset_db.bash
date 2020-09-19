#!/usr/bin/env bash
# -*- coding: utf-8 -*-
# create the file if it does not exist or empty the file if it exists
true > texts.sqlite
sqlite3 texts.sqlite < migrate.sql
# Update kmom01 from README.md in frontend
./update_kmom01.bash
# Find the files
KMOMFILES="$(/bin/ls -1 ../reports/ | grep  -E 'kmom[0-9]+.md')"
KMOMLINKFILES="$(/bin/ls -1 ../reports/ | grep  -E 'kmom[0-9]+link.md')"

# Put the strings of filenames into arrays
KMOMFILES=($KMOMFILES)
KMOMLINKFILES=($KMOMLINKFILES)

for index in ${!KMOMFILES[*]}; do
    KMOM="${KMOMFILES[$index]//\.md/''}"
    CONTENT=$(< ../reports/"${KMOMFILES[$index]}")
    GITHUBLINK=$(< ../reports/"${KMOMLINKFILES[$index]}")
    sqlite3 texts.sqlite "INSERT INTO texts VALUES (\"$KMOM\", \"$CONTENT\", \"$GITHUBLINK\")"
done
