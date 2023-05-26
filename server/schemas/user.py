from typing import List, Optional, Union, Tuple, Dict
from pydantic import BaseModel, Field

class User(BaseModel):
    id: Optional[Union[str, int]] = Field(None)
    username: Optional[str] = Field(None)
    pos: Optional[Tuple[float, float]] = Field(None)
    message: Optional[str] = Field(None)

class UserReceived(BaseModel):
    event: str = Field(...) # "message" | "join" | "leave" | "check_in" | "all_info" | "update"
    username: Optional[str] = Field(None)
    pos: Optional[Tuple[float, float]] = Field(None)
    message: Optional[str] = Field(None)

class UserReceived(BaseModel):
    event: str # "message" | "join" | "leave" | "check_in" | "all_info" | "update"
    username: str
    pos: Tuple[float, float]
    message: str

class UserDict(BaseModel):
    users: Dict[str, User]

class UserSend(User):
    event: str # "update" | "message" | "join" | "leave" | "check_in"