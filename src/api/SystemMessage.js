import request from '@/utils/request'

export function systemMessage(params) {
  return request({
    url: 'systemMessage',
    method: 'get'
  })
}
