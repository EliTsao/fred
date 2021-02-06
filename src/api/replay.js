import request from '@/utils/request'

export function getReplay() {
  return request({
    url: 'http://39.104.53.187:10812/nvc/server/api/v1/record/querydevices',
    method: 'get'
  })
}
