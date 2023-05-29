import { mapMutations } from 'vuex';
import store from '../store';
import config from '../config';
export const mixinWebsocket = {
    data(){
        return{
            ws: null,
        }
    },
    methods:{
        ...mapMutations(['setUser', 'updateUserById','addCheckIn']),
        //初始websocket
        initWebsocket(){
            let userId = localStorage.getItem('userId');
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
            let data = JSON.parse(e.data);
            console.log('ws 取得資料', data);
            switch (data.event) {
                case 'update':
                    delete data.event;
                    this.updateUserById(data.id, data);
                    break;
                case 'check_in':
                    console.log('get backend check_in : ', data);
                    store.dispatch('users/addCheckIn', data);
                    // this.addCheckIn(data);
                    break;
                default:
                    break;
            }
        },
        websocketsend(data){
            this.ws.send( data );
            //前端丟資料
            console.log('ws client send data:',data);
        },
        websocketclose(){
            console.log('ws 關閉連線')
        }
    }
}