#!/bin/bash
cd front
pm2 start serve.js --name pm2-dashboard
