#!/bin/bash
git pull --all
cd api
pip install -r requirements.txt
kill -9 `cat pm2-dashboard-api.pid`
gunicorn --bind 0.0.0.0:5000 app:app --daemon --access-logfile ./logs/pm2-dashboard-api-access.log --error-logfile ./logs/pm2-dashboard-api-err.log --pid pm2-dashboard-api.pid
ps -ef | grep gunicorn
