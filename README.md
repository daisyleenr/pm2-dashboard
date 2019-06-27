# Index

- [Deploy api](#Deploy-api)
- [Deploy frontend](#Deploy-frontend)

---

# Deploy api

### Requirements

- [pyenv](https://github.com/pyenv/pyenv-installer)
- [python 3](https://github.com/pyenv/pyenv#simple-python-version-management-pyenv)
- [pipenv](https://pipenv.readthedocs.io/en/latest/install/#pragmatic-installation-of-pipenv)

### Clone git

    $ git clone git@github.com:daisyleenr/ficcy-dashboard-api.git

### Install packages

    $ pipenv install

### Install packages without pipenv
pipenv를 사용하지 않는 경우에는 requirements를 생성한 후 pip install을 합니다

    $ pipenv lock --requirements > requirements.txt
    $ pip install

### Copy config.py
pm2-dashboard는 config.py에 등록된 pm2 web url로 데이터를 요청합니다. config.py를 복사하여 모니터링을 하고 싶은 pm2의 pm2 web url을 넣어줍니다.

    $ cp config.py.original config.py
    # Insert pm2 web urls.

### Run server

    $ python app.py

### Deploy server
서버에 배포할 때는 gunicorn을 사용합니다.

    $ gunicorn --bind 0.0.0.0:5000 app:app --daemon --access-logfile ./logs/ficcy-api-access.log --error-logfile ./logs/ficcy-api-err.log --pid ficcy-api.pid

### Automatic deployment
배포 스크립트는 아래와 같이 작성하여 사용합니다.

    $ sh deploy_api.sh

    #!/bin/bash
    git pull --all
    cd api
    pipenv install
    pipenv run kill -9 `cat ficcy-api.pid`
    pipenv run gunicorn --bind 0.0.0.0:5000 app:app --daemon --access-logfile ./logs/ficcy-api-access.log --error-logfile ./logs/ficcy-api-err.log --pid ficcy-api.pid
    ps -ef | grep gunicorn


---

# Deploy frontend

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
