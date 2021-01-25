import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://192.168.31.16:10010/login',
    // url: '/vue-admin-template/user/login',
    method: 'post',
    data
    // username: this.username,
    // password: this.password
  })
}

// export function getInfo(token) {
//   return request({
//     url: 'user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: 'http://192.168.31.16:10010/logout',
    // urhttps://192.168.31.12:10010l: 'url:/vue-admin-template/user/logout',
    method: 'put',
    params: {
      name: 'jack'
    }
  })
}
