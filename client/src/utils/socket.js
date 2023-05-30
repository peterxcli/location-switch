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
        async initWebsocket(){
            let userId = localStorage.getItem('userId');
            let wsURL = `${config.server_ws}/user/stream/${userId}`;
            this.ws = new WebSocket(wsURL);
            this.ws.onopen = () => this.websocketonopen();
            this.ws.error = this.websocketonerror;
            this.ws.onmessage = this.websocketonmessage;
            this.ws.onclose = this.websocketclose;
            this.initNewUser = false;
        },
        websocketonopen(){
            const newUserEvent = {
                event: 'new_user',
                username : localStorage.getItem('username'),
            }
            this.ws.send(JSON.stringify(newUserEvent));
            console.log('ws 連線成功~~');
        },
        websocketonerror(e){
            console.error('ws 連線失敗', e);
        },
        websocketonmessage(e){
            let data = JSON.parse(e.data);
            console.log('ws 取得資料', data);
            switch (data.event) {
                case 'update':
                    delete data.event;
                    // this.updateUserById(data.id, data);
                    console.log('updateUserById:::',data.id, data);
                    store.dispatch('users/updateUserById', data);
                    break;
                case 'check_in':
                    console.log('get backend check_in : ', data);
                    store.dispatch('users/addCheckIn', data);
                    break;
                case 'message':
                    store.dispatch('users/updateUserMessageById', data);
                    break;
                default:
                    break;
            }
        },
        websocketsend(data){
            // if( !this.initNewUser){
            //     console.log('init new user');
            //     this.initNewUser = true;
            //     const newUserEvent = {
            //         event: 'new_user',
            //         username : localStorage.getItem('username'),
            //     }
            //     this.ws.send(JSON.stringify(newUserEvent));
            // }
            this.ws.send( data );
            //前端丟資料
            console.log('ws client send data:',data);
        },
        websocketclose(){
            console.log('ws 關閉連線')
        }
    }
}