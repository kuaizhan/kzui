# useRequest

## 目标

1. 将发请求封装成 `hook`
2. `useRequest` 把 `response` 通过 `data` 字段返回出来，即取即用，抽象了 *发起请求 > 处理`Response` > 将数据存在某处* 的过程
3. `useRequest` 提供了 `loading`, `error` 字段，便于处理数据加载中和出现错误的状态

## 安装

`npm install @kzui/hooks`

## 使用

**useRequest 提供了两个接口**
- **createUseRequest**

  接收一个用来发请求的 `requestEngine` (如 `fetch`，在微信小程序中可以是 `wx.request`，也可以是通过 `@kzui/utils` 的 `Request` 封装的 `request`)

- **useRequest**

  `useRequest` 是默认提供的 hook, 其 `requestEngine` 是简单封装了 `fetch` 的 `@kzui/utils` 的 `request`，可在 web 平台使用。


## 在 web 平台直接使用 useRequest

```js
import { useRequest } from '@kzui/hooks'

const { data, loading, error, run } = useRequest('/foo');
```

## 自定义 request 并创建 useRequest

创建`Request`的过程可以参考[文档](https://kuaizhan.github.io/kzui/utils/request)
```js
import { createUseRequest } from '@kzui/hooks';
import { Request } from '@kzui/utils';

// 引用自 @kzui/utils Request 文档
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

const useRequest = createUseRequest(request.run.bind(request))
```


## 代码示例

#### useRequest

```jsx
/**
 * title: 默认 useRequest
 * desc: data 是 Response 经过 responseInterceptor 处理后返回的数据。 run 是请求过程。
 */
import React from 'react'
import { useRequest } from '@kzui/hooks'
import { Button, Spin } from '@kzui/core'

const catApi = 'https://api.thecatapi.com/v1/images/search?limit=1&size=full&sub_id=demo-c60918'

const FooPage = () => {
  const { data, loading, error, run } = useRequest(catApi);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        loading={loading}
        onClick={() => run()}
        style={{ width: '120px', marginBottom: '25px' }}
      >
        再次请求
      </Button>
      <img src={data?.[0]?.url} style={{ maxWidth: '500px', objectFit: 'cover' }} />
    </div>
  )
}

export default FooPage
```

### API 

RequestConfig 参考 @kzui/utils [Request 文档](https://kuaizhan.github.io/kzui/utils/request#api)
```js
import { RequestConfig } from '@kzui/utils/dist/request/types';

interface ResponseData<T> {
    data?: T;                         // 存响应体的数据的 state
    setData: (newData: T) => void;    // 修改响应体数据的 setState
    error: any;                       // 请求返回的错误
    loading: boolean;                 // 请求中的状态
    run: () => Promise<void>;         // 发起请求的函数
}

interface HookOptions {
    shouldExecute?: boolean;          // 控制是否发起请求
}

export declare const useRequest: <T>(         
  requestConfigOrUrl: Partial<RequestConfig> | string,
  options?: HookOptions,
  dep?: any[]                         // 依赖项
) => ResponseData<T>;

export declare const createUseRequest: (request: any) => useRequest

```