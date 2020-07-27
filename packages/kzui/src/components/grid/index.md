# Grid （栅栏式布局）

```jsx
/**
 * title: 栅格系统
 * desc: 布局
 */

import React from "react";
import { Row, Col } from "@kzui/core";

export default () => {
  return (
    <Row>
      <Col style={{ backgroundColor: "yellow" }} span={16}>
        duck 16
      </Col>
      <Col style={{ backgroundColor: "red", color: "yellow" }} span={8}>
        fish 8
      </Col>
    </Row>
  );
};
```

## Row Props

| 属性      | 说明               | 类型   | 默认值 |
| --------- | ------------------ | ------ | ------ |
| className | 自定义 Class       | String | -      |
| gutter    | 两个栅格之间的间距 | Number | 0      |

`gutter应当为2n`

## Col Props

| 属性      | 说明                                       | 类型   | 默认值 |
| --------- | ------------------------------------------ | ------ | ------ |
| span      | 栅格占位数目，范围`0~12` 0->`display:none` | Number | 0      |
| offset    | 栅格与左侧间隔的数目                       | Number | 0      |
| className | 自定义 Class                               | String | -      |
