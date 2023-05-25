from typing import Optional
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

# from deps import get_current_user, get_db
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Union
from schemas.user import User
from schemas.user import UserReceived, UserSend

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.users: dict[Union[str, int], User] = {}

    async def connect(self, websocket: WebSocket, client_id: Union[int, str]):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.users[client_id] = User(id=client_id)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def update_user(self, websocket: WebSocket, client_id: str, event: UserReceived):
        user_data = dict(manager.users[client_id])
        event_copy = event.copy()
        event_copy.pop("event", None)
        user_data.update(event_copy)
        manager.users[client_id] = User(**user_data)
        await self.broadcast(json.dumps(manager.users[client_id]))


    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def send_all_info_to_one_client(self, websocket: WebSocket):
        await websocket.send_text(json.dumps(self.users))

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@router.websocket("/stream/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            event:UserReceived = json.loads(data)
            event_name:str = str(event["event"])
            if event_name == 'join':
                await manager.broadcast(f"Client #{client_id} joined the chat")
            elif event_name == "all_info":
                await manager.send_all_info_to_one_client(websocket)
            elif event_name == "update":
                await manager.update_user(websocket, client_id, event)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")