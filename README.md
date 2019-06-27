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

    $ pip install -r requirements.txt

### Set up config.py
pm2는 `pm2 web`이라는 명령을 입력하면 9615 port로 pm2의 정보를 제공하는 pm2-http-interface 프로세스를 띄웁니다.

    $ pm2 web
    ┌────────────────────┬────┬──────┬────────┬───┬─────┬───────────┐
    │ Name               │ id │ mode │ status │ ↺ │ cpu │ memory    │
    ├────────────────────┼────┼──────┼────────┼───┼─────┼───────────┤
    │ pm2-http-interface │ 1  │ fork │ online │ 0 │ 0%  │ 18.2 MB   │
    └────────────────────┴────┴──────┴────────┴───┴─────┴───────────┘

pm2-http-interface를 띄운 후 해당 IP와 Port를 config.py에 넣어줍니다. url은 여러개 등록할 수 있습니다. 외부 서버의 pm2를 모니터링 할 때에는 해당 port로 접근할 수 있는지 확인해주세요.

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
