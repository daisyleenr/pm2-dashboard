#!/bin/bash
cd front
git reset --hard HEAD
git pull --all
yarn install
npm run build:production
pm2 stop ficcy-dashboard
pm2 start ficcy-dashboard
