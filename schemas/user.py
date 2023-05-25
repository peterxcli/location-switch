from typing import TypedDict, List, Union, Tuple, Dict

class User(TypedDict):
    id: Union[str, int]
    username: str
    pos: Tuple[float, float]
    message: str

class UserReceived(TypedDict):
    event: str # "message" | "join" | "leave" | "check_in" | "all_info" | "update"
    username: str
    pos: Tuple[float, float]
    message: str

class UserSend(TypedDict):
    event: str # "update" | "message" | "join" | "leave" | "check_in"
    username: User
    pos: Tuple[float, float]
    message: str