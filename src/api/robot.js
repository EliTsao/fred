import request from '@/utils/request'

export function robotadd(data) {
  return request({
    url: '/robot/add',
    method: 'post',
    data
  })
}
export function upload(data) {
  return request({
    url: '/upload/bin',
    method: 'post',
    data
  })
}
export function robotdelete(params) {
  return request({
    url: '/robot/delete/',
    method: 'delete',
    params: {
      id: '',
      userName: ''
    }
  })
}

export function findrobot(params) {
  return request({
    url: '/robot/find/',
    method: 'get',
    params: {
      id: ''
    }
  })
}

export function findAll(params) {
  return request({
    url: 'robot/findAll',
    method: 'get'
  })
}

export function robotupdate(data) {
  return request({
    url: 'robot/update',
    method: 'put',
    data: {
      robot: '',
      userName: ''
    }
  })
}
