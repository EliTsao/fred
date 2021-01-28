import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'userManagement/user',
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

export function doDelete(data) {
  return request({
    url: 'userManagement/doDelete',
    method: 'delete',
    data
  })
}
