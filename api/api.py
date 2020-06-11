from flask import Flask

app = Flask(__name__)

@app.route('/city')
def get_city():
    return {'name':'monroe'}