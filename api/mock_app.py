import json
# import pdb
# pdb.set_trace()

from datetime import datetime, timedelta
from random import randint
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
    for i in range(0, 200):
        rand = randint(1, 15)
        idx = str(i)
        uptime = datetime.now() - timedelta(hours=randint(4, 50))
        status = "online" if randint(1, 50) < 50 else "stopped"

 
        processes.append({
            "key": "key_" + idx,
            "pm_id": idx,
            "hostname": "data_" + idx,
            "name": "data_logging",
            "status": status,
            "args": [ "-n", "ens9", "coinrail", "OMG/BTC" ],
            "uptime": datetime.timestamp(uptime) * 1000,
            "restart": "3",
            "cpu": "5",
            "memory": "28663808"
        })


    return create_response(json.dumps(processes))


if __name__ == "__main__":
    app.run(debug=True)
