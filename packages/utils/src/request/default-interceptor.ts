import { RequestConfig, StringObject, Response } from "./types";

/**
 * 
 * @param obj 对象
 * @param values 去掉对象里值为该数组的里的值的部分
 * 
 * eg: 
 *  omitSpecValue({ a: 1, b: undefined }, [undefined]) => { a: 1 }
 */
function omitSpecValue(obj: StringObject, ...values: any[]) {
  return Object
    .keys(obj)
    .filter(key => values.indexOf(obj[key]) === -1)
    .reduce((acc, cur) => ({
      ...acc,
      [cur]: obj[cur]
    }), {})
}

/**
 * TODO 这个是快站专用的 
 * 开源还需另外考虑
 * @param config 
 */
export function defaultRequestInterceptor(config: Partial<RequestConfig>) { 
  const { 
    url,
    payload = {},
    method,
    headers = {},
    baseUrl
  } = config

  const _headers = { ...headers };
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    // default json
    _headers['content-type'] = 'application/json'
  }

  // concat baseUrl
  let _url = baseUrl + url

  // omit [undefined, null] value
  let _payload = omitSpecValue(payload, undefined, null)

  // 自行拼GET请求的url, 以适应后端对于x=0&x=1的格式 { x: [0, 1] } => x=0&x=1
  if (method === 'GET') {
    _url = Object.keys(_payload).reduce((acc, cur) => {
      return acc + 
        (Array.isArray(_payload[cur]) ?
        _payload[cur].reduce(
          (_acc, _cur) => _acc + `${cur}=${encodeURIComponent(_cur)}&`, ''
        ) : `${cur}=${encodeURIComponent(_payload[cur])}&`)
    }, _url + '?')
    _url = _url.slice(0, -1);
    _payload = undefined
  }

  debugger

  return {
    ...config,
    headers: _headers,
    payload: _payload,
    url: _url
  }
}

export class ResponseError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.status = status
  }
}

export function defaultResponseInterceptor(response: Response) {

  if (response.status > 300 || response.status < 100) {
    return Promise.reject(new ResponseError(response.status, `request bad, status: ${response.status}`))
  }

  return response
}

/**
 * 
 * @param config 
 */
export function defaultErrorInterceptor(error: Error) {
  return Promise.reject(error)
}