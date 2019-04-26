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
    return "hello ficcy dashboard mock api"


@app.route("/pm2_web")
def pm2_web():
    processes = []
    for i in range(0, 20):
        idx = str(i)
        processes.append({
            "key": "key_" + idx,
            "hostname": "hostname_" + idx,
            "name": "name_" + idx,
            "status": "status_" + idx,
            "args": ["arg_" + idx + "_1", "arg_" + idx + "_2", "arg_" + idx + "_3", "arg_" + idx + "_4"]
        })

    return create_response(json.dumps(processes))


if __name__ == "__main__":
    app.run(debug=True)
