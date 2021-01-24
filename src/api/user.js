import request from '@/utils/request'

export function userManagement(params) { // 查询所有用户
  return request({
    url: 'userManagement/user',
    method: 'get'
  })
}

export function adduser(data) {
  return request({
    url: 'userManagement/user' ,
    method: 'post',
    data: {
    }
  })
}
