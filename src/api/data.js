import request from '@/utils/request'

export function data() {
  return request({
    url: '/lineChart',
    method: 'get'
  })
}
