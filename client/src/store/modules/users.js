import user from '../../api/user'
import Vuex from 'vuex'

const state = () => ({
    all : {}, // {  'id1' : { 'user : 'user1' , 'pos' : [11.22,33.44] } , 'id2' : { 'user' : 'user2' , 'pos' : [11.22,33.44] }
    checkIn : [] // [ { 'user' : 'jason', 'pos' : [11.22,33.44] , 'img' : 'image_url' , 'content' : 'Save water for beer!' } , { 'user' : 'OuO', 'pos' : [11.22,33.44] , 'img' : 'image_url' , 'content' : 'ouo' }  ]
})

const getters = {
    users: state => state.all,
    checkIn: state => state.checkIn,
}

const actions = {
    async getAllUsers({ commit }) {
        const users = await user.getAllUsers()
        commit('setUsers', users)
    }
}

const mutations = {
    setUsers(state, users) {
        state.all = users
    },

    updateUserById(state, id, _user) { // id:str , _user:{ 'user' : 'user1' , 'pos' : [11.22,33.44] }   
        // const user = state.all.find(user => user.id === id)
        // user = _user
        if( _user['pos'] != null ){
            state.all[id]['pos'] = _user['pos'];
        }
        if( _user['user'] != null ){
            state.all[id]['user'] = _user['user'];
        }

    },

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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}