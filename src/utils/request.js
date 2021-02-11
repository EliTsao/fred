import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router/index'

// create an axios instance
const service = axios.create({
  baseURL: 'http://www.aait-suse.cn/dlxj', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
    // getToken() = response.
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const token = response.headers.authorization
    if (token) {
      localStorage.setItem('token', token)
      console.log(response.headers.authorization)
      store.commit('user/SET_TOKEN', token)
      setToken(token)
    }
    if (response.data.code === 401) { // token被加黑名单
      console.log(response.code)
      // 重新登录
      MessageBox.alert('数据异常，请重新登录！', '警告', {
        confirmButtonText: '确定',
        type: 'warning',
        center: true,
        callback: action => {
          store.commit('user/SET_TOKEN', '')
          store.commit('user/SET_ROLES', [])
          removeToken()
          localStorage.removeItem('token')
          router.push({ path: '/login' })
        }
      })
    }
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
