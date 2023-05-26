import json
from typing import Union
import schemas
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.users: dict[Union[str, int], schemas.User] = {}

    async def connect(self, websocket: WebSocket, client_id: Union[int, str]):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.users[client_id] = schemas.User(id=client_id)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def update_user(self, websocket: WebSocket, client_id: str, event: schemas.UserReceived):
        user_data = dict(self.users[client_id])
        event_copy = event.copy()
        event_copy.pop("event", None)
        user_data.update(event_copy)
        self.users[client_id] = schemas.User(**user_data)
        resp = schemas.UserSend(**user_data, event="update")
        await self.broadcast(json.dumps(resp.dict(exclude_unset=True, exclude_none=True)))

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def send_all_info_to_one_client(self, websocket: WebSocket):
        await websocket.send_text(json.dumps({k: v.dict(exclude_unset=True, exclude_none=True) for k, v in self.users.items() if v}))

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)