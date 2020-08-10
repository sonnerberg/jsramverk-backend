#!/usr/bin/env bash
# -*- coding: utf-8 -*-

curl -d '{"email":"richard@email.com", "password":"hello"}' \
-H "Content-Type: application/json" \
-X POST http://localhost:3333/register

curl -d '{"email":"richard@email.com", "password":"hello"}' \
-H "Content-Type: application/json" \
-X POST http://localhost:3333/login
