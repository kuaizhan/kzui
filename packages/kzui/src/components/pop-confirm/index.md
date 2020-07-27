# Popconfrim - pop确认组件


```jsx
/**
 * title: 基本
 * desc: 最简单的用法。
 */

import React from 'react';
import { PopConfirm, Button } from '@kzui/core';

export default () => {
    return (
        <PopConfirm title="Are you sure?">
            <Button style={{ marginRight: 0 }}>点击我</Button>
        </PopConfirm>
    )
}
```

```jsx
/**
 * title: 确认按钮状态
 * desc: 确认发起请求时，可以设置 `status` 属性 为 `loading`。
 */

import React from 'react';
import { PopConfirm, Button } from '@kzui/core';

export default () => {
    return (
        <PopConfirm title="Are you sure?" status="loading">
            <Button style={{ marginRight: 0 }}>点击我</Button>
        </PopConfirm>
    )
}
```

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
title | string | React.ReactNode | 标题 | 否 | '' | - |
status | string | 确认按钮状态 | 否 | `normal` | `normal` \| `loading` |
placement | `left` \| `right` \| `top` \| `bottom` | 气泡框位置 | 否 |  `right` | 

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |  
------- | ------- | ------- | ------- | ------- | ------- |
onConfirm | func | 确认回调 |  否 | null | - |
onCancel | func | 取消回调 | 否 | null | - |
onBlur | func | 失焦回调 | 否 | null | - |

