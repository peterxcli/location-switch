import json
from typing import Union
import schemas
from fastapi import WebSocket
import uuid
import datetime

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.users: dict[Union[str, int], schemas.User] = {}

    async def connect(self, websocket: WebSocket, client_id: Union[int, str]):
        await websocket.accept()
        self.active_connections.append(websocket)
        if client_id not in self.users:
            self.users[client_id] = schemas.User(id=client_id)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def update_user(self, client_id: str, event: schemas.UserReceived, websocket: WebSocket):
        print(f"update_user: {event}")
        user_data = dict(self.users[client_id])
        event_copy = event.dict(exclude_none=True, exclude_unset=True).copy()
        event_copy.pop("event", None)
        user_data.update(event_copy)
        self.users[client_id] = schemas.User(**user_data)
        resp = schemas.UserSend(**user_data, event="update")
        resp_json = json.dumps(resp.dict(exclude_unset=True, exclude_none=True))
        await self.broadcast(resp_json, exclude_self=True, websocket=websocket)

    async def update_message(self, client_id: str, event: schemas.UserReceived, websocket: WebSocket):
        self.users[client_id].message = event.message
        resp = schemas.UserSend(event="message", id=client_id, message=event.message)
        resp_json = json.dumps(resp.dict(exclude_unset=True, exclude_none=True))
        await self.broadcast(resp_json, exclude_self=True, websocket=websocket)

    async def update_check_in(self, check_in_list: dict, client_id: str, event: schemas.CheckInReceived, websocket: WebSocket):
        event_copy = event.copy()
        user = self.users[client_id]
        checkIn: schemas.CheckIn = schemas.CheckIn(**event_copy.dict())
        checkIn.id = str(uuid.uuid4())
        checkIn.user_id = client_id
        checkIn.username = user.username
        checkIn.created_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        check_in_list[checkIn.id] = checkIn.dict(exclude_unset=True, exclude_none=True)
        resp = schemas.CheckInSend(**checkIn.dict(exclude_unset=True, exclude_none=True), event="check_in")
        resp_json = json.dumps(resp.dict(exclude_unset=True, exclude_none=True))
        await self.broadcast(resp_json, exclude_self=True, websocket=websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def send_all_info_to_one_client(self, websocket: WebSocket):
        text = json.dumps({k: v.dict(exclude_unset=True, exclude_none=True) for k, v in self.users.items() if v})
        await websocket.send_text(text)

    async def broadcast(self, message: str, exclude_self: bool = False, websocket: WebSocket = None):
        for connection in self.active_connections:
            if exclude_self and connection == websocket:
                continue
            await connection.send_text(message)