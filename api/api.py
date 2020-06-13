from flask import Flask
from AccountAPI import account_api

app = Flask(__name__)

app.register_blueprint(account_api)


@app.route('/')
def get_nothing():
    return 'hi!'


if __name__ == "__main__":
    app.run()
