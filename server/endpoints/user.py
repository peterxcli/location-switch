from typing import Optional, Dict
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

# from deps import get_current_user, get_db
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Union
import schemas
from models import userManager

router = APIRouter()

@router.get("/list")
async def get_user_list():
    return {k: v.dict(exclude_unset=True, exclude_none=True) for k, v in userManager.users.items() if v}

@router.websocket("/stream/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await userManager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            event:schemas.UserReceived = json.loads(data)
            event_name:str = str(event["event"])
            if event_name == 'join':
                await userManager.broadcast(f"Client #{client_id} joined the chat")
            elif event_name == "all_info":
                await userManager.send_all_info_to_one_client(websocket)
            elif event_name == "update":
                await userManager.update_user(websocket, client_id, event)
    except WebSocketDisconnect:
        userManager.disconnect(websocket)
        await userManager.broadcast(f"Client #{client_id} left the chat")