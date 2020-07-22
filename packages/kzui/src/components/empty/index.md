# Empty - 空状态组件

- Empty

```jsx
/**
 * title: 空数据占位组件
 * desc: 就是个美化空数据时的状态
 */
import React, { useState } from "react";
import { Empty } from "@kzui/core";

export default () => {
  return <Empty />;
};
```

## 属性

| 属性名    | 类型   | 描述         | 是否必须 | 默认值     | 字典 |
| --------- | ------ | ------------ | -------- | ---------- | ---- |
| emptyText | string | 空数据时文案 | 否       | '暂无数据' | -    |
| emptyImg  | string | 空数据的图片 | 否       | -          | -    |
