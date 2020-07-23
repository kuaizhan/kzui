import { useEffect, useState } from 'react'
import { Request } from '@kzui/utils'
import { RequestConfig } from '@kzui/utils/dist/request/types';
import { encodeQueryString } from './tools';

interface ResponseData<T> {
  data?: T
  setData: (newData: T) => void 
  error: any
  loading: boolean
  run: () => Promise<void>
}

interface HookOptions {
  shouldExcute?: boolean
}

/**
 * 请求hook
 * 可用于简单的get接口获取数据(无分页)
 * @param {RequestParams} requestParams { url, payload } or url
 * @param dep useEffect dep
 * 
 * ```js
 * 
 * const { data = { items: {} } } = useRequest<{ items: Group }>(GOODS_GROUP_LIST)
 * 
 * const { data = { items: {} } } = 
 *    useRequest<{ items: Group }>({ url: GOODS_GROUP_LIST }, {}, [])
 * ```
 */

const request = new Request((config) => {
  // 按照 fetch 发起请求
  return fetch(config.url, {
    method: config.method,
    body: (
      config.method === 'GET' || config.method === 'DELETE' || config.method === undefined
    ) ? undefined : config.payload,
    headers: config.headers
  }).then(res => {
    return res?.json()
  })
}, { baseUrl: '' }, {
  request: [function (config) {
    // 在请求发起之前，处理config
    let _config = {}
    _config = { ...config }
    if (config.method === 'POST' || config.method === 'PUT') {
      if (config.headers?.['content-type'] === 'application/x-www-form-urlencoded') {
        _config['payload'] = encodeQueryString(config.payload)
      } else {
        _config['payload'] = JSON.stringify(config.payload)
      }
    }

    return _config
  }],
  response: [[function (response) {
    return response

  }, function (error) {
    // 统一对异常处理 *默认: 如果 status 不在 [100, 300) 之间就走这里 
    return Promise.reject(error);
  }]]
})


export const createUseRequest = (request: any) => {
  function useRequest<T>(
    requestConfigOrUrl: Partial<RequestConfig> | string,
    options?: HookOptions,
    dep?: any[]
  ): ResponseData<T> {

    let payload: Partial<RequestConfig>['payload'] = {};
    let url: Partial<RequestConfig>['url'] = '';
    let headers: Partial<RequestConfig>['headers'] = {};
    let method: Partial<RequestConfig>['method'] = 'GET';

    let shouldExcute: boolean = true;
    if (options?.shouldExcute !== undefined) {
      shouldExcute = options.shouldExcute
    }

    if (typeof requestConfigOrUrl === 'string') {
      url = requestConfigOrUrl
    } else {
      url = requestConfigOrUrl.url || url
      payload = requestConfigOrUrl.payload || payload
      headers = requestConfigOrUrl.headers || headers
      method = requestConfigOrUrl.method || method
    }

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<T>()
    const [error, setError] = useState()

    // todo can pass params
    function run(): Promise<void> {
      setLoading(true)
      return request({
        url,
        payload,
        headers,
        method,
      }).then((_data: T) => {
        setData(_data)
        setLoading(false)
      }).catch((e) => {
        setError(e)
        setLoading(false)
      })
    }

    useEffect(() => {
      if (shouldExcute) {
        run()
      }
    }, dep || [])

    return {
      data,
      error,
      loading,
      run,
      setData
    }
  }

  return useRequest
}


// 默认提供 request 为 fetch 的 useRequest
export const useRequest = createUseRequest(request.run.bind(request))