# checkbox - 复选框


* Checkbox

```jsx
/**
 * title: 复选框基本使用
 * desc: 这里只展示基本样式
 * */

import React from 'react';
import { Checkbox } from '@kzui/core';

export default () => {
  const [checked, setChecked] = React.useState({ normal: false, partialChecked: false });

  function handleChecked(e) {
    console.log(e);
    setChecked({
      ...checked,
      [e.name]: e.checked,
    });
  }

  return (
    <>
      <Checkbox
        checked={checked.normal}
        name="normal"
        onChange={handleChecked}
      >
        复选框
      </Checkbox>
      <Checkbox
        checked={checked.partialChecked}
        name="partialChecked"
        partialChecked={true}
        onChange={handleChecked}
      >
        部分选择
      </Checkbox>
    </>
  )
}

```

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
disabled | bool | 是否被禁用 | 否 | false | - |
name | string | 表单项名 | 否 | '' | - |
checked | bool | 是否选中 | 否 | false | - |
partialChecked | bool | 是否部分选择 | 否 | false | - |
size | string | 大小 | 否 | 'normal' | - |
uncontroled | bool | 是否为非受控组件 | 否 | false | - |


## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |  
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 值改变事件 | 否 | null | 事件回调函数第一个参数为包含name, checked 属性的对象 |

