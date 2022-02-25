import request from '@/utils/request';

const api = {
    list: '/files/list',
    detail: '/files/detail',
    add: '/files/add',
    edit: '/files/edit',
    delete: '/files/delete',
}

export function list (parameter) {
    return request({
        url: api.list,
        method: 'get',
        params: parameter
    })
}

export function detail (parameter) {
    return request({
        url: api.detail,
        method: 'get',
        data: parameter
    })
}

export function add (parameter) {
    return request({
        url: api.add,
        method: 'post',
        data: parameter
    });
}

export function edit () {
    return request({
        url: api.edit,
        method: 'put',
    })
}

export function del (parameter) {
    return request({
        url: api.delete,
        method: 'delete',
        params: parameter
    })
}
