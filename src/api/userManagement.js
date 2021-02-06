import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'userManagement/findAllUser',
    method: 'get',
    data
  })
}

export function doEdit(data) {
  return request({
    url: 'userManagement/user',
    method: 'put',
    data
  })
}

export function doDelete(params) {
  return request({
    url: 'userManagement/deleteUser',
    method: 'delete',
    params
  })
}

export function addUser(data) {
  return request({
    url: 'userManagement/addUser',
    method: 'post',
    data
  })
}

export function find(params) {
  return request({
    url: 'robot/find',
    method: 'get',
    params
  })
}
