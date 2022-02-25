import { list, detail } from '@/api/product'

// initial state
const state = () => ({
    list: {},
    detail: {},
})

// actions
const actions = {
     list ({ commit }, params) {
        return new Promise((resolve, reject) => {
            list(params).then(res => {
                if(res.code === 0){
                    if (res.data) commit('set_list', res.data)
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
     detail ({ commit }, params) {
        return new Promise((resolve, reject) => {
            detail(params).then(res => {
                if(res.code === 0){
                    if (res.data) commit('set_detail', res.data)
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
}

// mutations
const mutations = {
    set_list: (state, list) => {
        state.list = list
    },
    set_detail: (state, detail) => {
        state.detail = detail
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
