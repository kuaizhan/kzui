# EventBlackHole - 事件黑洞

```jsx
/**
 * title: 事件黑洞
 * desc: 可以阻止子元素的事件冒泡(相对于React的合成事件)
 */

import React, { useState } from "react";
import { EventBlackHole, Button, notification } from "@kzui/core";

export default () => {
  return (
    <>
      <div onClick={() => notification.success("黑洞外部部按钮")}>
        <EventBlackHole captureEvents={["click"]}>
          <Button onClick={() => notification.success("黑洞内部按钮")}>点击: 黑洞</Button>
        </EventBlackHole>
      </div>
      <div
        style={{ marginTop: "10px" }}
        onClick={() => notification.success("黑洞外部按钮")}
      >
        <div>
          <Button onClick={() => notification.success("黑洞内部按钮")}>
            点击: 没有黑洞
          </Button>
        </div>
      </div>
    </>
  );
};
```

## 属性

| 属性名        | 类型            | 描述                   | 是否必须 | 默认值 | 字典 |
| ------------- | --------------- | ---------------------- | -------- | ------ | ---- |
| className     | string          | css 类目               | 否       | ''     | -    |
| captureEvents | array of string | 捕获的事件名，数组形式 | 否       | []     | -    |
| children      | node            | 子节点                 | 否       | null   | -    |
