# Index

- [Deploy ficcy-dashboard api](#Deploy-ficcy-dashboard-api)
- [Deploy ficcy-dashboard frontend](#Deploy-ficcy-dashboard-frontend)

---

# Deploy ficcy-dashboard-api

### Requirements

- [pyenv](https://github.com/pyenv/pyenv-installer)
- [python 3](https://github.com/pyenv/pyenv#simple-python-version-management-pyenv)
- [pipenv](https://pipenv.readthedocs.io/en/latest/install/#pragmatic-installation-of-pipenv)

### Clone git

    $ git clone git@github.com:daisyleenr/ficcy-dashboard-api.git

### Install packages

    $ pipenv install

### Install packages without pipenv

    $ pipenv lock --requirements > requirements.txt
    $ pip install

### Copy config.py

    $ cp config.py.original config.py
    # Insert pm2 web urls.

### Run server

    $ python app.py

### Deploy server

    $ gunicorn --bind 0.0.0.0:5000 app:app --daemon --access-logfile ./logs/ficcy-api-access.log --error-logfile ./logs/ficcy-api-err.log --pid ficcy-api.pid

### Automatic deployment

    $ sh deploy_api.sh

    #!/bin/bash
    #!/bin/bash
    git pull --all
    cd api
    pipenv install
    pipenv run kill -9 `cat ficcy-api.pid`
    pipenv run gunicorn --bind 0.0.0.0:5000 app:app --daemon --access-logfile ./logs/ficcy-api-access.log --error-logfile ./logs/ficcy-api-err.log --pid ficcy-api.pid
    ps -ef | grep gunicorn


---

# Deploy ficcy-dashboard frontend

### Requirements

- [nvm](https://github.com/nvm-sh/nvm#install--update-script)
- [Node.js LTS](https://github.com/nvm-sh/nvm#long-term-support)
- [yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable)
- [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/#installation)

### Clone git

    $ git clone git@github.com:daisyleenr/ficcy-dashboard.git

### Install packages

    $ yarn install

### Run application

    $ yarn start --env=dev

### Deploy

#### Build

    $ yarn run build:production

#### Run static server

    $ pm2 start serve.js --name ficcy-dashboard

### Automatic deployment

    $ sh deploy_frontend.sh

    #!/bin/bash
    cd front
    git pull --all
    yarn install
    npm run build:production
    pm2 stop ficcy-dashboard
    pm2 start ficcy-dashboard
