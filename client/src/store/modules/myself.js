

const state = () => ({
    pos: [25.042474, 121.513729],
})

const getters = {
    getPos: state => state.pos,
}

const actions = {
    setPos({ commit }, newPos) {
        commit("SET_POSITION", newPos);
    },
}

const mutations = {
    SET_POSITION(state, pos) {
        state.pos = pos;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}