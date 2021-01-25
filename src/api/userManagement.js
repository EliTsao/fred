import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'http://192.168.31.16:10010/userManagement/user',
    method: 'get',
    data
  })
}

export function doEdit(data) {
  return request({
    url: 'http://192.168.31.16:10010/userManagement/user',
    method: 'post',
    data
  })
}

export function doDelete(data) {
  return request({
    url: 'http://192.168.31.16:10010/userManagement/doDelete',
    method: 'delete',
    data
  })
}
