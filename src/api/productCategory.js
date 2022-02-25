import request from '@/utils/request';

const api = {
    list: '/productCategory/list',
    detail: '/productCategory/detail',
    add: '/productCategory/add',
    edit: '/productCategory/edit',
    delete: '/productCategory/delete',
}

export function list (parameter) {
    return request({
        url: api.list,
        method: 'get',
        data: parameter
    })
}

export function detail (parameter) {
    return request({
        url: api.detail,
        method: 'get',
        data: parameter
    })
}

export function add () {
    return request({
        url: api.add,
        method: 'post',
    })
}

export function edit () {
    return request({
        url: api.edit,
        method: 'put',
    })
}

export function del () {
    return request({
        url: api.delete,
        method: 'delete',
    })
}
