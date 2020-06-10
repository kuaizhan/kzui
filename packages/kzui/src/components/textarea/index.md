# TextArea - 文本组件

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |
------- | ------- | ------- | ------- | ------- | ------- |
error | bool | 是否输入验证出错 | 否 | false | - |
name | string | 表单输入项名 | 否 | '' | - |
value | string | 初始值 | false | '' | - |
placeholder | string | 输入默认显示 | false | '' | - |
disabled | bool | 是否可用 | false | '' | - |

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 值改变事件 | 否 | null | 回调函数第一个参数为一个包含 name, value属性的对象 |
onKeyPress | func | 键盘事件 | 否 | null | 回调函数参数为event对象 |
