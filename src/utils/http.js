import axios from 'axios'
import { StackActions } from 'react-navigation'
import qs from 'querystring'
import { loadData, removeData } from './storage'

const instance = axios.create({
  timeout: 100000,
  headers: { 'X-Custom-Header': 'foobar' },
})

// 请求拦截处理
instance.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    loadData('token').then((res) => {
      config.headers.Authorization = res
      resolve(config)
    }).catch(() => {
      config.headers.Authorization = ''
      resolve(config)
    })
  })
}, (error) => {
  return Promise.reject(error)
})

// 返回拦截处理
instance.interceptors.response.use((response) => {
  if (response.data && response.data.code === 401) { // 401, token失效
    removeData('token')
    StackActions.push('Kjmaking')
  } else {
    return response
  }
}, (error) => {
  return Promise.reject(error)
})

/**
 * GET 请求
 * @param {*} api
 * @param {*} params
 */
export const $GET = async (api, params) => {
  return new Promise((resolve, reject) => {
    const url = `${api}?${qs.stringify(params)}`
    instance.get(url)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * POST请求
 */
export const $POST = async (api, params) => {
  return new Promise((resolve, reject) => {
    instance.post(api, params)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
