#!/bin/bash
git pull --all
cd api
pipenv install
pipenv run kill -9 `cat ficcy-api.pid`
pipenv run gunicorn --bind 0.0.0.0:5000 app:app --daemon --access-logfile ./logs/ficcy-api-access.log --error-logfile ./logs/ficcy-api-err.log --pid ficcy-api.pid
ps -ef | grep gunicorn
