import request from '@/utils/request'

export function listLine(params) {
  return request({
    url: '/lineChart',
    method: 'get',
    params
  })
}
