from flask import Flask, request
from flask_cors import CORS 
from controller.user_controller import user_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_blueprint, url_prefix='/user')

if __name__ == '__main__':
    app.run(port=5000)