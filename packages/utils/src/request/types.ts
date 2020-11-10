export type StringObject<T = any> = { [propName: string]: T }

export type Headers = StringObject // TODO

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION' | 'HEAD'

export type TransformRequestFunc = <T = any>(data: T, header: Headers) => T

export type TransformResponseFunc = <T>(data: T) => T

export type RequestInterceptor = (config: Partial<RequestConfig>) => Partial<RequestConfig>
export type ResponseInterceptor = (response: Response) => any
export type ErrorInterceptor = (error: Error) => Promise<Error>

export interface Interceptors {
  request: RequestInterceptor[],
  response: [ResponseInterceptor, ErrorInterceptor][],
}

export interface RequestEngineConfig {
  url: string,                             // 请求路径
  payload: any                            // 请求参数 被转换后可能是适应各种平台的各种类型
  method: HttpMethods,                     // 请求方法
  headers: Headers                         // 请求header #对应 weapp header
  transformRequest: TransformRequestFunc[] // 支持方法 'PUT', 'POST', 'PATCH' and 'DELETE'
  transformResponse: TransformResponseFunc[] // 转换response
  baseUrl: string
}

export type RequestEngine = <T>(config: Partial<RequestEngineConfig> & { url: string }) => Promise<Response<T>>
 
export interface BaseRequestConfig {
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
  [propName: string]: any;
  // statusText: string
  // headers: {}
}
