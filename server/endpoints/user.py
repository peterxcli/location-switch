from typing import Optional, Dict
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

# from deps import get_current_user, get_db
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Union
import schemas
from models import userManager, checkInManager

router = APIRouter()

@router.get("/list", response_model=Dict[str, schemas.User])
async def get_user_list():
    return {k: v.dict(exclude_unset=True, exclude_none=True) for k, v in userManager.users.items() if v}

@router.websocket("/stream/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await userManager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            event:schemas.UserReceived = schemas.UserReceived(**json.loads(data))
            event_name:str = str(event.event)
            if event_name == 'new_user':
                await userManager.handle_new_user(client_id, event, websocket)
            elif event_name == "all_info":
                await userManager.send_all_info_to_one_client(websocket)
            elif event_name == "move":
                await userManager.update_user(client_id, event, websocket)
            elif event_name == 'message':
                await userManager.update_message(client_id, event, websocket)
            elif event_name == 'check_in':
                checkInReceived = schemas.CheckInReceived(**json.loads(data))
                await userManager.update_check_in(
                        check_in_list=checkInManager.check_in_list,
                        client_id=client_id,
                        event=checkInReceived,
                        websocket=websocket
                    )
    except WebSocketDisconnect:
        await userManager.disconnect(client_id=client_id, websocket=websocket)