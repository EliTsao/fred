import request from '@/utils/request'

export function lineChart(data) {
  return request({
    url: '/lineChart',
    method: 'get',
    data
  })
}

export function history(data) {
  return request({
    url: '/history/roboData',
    method: 'get'
  })
}
