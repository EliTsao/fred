import request from '@/utils/request'

export function captureImage(params) {
  return request({
    url: '/command/captureImage/',
    method: 'get',
    params
  })
}

export function detectTemperature(params) {
  return request({
    url: 'command/detectTemperature/',
    method: 'get',
    params
  })
}

export function getAppVersion(params) {
  return request({
    url: 'command/getAppVersion',
    method: 'get',
    params
  })
}

export function loadCable(params) {
  return request({
    url: 'command/loadCable',
    method: 'get',
    params
  })
}

export function repairGroundWire(params) {
  return request({
    url: '/command/repairGroundWire',
    method: 'get',
    params
  })
}

export function setAPP(params) {
  return request({
    url: 'command/setAPP/',
    method: 'get',
    params
  })
}

export function setBootloader(params) {
  return request({
    url: 'command/setBootloader',
    method: 'get',
    params
  })
}

export function slidPosition(params) {
  return request({
    url: 'command/slidPosition',
    method: 'get',
    params
  })
}

export function speed(params) {
  return request({
    url: 'command/speed',
    method: 'get',
    params
  })
}

export function timeStamo(params) {
  return request({
    url: 'command/timeStamp',
    method: 'get',
    params
  })
}

export function uploadCycle(params) {
  return request({
    url: 'command/uploadCycle',
    method: 'get',
    params
  })
}

export function walkDirection(params) {
  return request({
    url: 'command/walkDirection',
    method: 'get',
    params
  })
}

export function walkPattern(params) {
  return request({
    url: 'command/walkPattern',
    method: 'get',
    params
  })
}
