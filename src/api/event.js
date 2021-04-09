import request from '@/utils/request'

export function event(params) {
  return request({
    url: '/event',
    method: 'get',
    params
  })
}
