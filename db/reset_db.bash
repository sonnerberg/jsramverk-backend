#!/usr/bin/env bash
# -*- coding: utf-8 -*-
# create the file if it does not exist or empty the file if it exists
true > texts.sqlite
sqlite3 texts.sqlite < migrate.sql
