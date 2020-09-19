#!/usr/bin/env bash
# -*- coding: utf-8 -*-
FRONTEND_README=../../jsramverk-frontend/src/README.md
BACKEND_REPORT=../reports/kmom01.md

if [[ -f "$FRONTEND_README" ]]; then
    echo "$FRONTEND_README" is present, updating...

    FRONTEND_README_TOUCHED=$(/usr/bin/env ls -l --time-style='+%s' ../../jsramverk-frontend/src/README.md | cut --delimiter=' ' --fields=6)
    BACKEND_REPORT_TOUCHED=$(/usr/bin/env ls -l --time-style='+%s' ../reports/kmom01.md | cut --delimiter=' ' --fields=6)

    if [[ "$FRONTEND_README_TOUCHED" > "$BACKEND_REPORT_TOUCHED" ]]; then
        echo "$FRONTEND_README" is newer

        /usr/bin/env cat "$FRONTEND_README"  > "$BACKEND_REPORT"
        else

        echo "$BACKEND_REPORT" is newer

        /usr/bin/env cat "$BACKEND_REPORT" > "$FRONTEND_README"
    fi

else
    echo "$FRONTEND_README" not present
fi
