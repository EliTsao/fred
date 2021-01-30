import request from '@/utils/request'

export function robotData() {
  return request({
    url: 'history/robotData',
    method: 'get'
  })
}

export function temperatureData(params) {
  return request({
    url: '/history/temperatureData',
    method: 'get'
  })
}

export function imageData(params) {
  return request({
    url: 'image/history/imageData',
    method: 'get',
    params: {

    }
  })
}
