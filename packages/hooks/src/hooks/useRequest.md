# useRequest

## 目标

1. 将发请求封装成 `hook`
2. `useRequest` 把 `response` 通过 `data` 字段返回出来，即取即用，不需要在每个文件里都设置对应的 `state`
3. `useRequest` 还提供了 `loading`, `error` 字段，便于处理数据加载中和出现错误的状态

## 安装

`npm install @kzui/hooks`

## 使用

### useRequest 提供了两个接口
#### createUseRequest
  - 接收一个用来发请求的 `requestEngine` (如 `fetch`，在微信小程序中可以是 `wx.request`，也可以是通过 `@kzui/utils` 的 `Request` 封装的 `request`)
#### useRequest
  - `useRequest` 是默认提供的 hook, 其 `requestEngine` 是简单封装了 `fetch` 的 `@kzui/utils` 的 `request`，可在 web 平台使用。

## 在 web 平台直接使用  useRequest

```js
import { useRequest } from '@kzui/hooks'

const { data, loading, error, run } = useRequest('/foo');
```

## 自定义 request 并创建 useRequest

```js
import { createUseRequest } from '@kzui/hooks';
```

## 代码示例

#### useRequest

```jsx
import React from 'react'
import { useRequest } from '@kzui/hooks'
import { Button, Spin } from '@kzui/core'

const catApi = 'https://api.thecatapi.com/v1/images/search?limit=1&size=full&sub_id=demo-c60918'

const FooPage = () => {
  const { data, loading, error, run } = useRequest(catApi);
  console.log(data, 'data', error, 'error')
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button loading={loading} onClick={() => run()} style={{ width: '120px', marginBottom: '25px' }}>再次请求</Button>
      <img src={data?.[0]?.url} style={{ maxWidth: '500px', objectFit: 'cover' }} />
    </div>
  )
}

export default FooPage
```

### API 
TODO