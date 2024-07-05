import datetime
from typing import Optional

from motd_api_py.models.motd import Motd
from motd_api_py.db import get_db


def get_collection():
    return get_db().get_collection("Motd")

def create_motd(message: str) -> Motd:
    new_motd = Motd()
    new_motd.message = message
    new_motd.created_at = datetime.datetime.now(tz=datetime.timezone.utc)
    new_motd.updated_at = new_motd.created_at
    result = get_collection().insert_one(new_motd.__dict__)

    new_motd.id = result.inserted_id
    return new_motd

def fetch_latest_motd() -> Optional[Motd]:
    # TODO
    return None

def populate_default_motds() -> None:
    # TODO
    return None

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

