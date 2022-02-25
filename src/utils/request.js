import axios from 'axios'
import storage from 'store'
import { env } from '@/config'
import router from '../router'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'

// 创建 axios 实例
const request = axios.create({
    baseURL: env.apiHost, // api的base_url
    timeout: 10000, // 请求超时时间
    // transformRequest: data => qs.stringify(data) //
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 异常拦截处理器
const errorHandler = (error) => {
    if(env.log){
        console.log('errorHandler')
        console.log(error, error.message) // for debug
    }
    if (error.response) {
        const data = error.response.data
        // 从 localstorage 获取 token
        const token = storage.get(ACCESS_TOKEN)
        if (error.response.status === 403) {
            // notification.error({
            //     message: 'Forbidden',
            //     description: data.message
            // })
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            // notification.error({
            //     message: 'Unauthorized',
            //     description: 'Authorization verification failed'
            // })
            // if (token) {
            //     store.dispatch('Logout').then(() => {
            //         setTimeout(() => {
            //             window.location.reload()
            //         }, 1500)
            //     })
            // }
        }
    }
    const data = {
        code: 1,
        msg: '请求错误',
        data: {}
    }
    return Promise.resolve(data)
}

// request拦截器
request.interceptors.request.use(
    config => {
        if(env.log){
            console.log('request res: ')
            console.log(config) // for debug
        }
        const userToken = storage.get(ACCESS_TOKEN)
        if (userToken) {
            config.headers['Authorization'] = env.tokenType + userToken
        }
        //set 默认值
        return config
    }, errorHandler
)

// respone拦截器
request.interceptors.response.use(
    response => {
        if(env.log){
            console.log('respone res: ')
            console.log(response) // for debug
        }
        const res = response.data
        // if (res.code !== 0) {
        //     return Promise.reject(new Error(res.msg || 'Error'))
        // }
        return res
    }, errorHandler
)



export default request
