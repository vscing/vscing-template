// initial state
const state = {
    logs: []
}

// getters
// const getters = {
// }

// actions
const actions = {
    addErrorLog({ commit }, log) {
        commit('ADD_ERROR_LOG', log)
    },
    clearErrorLog({ commit }) {
        commit('CLEAR_ERROR_LOG')
    }
}

// mutations
const mutations = {
    ADD_ERROR_LOG: (state, log) => {
        state.logs.push(log)
    },
    CLEAR_ERROR_LOG: (state) => {
        state.logs.splice(0)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    //getters
}
