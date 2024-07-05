from motd_api_py import app
import motd_api_py.controllers.motd as controller

@app.get("/")
def motdReadLatest():
    return controller.readLatest()

@app.post("/")
def motdCreate():
    return controller.create()

@app.get("/history")
def motdList():
    return controller.list()

@app.get("/:id")
def motdRead():
    return controller.read()

@app.patch("/:id")
def motdUpdate():
    return controller.update()

@app.delete("/:id")
def motdRemove():
    return controller.remove()
