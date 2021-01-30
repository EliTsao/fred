import request from '@/utils/request'

export function getReplay() {
  return request({
    url: 'http://192.168.31.102:10800/api/v1/record/querydevices',
    method: 'get'
  })
}
