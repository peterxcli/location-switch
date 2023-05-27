import user from '../../api/user'

const state = () => ({
    all: {}
})

const getters = {}

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

    updateUserById(state, id, _user) {
        const user = state.all.find(user => user.id === id)
        user = _user
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}