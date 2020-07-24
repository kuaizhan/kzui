# PopTip - 提示基础组件


```jsx
/**
 * title: 基本
 * desc: 最简单的用法。
 */

import React from 'react';
import { PopTip } from '@kzui/core';

export default () =>{ 
    return (
        <PopTip tip='this is a poptip'>
            hover me
        </PopTip>
    );
}
```

```jsx
/**
 * title: 气泡可以有四个方向
 * desc: 通过 placement 属性控制，默认为`bottom`
 */
import React from 'react';
import { PopTip } from '@kzui/core';

export default () =>{ 
    return (
        <PopTip tip='this is a poptip' placement='right'>
            hover me
        </PopTip>
    );
}
```


## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
trigger | `string` | 触发方式 | 否 | '`hover` | `hover`, `click`|
tip | `React.ReactNode` | 提示内容 | 否 | '' | - |
children | `React.ReactNode` | 主体内容 | 是 | null | - |
tip | `string` \| `React.ReactNode` | 提示内容 | 是 | - | - | 
placement | `left` \| `right` \| `top` \| `bottom` | 提示摆放位置  | 否 | `bottom` | `left` \| `right` \| `top` \| `bottom` |
theme | `light` \| `dark` | 主题，分为深色和浅色 | 否 | `dark` | `light` \| `dark` |
tipStyle | React.CSSProperties | 提示部分的 style | 否 | {} | - |
visible | boolean | 使气泡显隐受控 | 否 | - | - |

## 事件

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
onVisible | () => void  | 内部控制显隐的显示后的回调 | 否 | null | - |
