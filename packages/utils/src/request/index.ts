import {
  defaultRequestInterceptor,
  defaultResponseInterceptor,
  defaultErrorInterceptor
} from "./default-interceptor"

/**
 * 1. 致力于统一前端请求的API
 * 2. 与平台无关, 主要兼容 weapp 和 web
 * 
 * weapp https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
 * web https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 * 
 * 拙劣的借鉴+抄袭: https://github.com/axios/axios
 */

export type StringObject<T = any> = { [propName: string]: T }

type Headers = StringObject // TODO

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION' | 'HEAD'

type TransformRequestFunc = <T = any>(data: T, header: Headers) => T

type TransformResponseFunc = <T>(data: T) => T

type RequestInterceptor = (config: Partial<RequestConfig>) => Partial<RequestConfig>
type ResponseInterceptor = (response: Response) => any
type ErrorInterceptor = (error: Error) => Promise<Error>

interface Interceptors {
  request: RequestInterceptor[],
  response: [ResponseInterceptor, ErrorInterceptor][],
}

type RequestEngine = <T>(config: Partial<RequestConfig> & { url: string }) => Promise<Response<T>>
 
interface BaseRequestConfig {
  url: string,                             // 请求路径
  payload: StringObject,                   // 请求参数
  method: HttpMethods,                     // 请求方法
  headers: Headers                         // 请求header #对应 weapp header
  transformRequest: TransformRequestFunc[] // 支持方法 'PUT', 'POST', 'PATCH' and 'DELETE'
  transformResponse: TransformResponseFunc[] // 转换response
}

export interface RequestConfig extends BaseRequestConfig {
  baseUrl: string
}

// copy from https://github.com/axios/axios#response-schema
export interface Response<T = any> {
  data: T
  status: number
  // statusText: string
  // headers: {}
}

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

