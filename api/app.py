import json
# import pdb
# pdb.set_trace()

import requests
from flask import Flask, Response
from config import PM2_WEB_HOSTS

from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


def create_response(content="", status=200, mimetype="application/json"):
    return Response(content, status, mimetype=mimetype)


@app.route("/")
def hello():
    return "hello ficcy dashboard api"


@app.route("/pm2_web")
def pm2_web():
    processes = []

    for host in PM2_WEB_HOSTS:
        res = requests.get(host["url"])

        if res.status_code != 200:
            continue

        for proc in res.json()['processes']:
            processes.append({
                "key": proc['pm2_env']['unique_id'],
                "hostname": host["hostname"],
                "name": proc["name"],
                "status": proc['pm2_env']['status']
            })

    return create_response(json.dumps(processes))


if __name__ == "__main__":
    app.run(debug=True)
