import request from '@/utils/request'

export function robotData() {
  return request({
    url: 'history/robotData',
    method: 'get'
    // params: {
    //   endTime: '',
    //   lineName: '',
    //   pageNum: '',
    //   pageSize: '',
    //   robotName: '',
    //   startName: ''
    // }
  })
}

export function temperatureData(params) {
  return request({
    url: '/history/temperatureData',
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
