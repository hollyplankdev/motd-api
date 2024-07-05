from motd_api_py import app

@app.get("/")
def motdReadLatest():
    return None

@app.post("/")
def motdCreate():
    return None

@app.get("/history")
def motdList():
    return None

@app.get("/:id")
def motdRead():
    return None

@app.patch("/:id")
def motdUpdate():
    return None

@app.delete("/:id")
def motdRemove():
    return None
