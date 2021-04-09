import request from '@/utils/request'

export function robotData(params) {
  return request({
    url: 'history/robotData',
    method: 'get',
    params
  })
}

export function temperatureData(params) {
  return request({
    url: '/history/temperatureData',
    method: 'get',
    params
  })
}

export function imageData(params) {
  return request({
    url: 'image/history/imageData',
    method: 'get',
    params
  })
}

export function excelDow(params) {
  return request({
    url: 'realTimeExcel',
    method: 'get',
    responseType: 'blob'
  })
}

export function tmData(params) {
  return request({
    url: 'tmData',
    method: 'get',
    responseType: 'blob'
  })
}
