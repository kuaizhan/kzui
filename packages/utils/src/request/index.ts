import {
  defaultRequestInterceptor,
  defaultResponseInterceptor,
  defaultErrorInterceptor
} from "./default-interceptor"
import { RequestEngine, RequestConfig, Interceptors } from "./types"

/**
 * 1. 致力于统一前端请求的API
 * 2. 与平台无关, 主要兼容 weapp 和 web
 * 
 * weapp https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
 * web https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 * 
 * 拙劣的借鉴+抄袭: https://github.com/axios/axios
 */

/**
 * 请求构造器
 * #h5 env
 */
export class Request {

  config: Partial<RequestConfig> = { baseUrl: '' }
  requestEngine: RequestEngine
  interceptors: Interceptors
  
  constructor(
    requestEngine: RequestEngine,
    config?: Partial<RequestConfig>,
    interceptors?: Partial<Interceptors>
  ) {
    this.requestEngine = requestEngine
    this.config = { ...this.config, ...config }

    this.interceptors = {
      request: [defaultRequestInterceptor, ...(interceptors?.request || [])],
      response: [[defaultResponseInterceptor, defaultErrorInterceptor], ...(interceptors?.response || [])]
    }
  }

  run(config: Partial<RequestConfig>) {

    // 执行拦截器
    const newConfig = 
      this.interceptors.request.reduce((config, interceptor) => interceptor(config), config)

    newConfig.headers = {
      ...newConfig.headers,
      ...config.headers,
    }

    return this.requestEngine((newConfig as any)).then(response => {
      return this.interceptors.response.reduce((response, interceptor) => {
        return response.then(interceptor[0]).catch(interceptor[1])
      }, Promise.resolve(response))
    })
  }
}

