import os

from flask import Flask

from motd_api_py.routes.motd import motd


def create_app(test_config=None):
    # Create and config the app
    app = Flask(__name__, instance_relative_config=True)

    # Configure the app using the instance config
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    # Configure the app using the provided test config
    else:
        app.config.from_mapping(test_config)

    # Make sure that the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    import motd_api_py.db as db
    db.init_app(app)

    app.register_blueprint(motd)

    return app