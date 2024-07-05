from flask import Blueprint
import motd_api_py.controllers.motd as controller

motd = Blueprint("motd", __name__)

@motd.get("/")
def read_latest():
    return controller.read_latest()

@motd.post("/")
def create():
    return controller.create()

@motd.get("/history")
def list():
    return controller.list()

@motd.get("/:id")
def read():
    return controller.read()

@motd.patch("/:id")
def update():
    return controller.update()

@motd.delete("/:id")
def remove():
    return controller.remove()
