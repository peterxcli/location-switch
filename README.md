# Websocket Project

> ( xxx ) 都是額外的功能

## Features

- User
先以所有用戶
( 有時間再加 DB , 輸入使用者名稱，uniqe id )

- WASD 移動

- 頭上冒泡泡訊息：
右邊一個側欄
文字
（ 貼圖 ）

- 打卡（ 出現一個紅點 類似 Google map
一樣透過右邊側欄
店家 星星數 距離
（ 分享資訊 ）

### localstorage
- `username`: str
- `userId` : uuid4 ( from `utils` )

### Actions

- Client to backend :
  - interface : `{ 'event':'xxx' , .... }`
  - `event` :
    - `new_user`
    - `move`
    - `message`
    - `check_in`
  - new_user :
    - `{ 'event':'new_user' , 'user' : 'jason' }`
  - move :
    - `{ 'event':'move' , 'user' : 'peter' , 'pos' : [ 11.15,22.21 ] }`
  - message :
    - `{ 'event':'message' , 'user' : 'owen' , 'message' : 'Hi all!' }`
  - check_in :
    - `{ 'event':'check_in' , 'user' : 'ouo' , 'pos' : [65.12,304.3], 'img' : 'image_url' , 'content' : 'Lunch :p', 'created_at': '2020-04-0 12:00:00' }`

- Backend to client :
  - `event` :
    - `update`
    - `message`
    - `check_in`
  - update
    - { 'event':'update' , 'username': 'jason', 'pos' : [11.22, 33.44] }
  - message
    - { 'event':'message' , 'username': 'jason', 'pos' : [11.22, 33.44], message: 'Hi all!' }
  - check_in
    - {'event': 'check_in', 'id': 'twjet-wrqwrwqe', 'user_id': 'fwefwe34wre', 'username': 'jason', 'pos': [11.22, 33.44], 'img': 'image_url', 'content': 'Lunch :p', 'created_at': '2020-04-0 12:00:00''}

### schema

```python
class userModel(TypedDict):
    id: Union[str, int]
    username: str
    pos: Tuple[float, float]
    message: str
```

### backend ws routes

// TBD

### Frontend state
>
> **TBD : Is mySelf state necessary ?**

- `myself` : dict

    ```jason
    { 'user' : 'ouo' , 'pos' : [11.22,33.44]}
    ```

- `users` : dict

    ```json
    { 
        'jason' , { 'pos' : [12.3,3.21] } ,
        'ouob' , { 'pos' : [12.3,3.21] },
    }
    ```

- `checkIn` : list

    ```jason
    [ 
        { 'user' : 'jason', 'pos' : [11.22,33.44] , 'img' : 'image_url' , 'content' : 'Save water for beer!' } ,
        { 'user' : 'OuO', 'pos' : [11.22,33.44] , 'img' : 'image_url' , 'content' : 'ouo' } ,
    ]
    ```

### UI

- map
- websocket

### Backend

### Reference

[Leaflet.js ( open source map api )](https://leafletjs.com/)

[Mask Map : Vue + Leaflet](https://5xruby.tw/posts/how-to-create-maskmap-by-vuejs-and-osm)

[How to change map center in leaflet.js](https://stackoverflow.com/questions/12735303/how-to-change-the-map-center-in-leaflet-js)
