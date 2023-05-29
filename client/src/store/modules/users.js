import user from '../../api/user'
import Vuex from 'vuex'

const state = () => ({
    all : {}, // {  'id1' : { 'user : 'user1' , 'pos' : [11.22,33.44] } , 'id2' : { 'user' : 'user2' , 'pos' : [11.22,33.44] }
    checkIn : [], // [ { 'user' : 'jason', 'pos' : [11.22,33.44] , 'img' : 'image_url' , 'content' : 'Save water for beer!' } , { 'user' : 'OuO', 'pos' : [11.22,33.44] , 'img' : 'image_url' , 'content' : 'ouo' }  ]
    message : {} // {"1wweqw": {message: "123"} ]
})

const getters = {
    users: state => state.all,
    checkIn: state => state.checkIn,
}

const actions = {
    async getAllUsers({ commit }) {
        const users = await user.getAllUsers()
        commit('setUsers', users)
    },
    addCheckIn({ commit }, checkIn) {
        commit('ADD_CHECK_IN', checkIn)
    },
    updateUserById( {commit} , id , _user){ 
        commit('UPDATE_USER_BY_ID', id , _user)
    }
    ,addUser({ commit }, username,pos) {
        commit('ADD_USER', username,pos)
    }
    ,updateUser({ commit }, username,pos) {
        commit('UPDATE_USER', username,pos)
    },
    removeUser({ commit }, username) {
        commit('REMOVE_USER', username)
    },
    updateUserMessageById( {commit} , data){
        commit('UPDATE_USER_MESSAGE_BY_ID', data)
    }
}

const mutations = {
    setUsers(state, users) {
        state.all = users
    },
    UPDATE_USER_BY_ID(state, _user) { // id:str , _user:{ 'user' : 'user1' , 'pos' : [11.22,33.44] }
        let id = _user['id']
        console.log('UPDATE_USER_BY_ID:::',id, _user)
        state.all[id] = _user
    },
    ADD_USER(state, username,pos) { // username:str , pos:[lat,lng]
        state.users[username] = { 'pos' : pos }
    },
    UPDATE_USER(state, username,pos) { // username:str , pos:[lat,lng]
        state.users[username]['pos'] = pos
    },
    REMOVE_USER(state, username) { // username:str
        delete state.users[username]
        state.checkIn.filters
    },
    ADD_CHECK_IN(state, checkIn) { // checkIn: { 'user' : 'jason', 'pos' : [11.22,33.44] , 'img' : 'image_url' , 'content' : 'Save water for beer!' } 
        console.log('addCheckIn:::',checkIn)
        state.checkIn.push(checkIn);
    },
    UPDATE_USER_MESSAGE_BY_ID (state, data) {
        let all = state.all
        let id = data['id']
        all[id]['message'] = data.message
        state.all = {...all}
        state.message = {id: id, message:data.message}
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}