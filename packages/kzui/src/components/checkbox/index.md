# checkbox - 复选框


* Checkbox

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
disabled | bool | 是否被禁用 | 否 | false | - |
name | string | 表单项名 | 否 | '' | - |
checked | bool | 是否选中 | 否 | false | - |
partialChecked | bool | 是否部分选择 | 否 | false | - |
size | string | 大小 | 否 | 'normal' | - |


## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |  
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 值改变事件 | 否 | null | 事件回调函数第一个参数为包含name, checked 属性的对象 |

