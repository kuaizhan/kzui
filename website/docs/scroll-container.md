# ScrollContainer - 滚动容器


* ScrollContainer

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
xScroll | bool | x轴方向滚动 | 否 | false | - |
yScroll | bool | y轴方向滚动 | 否 | false | - |
scrollToBottom | bool | 滚动条是否在底部 | 否 | false | - |
reserveSize | number | 触发滚动到顶或滚动到底距离多少像素触发事件 | 否 | 10 | - |


## 事件

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
onHitBottom | func | 滚动触底事件 | 否 | null | - |
onHitTop | func | 滚动触顶事件 | 否 | null | - |
