import request from '@/utils/request';

const api = {
    list: '/product/list',
    detail: '/product/detail',
    add: '/product/add',
    edit: '/product/edit',
    delete: '/product/delete',
    sort: '/product/sort',
    exportExcel: '/product/exportExcel',
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

export function sort () {
    return request({
        url: api.sort,
        method: 'put',
    })
}

export function exportExcel () {
    return request({
        url: api.exportExcel,
        method: 'get',
    })
}
