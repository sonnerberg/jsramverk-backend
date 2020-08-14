#!/usr/bin/env bash
# -*- coding: utf-8 -*-
URL='http://localhost:3333/login'
# Adding products
TOKEN=$(curl --silent \
-H "Content-Type: application/json" \
-d '{"email":"richard@email.com", "password":"hello"}' \
-X POST "$URL" | jq '.data.token' | tr -d '"')

curl --silent -i \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{"kmomNumber":"50", "content":"# hello from curl", "githubLink": "http://www.github.com/sonnerberg"}' \
-X POST "http://localhost:3333/reports"
