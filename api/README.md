# ficcy-dashboard-api

## Run
```
$ pip install
$ python app.py
```

## Run with pipenv
```
$ pipenv install
$ pipenv shell
$ python app.py
```

## export requirements.txt from Pipfile
```
$ pipenv lock --requirements > requirements.txt
```

---

## Deploy
```
$ gunicorn --bind 0.0.0.0:5000 app:app --daemon --access-logfile ./logs/ficcy-api-access.log --error-logfile ./logs/ficcy-api-err.log --pid ficcy-api.pid
$ kill -9 `cat ficcy-api.pid`
```