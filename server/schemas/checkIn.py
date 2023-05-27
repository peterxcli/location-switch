from typing import List, Optional, Union, Tuple, Dict
from pydantic import BaseModel, Field
from datetime import datetime

class CheckIn(BaseModel):
    id: Optional[Union[str, int]] = Field(None)
    user_id: str = Field(None)
    username: Optional[str] = Field(None)
    pos: Optional[Tuple[float, float]] = Field(None)
    img: Optional[str] = Field(None)
    content: Optional[str] = Field(None)
    created_at: Optional[str] = Field(None)

class CheckInReceived(BaseModel):
    event: str = Field(...) # "message" | "join" | "leave" | "check_in" | "all_info" | "update"
    pos: Optional[Tuple[float, float]] = Field(None)
    img: Optional[str] = Field(None)
    content: Optional[str] = Field(None)

class CheckInSend(CheckIn):
    event: str