# Tag - 标签组件


* Tag

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |
------- | ------- | ------- | ------- | ------- | ------- |
value | number | tag id | 否 | 0 | - |
label | string | tag名称 | 否 | 'Tag' | - |
active | bool | 初始状态是否选中 | false | '' | - |
cancel | bool | 选中后是否可取消 | false | '' | - |
multi | bool | 是否为多选 | false | '' | - |
disabled | bool | 是否禁用 | false | '' | - |
removeAble | bool | 是否可以删除 | false | '' | - |
showOnly | bool | 是否为展示标签 | false | '' | - |

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 返回当前tag | 否 | null | 回调函数第一个参数为一个包含label, value属性的对象 |
onRemove | func | 返回当前tag | 否 | null | 回调函数第一个参数为一个包含label, value属性的对象 |