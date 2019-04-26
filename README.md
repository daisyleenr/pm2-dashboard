# Index

- [Deploy ficcy-dashboard api](#Deploy-ficcy-dashboard-api)
- [Deploy ficcy-dashboard frontend](#Deploy-ficcy-dashboard-frontend)

---

# Deploy ficcy-dashboard-api

### Clone git

    $ git clone git@github.com:daisyleenr/ficcy-dashboard-api.git

### Install packages

    $ pipenv install

### Copy [config.py](http://config.py/)

    $ cp config.py.original config.py
    # Insert pm2 web urls.

### Run server

    $ gunicorn --bind 0.0.0.0:5000 app:app --daemon --access-logfile ./logs/ficcy-api-access.log --error-logfile ./logs/ficcy-api-err.log --pid ficcy-api.pid

### Automatic deployment

    $ sh deploy_api.sh

    #!/bin/bash
    cd ficcy-dashboard-api
    git pull --all
    pipenv install
    pipenv run kill -9 `cat vanellope.pid`
    pipenv run gunicorn --bind 0.0.0.0:5000 app:app --daemon --access-logfile ./logs/ficcy-api-access.log --error-logfile ./logs/ficcy-api-err.log --pid ficcy-api.pid
    ps -ef | grep gunicorn

---

# Deploy ficcy-dashboard frontend

### Clone git

    $ git clone git@github.com:daisyleenr/ficcy-dashboard.git

### Install packages

    $ yarn install

### Build

    $ npm run build:production

### Run static server

    $ pm2 start serve.js --name ficcy-dashboard

### Automatic deployment

    $ sh deploy_frontend.sh

    #!/bin/bash
    cd ficcy-dashboard
    git pull --all
    yarn install
    npm run build:production
    pm2 stop ficcy-dashboard
    pm2 start ficcy-dashboard
