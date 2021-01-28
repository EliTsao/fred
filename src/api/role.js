import request from '@/utils/request'

export function getrole(data) {
  return request({
    url: 'userManagement/role',
    method: 'get',
    data
  })
}

export function addrole(data) {
  return request({
    url: 'userManagement/role',
    method: 'post',
    data
  })
}

export function updatarole(data) {
  return request({
    url: 'userManagement/role',
    method: 'put',
    data
  })
}

export function deleterole(data) {
  return request({
    url: 'userManagement/role',
    method: 'get',
    data
  })
}
