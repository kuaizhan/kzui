# SearchSelect - 带有搜索的下拉选择组件

```jsx
/**
 * title: 搜索选择框
 * desc: 搜索选择框的基本使用方法
 */


import React from 'react';
import { SearchSelect, notification } from '@kzui/core';

const options = [
	{value: 1, text: '1'},
	{value: 2, text: '2'},
	{value: 3, text: '3'}
]

export default () => (
  <SearchSelect 
    defaultText= '请选择'
    emptyWarning= '暂无搜索结果'
    value={null}
    name= ''
    options={options}
    onChange={(e) => notification.success(JSON.stringify(e))}
    onSearch={(e) => notification.success(JSON.stringify(e))}
    disabled={false}
    size= ''
    onExpand={() => console.log('onExpand')}
  />
);
```

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |
------- | ------- | ------- | ------- | ------- | ------- |
defaultText | string | 默认显示文案 | 否 | 请选择 | - |
emptyWarning | string | 搜索结果为空的提示文案 | 否 | '暂无搜索结果' | - |
name | string | 表单项名 | 否 | '' | - |
value | string | 当前值 | 否 | null | - |
size | string | 大小 | 否 | '' | - |
options | array | 可选项 | 否 | [] | - |
disabled | bool | 是否禁用 | 否 | false | - |
  

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 值改变事件 | 否 | null | 事件回调函数第一个参数为包含name, value 属性的对象 |
onSearch | func | 搜索事件 | 否 | null | 事件回调函数第一个参数为包含name, value 属性的对象 |
onExpand | func | 展开事件 | 否 | null | - |


