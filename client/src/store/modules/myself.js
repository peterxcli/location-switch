

const state = () => ({
    pos: [25.042474, 121.513729],
    speed : 0.0001,
})

const getters = {
    getPos: state => state.pos,
    getSpeed: state => state.speed,
}

const actions = {
    setPos({ commit }, newPos) {
        commit("SET_POSITION", newPos);
    },
    updPos({ commit }, vec) {
        commit("UPDATE_POSITION", vec);
    },
    setSpeed({ commit }, newSpeed) {
        commit("SET_SPEED", newSpeed);
    }
}

const mutations = {
    SET_POSITION(state, pos) {
        state.pos = pos;
    },
    UPDATE_POSITION(state, vec) {
        state.pos[0] += vec[0];
        state.pos[1] += vec[1];
    },
    SET_SPEED(state, speed) {
        state.speed = speed;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}