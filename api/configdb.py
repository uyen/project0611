import psycopg2
import json
from decimal import Decimal

def configdb():
    return {"user":"postgres",
          "password":"uyen",
          "host" : "127.0.0.1",
          "port" : "5432",
          "database" : "World"}

class CustomJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(CustomJsonEncoder, self).default(obj)