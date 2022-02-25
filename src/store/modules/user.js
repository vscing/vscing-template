import storage from 'store'
import { login, getInfo, logout } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'

// initial state
const state = () => ({
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
})

// actions
const actions = {
    // 登录
    login ({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            login(userInfo).then(res => {
                storage.set(ACCESS_TOKEN, res.data.access_token, 5 * 60 * 60 * 1000)
                commit('SET_TOKEN', res.data.access_token)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const result = response.result

                if (result.role && result.role.permissions.length > 0) {
                    const role = result.role
                    role.permissions = result.role.permissions
                    role.permissions.map(per => {
                        if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                            const action = per.actionEntitySet.map(action => { return action.action })
                            per.actionList = action
                        }
                    })
                    role.permissionList = role.permissions.map(permission => { return permission.permissionId })
                    commit('SET_ROLES', result.role)
                    commit('SET_INFO', result)
                } else {
                    reject(new Error('getInfo: roles must be a non-null array !'))
                }

                // commit('SET_NAME', { name: result.name, welcome: welcome() })
                commit('SET_AVATAR', result.avatar)

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 登出
    Logout ({ commit, state }) {
        return new Promise((resolve) => {
            logout(state.token).then(() => {
                resolve()
            }).catch(() => {
                resolve()
            }).finally(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                storage.remove(ACCESS_TOKEN)
            })
        })
    }
}

// mutations
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
        state.name = name
        state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_INFO: (state, info) => {
        state.info = info
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
