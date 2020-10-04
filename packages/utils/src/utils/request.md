# request

## 目标

致力于用最简单的方案规范 client 端的 HTTP 请求。起因是`remax/one`没有`request`，想有一个跨平台的`request`，进而想到可以推广所有的 client 端。

1. 规范`request`的参数
2. 规范`response`的返回值
3. 请求增强，简单的静态拦截器
4. 平台无关，简单就可拓展到多平台

## 安装

`npm install @kzui/utils`

## 在 web 平台封装 

* 推荐使用Typescript

```js
import { Request } from '@kzui/utils'

// https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
const request = new Request((config) => {
  // 按照 fetch 发起请求
  return fetch(config.url, {
    method: config.method,
    body: config.payload,
    headers: config.headers
  }).then(res => res.json()).then(res => {
    const { body, status } = res;
    return {
      status,
      data: body,
    }
  })
}, { baseUrl: '/baseUrl' }, {
  request: [function(config) {
    // 在请求发起之前，处理config
    return config
  }],
  response: [[function(response) {
      // 统一对请求做处理
      return response
  }, function(error) {
    // 统一对异常处理 *默认: 如果 status 不在 [100, 300) 之间就走这里 
    return Promise.reject(error);
  }]]
})
```

## 在 weapp 平台封装 

* 推荐使用Typescript

```js
import { Request } from '@kzui/utils'

const request = new Request((config) => {
  // https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
  return wx.request({
    url: config.url,
    method: config.method,
    data: config.payload,
    header: config.headers
  }).then(res => {

    // 小程序的response格式
    const { data, statusCode } = res;

    // 规范的response格式
    return {
      status: statusCode,
      data,
    }
  })
}, { baseUrl: '/baseUrl' }, {
  request: [function(config) {
    // 在请求发起之前，处理config
    return config
  }],
  response: [[function(response) {
      // 统一对请求做处理
      return response
  }, function(error) {
    // 统一对异常处理 *默认: 如果 status 不在 [100, 300) 之间就走这里 
    return Promise.reject(error);
  }]]
})
```

## 使用

做好以上的封装后，我们的接口就统一了

```js
request.run({ url: '/foo', method: 'GET' }).then((res) => {
    console.log(res.status, res.data);
})
request.run({ url: '/foo', method: 'POST' })
```

## web 平台上的例子

```jsx
import React from 'react'
import { Request } from '@kzui/utils'
import { notification, Button } from '@kzui/core'

// https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
const request = new Request((config) => {
  // 按照 fetch 发起请求
  return fetch(config.url, {
    method: config.method,
    body: config.method === 'GET' ? undefined : config.payload,
    headers: config.headers
  }).then(res => res.json()).then(res => {
    const { body, status } = res;
    return {
      status,
      data: body,
    }
  })
}, { baseUrl: '/baseUrl' }, {
  request: [function(config) {
    // 在请求发起之前，处理config
    return config
  }],
  response: [[function(response) {
      // 统一对请求做处理
      return response
  }, function(error) {
    // 统一对异常处理 *默认: 如果 status 不在 [100, 300) 之间就走这里 
    return Promise.reject(error);
  }]]
})

function handleRequest() {
   request.run({ url: '/foo', method: 'GET', payload: { a: 'b' } })
          .catch((e) => {
            console.log(e);
            notification.error('请求失败')
          })
}

export default () => <Button onClick={handleRequest}>发起失败请求</Button>
```

## API

```js
export interface RequestConfig {
  url: string,                             // 请求路径
  payload: StringObject,                   // 请求参数
  method: HttpMethods,                     // 请求方法
  headers: Headers                         // 请求header #对应 weapp header
  transformRequest: TransformRequestFunc[] // 支持方法 'PUT', 'POST', 'PATCH' and 'DELETE'
  transformResponse: TransformResponseFunc[] // 转换response
  baseUrl: string
}

export interface Response<T = any> {
  data: T        // 响应体的数据
  status: number // 状态码
}

export type RequestInterceptor = (config: Partial<RequestConfig>) => Partial<RequestConfig>
export type ResponseInterceptor = (response: Response) => any
```

## 其他

默认提交 `content-type: application/json`