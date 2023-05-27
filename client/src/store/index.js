import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// check READMD.md - `Frontend state` for details
export default new Vuex.Store({
	state: {
        //myself : {}, // { 'user' : 'jason' , 'pos' : [11.22,33.44] }
        users : {}, // { 'user1' : { 'pos' : [11.22,33.44] } , 'user2' : { 'pos' : [11.22,33.44] }  
        checkIn : [] // [ { 'user' : 'jason', 'pos' : [11.22,33.44] , 'img' : 'image_url' , 'content' : 'Save water for beer!' } , { 'user' : 'OuO', 'pos' : [11.22,33.44] , 'img' : 'image_url' , 'content' : 'ouo' }  ]
	},
	mutations: {
        addUser(state, username,pos) { // username:str , pos:[lat,lng]
            state.users[username] = { 'pos' : pos }
        },
        updateUser(state, username,pos) { // username:str , pos:[lat,lng]
            state.users[username]['pos'] = pos
        },
        removeUser(state, username) { // username:str
            delete state.users[username]
            state.checkIn.filters
        },
        addCheckIn(state, checkIn) { // checkIn: { 'user' : 'jason', 'pos' : [11.22,33.44] , 'img' : 'image_url' , 'content' : 'Save water for beer!' } 
            state.checkIn.push(checkIn)
        },
	},
	getters: {
		users: state => state.users,
        checkIn: state => state.checkIn,
	}
})