import { mapMutations } from 'vuex';
import config from '../config';
export const mixinWebsocket = {
    data(){
        return{
            ws: null,
        }
    },
    methods:{
         ...mapMutations(['setUser']),
        //初始websocket
        initWebsocket(){
            userId = localStorage.getItem('userId');
            let wsURL = `${config.server_ws}/user/stream/${userId}`;
            this.ws = new WebSocket(wsURL);
            this.ws.onopen = this.websocketonopen;
            this.ws.error = this.websocketonerror;
            this.ws.onmessage = this.websocketonmessage;
            this.ws.onclose = this.websocketclose;
        },
        websocketonopen(){
            console.log('ws 連線成功~~');
        },
        websocketonerror(e){
            console.error('ws 連線失敗',e);
        },
        websocketonmessage(e){
            // 後端通知前端，前端取得資料
            let _data = e.data;
            //當有後端資料送到前端，利用vuex存到共用的state
            this.setWsNotify({
                id:uuid.v4(), 
                data: JSON.parse(_data)
            });
            console.log('ws 取得資料',_data);
        },
        websocketsend(data){
            event_name = data.event;
            //前端丟資料
            console.log('send data',data);
        },
        websocketclose(){
            console.log('ws 關閉連線')
        }
    }
}