# Select - 下拉选择组件

```jsx
/**
 * title: 选择框
 * desc: 选择框的基本使用方法
 */


import React, { useState } from 'react';
import { notification, Select } from '@kzui/core';

const initOptions = [
  {value: 1, text: '1'},
  {value: 2, text: '2'},
  {value: 3, text: '3', isLabel: true },
]

const demo = () => {
  const [options, setOptions] = useState(initOptions)
  const [selected, setSelected] = useState([])
  const [initialExpand, setInitialExpand] = useState(false)

  function handleLoadMore() {
    const newOptions = [...initOptions, {
      value: 4,
      text: '4',
      isSubOption: true
    }]
    setOptions(newOptions)
  }

  console.log(selected, 'selected');

  return (
    <Select 
      defaultText= '请选择'
      value={selected}
      options={options}
      onChange={(e) => {
        setSelected(e.value)
        notification.success(JSON.stringify(e))
      }}
      disabled={false}
      initialExpand={initialExpand}
      size='large'
      onExpand={() => console.log('onExpand')}
      hasMore
      onLoadMore={handleLoadMore}
      mode='multiple'
      style={{ width: 300 }}
    />
  )
};

export default demo
```

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
defaultText | string | 默认显示文案 | 否 | 请选择 | - |
name | string | 表单项名 | 否 | '' | - |
value | string | 当前值 | 否 | null | - |
size | string | 大小 | 否 | '' | - |
hasMore | bool | 是否有加载更多 | false | - |
options | array | 可选项 | 否 | [] | - |
disabled | bool | 是否禁用 | 否 | false | - |
maxHeight | number | 下拉菜单最大高度 | 否 | null | - |
popoverCls | string | 下拉菜单 class | 否 | '' | - |
popoverStyle | cssProperties | 下拉菜单样式 | 否 | {} | - |
mode | `multiple` |  是否多选  | 否 | - | `multiple` |

其中：
* options是一个对象数组，必须满足如下定义：
```js
PropTypes.arrayOf(PropTypes.shape({
   value: PropTypes.oneOfType([
	    PropTypes.string,
	    PropTypes.number,
	]),
   text: PropTypes.string,
})),
```

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |  
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 值改变事件 | 否 | null | 事件回调函数第一个参数为包含name, value 属性的对象 |
onLoadMore | func | 点击加载更多回调 | 否 | null | - |
onExpand | func | 展开菜单回调 | 否 | null | - |


