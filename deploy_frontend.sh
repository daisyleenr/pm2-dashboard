#!/bin/bash
cd front
git pull --all
yarn install
npm run build:production
pm2 stop pm2-dashboard
pm2 start pm2-dashboard
