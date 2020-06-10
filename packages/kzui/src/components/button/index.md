# Button - 按钮组件


* Button

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
type | enum | 按钮类型 | 否 | normal | normal 普通按钮; confirm 确认按钮; danger 删除按钮; dashed 虚线边框按钮|
size | enum | 按钮尺寸 | 否 | normal | normal 普通大小; small 小号; large 大尺寸; huge 超大尺寸 |
status | string | 按钮状态 | 否 | normal | normal 正常状态; loading 加载中; |
last | bool | 是否为最后一个按钮, 用于清除多个按钮并排时最后一个margin | 否 | false | - |
disabled | bool | 是否禁用 | 否 | false | - |

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
onClick | func | 按钮点击事件 | 否 | null | - |
