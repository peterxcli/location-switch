import json
from typing import Union, Dict
import schemas

class StateManager:
    def __init__(self):
        self.check_in_list: dict[Union[str, int], schemas.CheckIn] = {}

    def get(self, id) -> schemas.CheckIn:
        return self.check_in_list.get(id)

    def append(self, check_in: schemas.CheckIn):
        self.check_in_list[check_in.id] = check_in

    def update(self, check_in: schemas.CheckIn):
        self.check_in_list[check_in.id] = check_in

    def delete(self, id):
        self.check_in_list.pop(id)