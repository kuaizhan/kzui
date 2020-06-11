# RadioGroup - 单选组


* RadioGroup

## RadioGroup 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
disabled | bool | 是否被禁用 | 否 | false | - |
name | string | 表单项名 | 否 | '' | - |
value | string | 当前值 | 否 | null | - |
checked | bool | 是否禁用 | 否 | false | - |
options | array | 可选项 | 否 | [] | - |
layout | enum | 单选框布局样式 | 否 | 'vertical' | vertical 垂直排列选择性；horizontal 水平排列单选项 |
type | string | 单选框样式类型 | 否 | `radio` | `radio` \| `button` |


## RadioGroup 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |  
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 值改变事件 | 否 | null | 事件回调函数第一个参数为包含name, value 属性的对象 |
