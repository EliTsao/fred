import request from '@/utils/request'

export function robotData() {
  return request({
    url: '/robotData',
    method: 'get',
    params: {
      endTime: 'this.endTime',
      lineName: 'this.LIneName',
      pageNum: 'this.pageNum',
      pageSize: 'this.pageSize',
      robotName: 'this.robotName',
      startName: 'this.startName'
    }
  })
}

export function tempertureData(params) {
  return request({
    url: '/tempertureData',
    method: 'get'
  })
}

export function imageData(params) {
  return request({
    url: '/findImageById',
    method: 'get',
    params: {

    }
  })
}
