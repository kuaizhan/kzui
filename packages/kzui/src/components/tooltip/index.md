# Tooltip组件

## export
* tooltip

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
trigger | `hover` \| `click` | 触发方式 | 否 | `hover'`| `hover` \| `click` |
tip | React.ReactNode | 提示内容 | 否 | '' | - |
children | React.ReactNode | 触发提示的组件 | 否 | null | - |
placement | enum | 提示气泡的位置  | 否 | `bottom` | `left` \| `right` \| `top` \| `bottom`
theme | enum | 主题色 | 否 | `dark` | `dark` \| `light`
tipStyle | React.CSSProperties | 提示部分的样式 | 否 | {} | - |