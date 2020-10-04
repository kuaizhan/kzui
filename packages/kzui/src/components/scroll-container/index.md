# ScrollContainer - 滚动容器


```jsx
/**
 * title: 滚动容器
 * desc: 自定义滚动容器事件和样式，效果更佳
 */


import React from 'react';
import { ScrollContainer, notification } from '@kzui/core';

export default () => (
  <ScrollContainer 
    style={{height: '100px', border: '1px solid #000'}}
    yScroll={true}
    xScroll={true}
    scrollToBottom={true}
    reserveSize={40}
    onHitBottom={() => notification.success('滚动触底事件')}
    onHitTop={() => notification.success('滚动触顶事件')}
  >
    1<br/>
    2<br/>
    3<br/>
    4<br/>
    5<br/>
    6<br/>
    7<br/>
    8<br/>
    9<br/>
    10<br/>
  </ScrollContainer>
);
```

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
onClick | () => void | 点击事件 | 否 | null | - |
