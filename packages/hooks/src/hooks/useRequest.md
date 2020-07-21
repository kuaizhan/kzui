# useRequest

## 目标

1. 将发请求封装成 hook，不需要每次发请求都写成 Promise
2. useRequest 把数据通过 data 字段返回出来，即取即用，不需要再每个文件里都设置对应的 state
3. useRequest 还提供了loading, error 字段，便于处理数据加载中和出现错误的状态

## 安装

`npm install @kzui/hooks`

## 使用

### useRequest 提供了两个接口
#### createUseRequest
  - createRequest 是默认导出。
  - 它接收一个用来发请求的requestEngine(比如 fetch，在微信小程序中可以是 wx.request，也可以是通过 @kzui/utils 的 Request 封装的 request)
#### useRequest
  - useRequest 是我们封装的默认的useRuquest，其发送请求的方法是 简单封装了 fetch 的 @kzui/utils 的request，可以在 web 平台使用。

```jsx
import React from 'react'
import { useRequest } from '../useRequest.ts'
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
