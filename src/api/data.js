import request from '@/utils/request'

export function listLine() {
  return request({
    url: '/lineChart',
    method: 'get'
  })
}
