import datetime
from typing import Optional

from flask_pymongo import DESCENDING
from motd_api_py.models.motd import Motd
from motd_api_py.db import get_db


def get_collection():
    return get_db().get_collection("Motd")

def create_motd(message: str) -> Motd:
    new_motd = Motd()
    new_motd.message = message
    new_motd.createdAt = datetime.datetime.now(tz=datetime.timezone.utc)
    new_motd.updatedAt = new_motd.createdAt
    result = get_collection().insert_one(new_motd.to_bson())

    new_motd._id = result.inserted_id
    return new_motd

def fetch_latest_motd() -> Optional[Motd]:
    data = get_collection().find_one(sort=["createdAt", DESCENDING])
    if data is None:
        return None
    return Motd.from_bson(data)

def populate_default_motds() -> None:
    # If there is at least ONE motd, we don't need to populate defaults
    latest = fetch_latest_motd()
    if latest is not None:
        return

    # OTHERWISE - populate the db with a default MOTD!
    create_motd("The once magnificent buildings lay in ruin, a testament to the hatred that had consumed them.")    

def fetch_motd(id: str) -> None:
    # TODO
    return None

def update_motd(id: str, new_message: str) -> None:
    # TODO
    return None

def remove_motd(id: str) -> None:
    # TODO
    return None

def list_motds(page_size: int, previous_last_id: Optional[str]) -> None:
    # TODO
    return None

