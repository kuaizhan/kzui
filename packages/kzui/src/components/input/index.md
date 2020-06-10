# Input - 文本组件


* Input

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
type | enum | 输入类型 | 否 | text | text 文本输入; password 密码输入 |
size | enum | 按钮尺寸 | 否 | normal | normal 普通大小; tiny 最小 small 小号; large 大尺寸; huge 超大尺寸 |
disabled | bool | 是否禁用输入 | 否 | false | - |
error | bool | 是否输入验证出错 | 否 | false | - |
name | string | 表单输入项名 | 否 | '' | - |
value | string | 初始值 | false | '' | - |
placeholder | string | 输入默认显示 | false | '' | - |

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |  
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 值改变事件 | 否 | null | 回调函数第一个参数为一个包含 name, value属性的对象 |
onKeyPress | func | 键盘事件 | 否 | null | 回调函数参数为event对象 |
onKeyPress | func | 鼠标事件 | 否 | null | - |
