from flask import Flask
from motd_api_py.routes.motd import motd

app = Flask(__name__)
app.register_blueprint(motd)