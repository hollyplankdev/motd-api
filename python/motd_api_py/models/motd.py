from datetime import datetime

class Motd:
    _id: str
    message: str
    createdAt: datetime
    updatedAt: datetime

    @staticmethod
    def from_bson(data):
        motd = Motd()
        motd._id = data["_id"]
        motd.message = data["message"]
        motd.createdAt = data["createdAt"]
        motd.updatedAt = data["updatedAt"]
        return motd
    
    def to_bson(self):
        return self.__dict__

