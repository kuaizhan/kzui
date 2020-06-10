# Switcher - 切换组件


*  Switcher

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
titles | string[] | 需要切换的文案列表 | 否 |  [] | - |
curIndex | number | 当前索引 | 否 | 0 | - |
itemStyle | React.CSSProperties | 每个文案按钮的样式 | 否 | {} | - |
itemClassName | string | 文案按钮的 className | 否 | '' | - |
## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |
onChange | func | 点击不同 title 的回调函数 | 否 | () => null | 事件回调函数第一个参数为 index，表示即将切换到的索引