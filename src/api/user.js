import request from '@/utils/request';

const api = {
    Login: '/user/login',
    Logout: '/user/logout',
}

export function login (parameter) {
    return request({
        url: api.Login,
        method: 'post',
        data: parameter
    })
}

export function logout () {
    return request({
        url: api.Logout,
        method: 'post',
    })
}

export function getInfo () {
    return request({
        url: api.Logout,
        method: 'post',
    })
}
