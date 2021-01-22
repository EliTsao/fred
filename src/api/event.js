import request from '@/utils/request'

export function lineChart(token) {
  return request({
    url: '/event',
    method: 'get'
  })
}
