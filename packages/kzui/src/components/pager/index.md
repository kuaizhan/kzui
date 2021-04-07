# Pager - 分页组件


```jsx
/**
 * title: 分页器大小
 * desc: 分页器有正常、小两种尺寸。通过设置 size 为 small把分页器设为小尺寸。若不设置 size，则尺寸为正常，值为 normal。
**/
import React from 'react'
import { Pager } from '@kzui/core';

const PagerDemo = () => {
    return (
        <Pager totalPage={10} curPage={1} size='small' />
    )
}
export default PagerDemo
```

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
totalPage | number | 总页数 | 是 | - | - |
curPage | number | 当前页面，页面从 1 开始 | 是 | - | - |
size | `normal` \| `small` | 分页器尺寸 | 否 | `normal` | `normal` \| `small` |

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |  
------- | ------- | ------- | ------- | ------- | ------- |
onPageChange | func | 页码改变事件 | 否 | null | 事件第一个参数为页面值 |

