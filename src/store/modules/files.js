import { list, detail, add, del } from '@/api/files'

// initial state
const state = () => ({
    list: {},
    detail: {},
    add: {},
    del: {},
})

// actions
const actions = {
    add ({ commit }, params) {
        return new Promise((resolve, reject) => {
            add(params).then(res => {
                if(res.code === 0){
                    if (res.data) commit('set_add', res.data)
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    del ({ commit }, params) {
        return new Promise((resolve, reject) => {
            del(params).then(res => {
                if(res.code === 0){
                    if (res.data) commit('set_del', res.data)
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
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
    set_add: (state, add) => {
        state.add = add
    },
    set_del: (state, del) => {
        state.del = del
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
