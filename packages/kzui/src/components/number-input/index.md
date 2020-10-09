# NumberInput - 数字输入框

- NumberInput

```jsx
/**
 * title: 数字输入框
 * desc: 设置最大值。
 */

import React, { useState } from "react";
import NumberInput from "./index.tsx";

export default () => {
    const [value, setValue] = useState(0)
    return (
        <NumberInput
            value={value}
            onChange={e => setValue(e.value)}
            max={10}
            min={null}
        />
    )
}
```

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
size | enum | 按钮尺寸 | 否 | normal | normal 普通大小; tiny 最小 small 小号; large 大尺寸; huge 超大尺寸 |
disabled | bool | 是否禁用输入 | 否 | false | - |
error | bool | 是否输入验证出错 | 否 | false | - |
name | string | 表单输入项名 | 否 | '' | - |
value | string | 初始值 | 否 | '' | - |
placeholder | string | 输入默认显示 | 否 | '' | - |
step | number | 增减阶梯（输入框内的值一次加/减多少） | 否 |  1 | - |
min | number | 可输入最小值 | 否 | 0 | - |
max | number | 可输入最大值 | 否 | 100 | - |

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |  
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 值改变事件 | 否 | null | 回调函数第一个参数为一个包含 name, value属性的对象 |
onBlur | func | 失焦回调事件 | 否 | null | 回调函数参数为event |