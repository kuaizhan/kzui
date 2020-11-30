# Switch - 开关组件

```jsx
/**
 * title: 基本使用
 * desc: 副标题
 * 
 */

import React, { useState } from 'react';
import { Switch } from '@kzui/core';

export default () => {
  
  const [value, setValue] = useState(false)
  
  function handleChange (value) {
    console.log(value, 'switch');
    // return
    setValue(value)
  }

  return (
    <div>
      <Switch on={value} onChange={e => handleChange(e.on)} />
    </div>
  )
}
  
 ```


*  Switch

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
disabled | boolean | 是否禁用 | 否 |  false | - |
name | string |  开关名称 | 否 | '' | - |
on | boolean | 开关是否开启 | 否 | false | - |
control | boolean | 是否受控 | 否 | undefined | 有on且想非受控就必须是布尔值false

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |
onChange | func | 开关切换事件 | 否 | () => null | 事件回调函数第一个参数为包含on, name 属性的对象