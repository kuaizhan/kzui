
# ColorPicker - 拾色器


* ColorPicker

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
dimensions | object | 坐标尺寸 | 否 | - | - |
hide | bool | 是否隐藏 | 否 | - | - |
hex | string | 初始色值 | 否 | ff0000 | - |
a | number | 初始透明度 | 否 | 100 | - |
recommendColors | array | 推荐颜色 | 否 | - | - |
recommendThemeColors | array | 推荐主题色 | 否 | - | - |
recentColors | array | 最近使用色 | 否 | - | - |
type | string | 拾色器类型（simple or full) | 否 | simple | - |

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 参数说明 |  
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 颜色改变 | 否 | null | 第一个参数为返回的hex形式的颜色，第二个参数为透明度（0~100）|
onBlur | func | 失去焦点 | 否 | null | - |