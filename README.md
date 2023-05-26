# Websocket Project 


> ( xxx ) 都是額外的功能

## Features 
### Actions
- Client event : 
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
        - `{ 'event':'check_in' , 'user' : 'ouo' , 'pos' : [65.12,304.3] , 'message' : 'Lunch :p' }`

### schema

```python
class userModel(TypedDict):
    id: Union[str, int]
    username: str
    pos: Tuple[float, float]
    message: str
```

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



### UI 
- map
- websocket
    
### Backend



### Reference 

[Leaflet.js ( open source map api ) ](https://leafletjs.com/)

[ Mask Map : Vue + Leaflet](https://5xruby.tw/posts/how-to-create-maskmap-by-vuejs-and-osm)