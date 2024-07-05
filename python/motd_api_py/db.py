from flask import Flask, current_app, g
from flask_pymongo import PyMongo
from werkzeug.local import LocalProxy
import click

def init_app(app: Flask):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

@click.command('init-db')
def init_db_command():
    init_db()
    click.echo("Initialized the DB.")

def init_db():
    db = get_db()
    # Do anything to init DB

def get_db():
    if 'db' not in g:
        # Do whatever to create DB connection
        g.db = PyMongo(current_app).db
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    # Do whatever to destroy db connection