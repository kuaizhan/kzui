# DatePicker - 日期选择器组件

- DatePicker

```jsx
/**
 * title: 日期选择器
 * desc: 通过 value、onChange 属性使组件受控。
 */

import React, { useState } from "react";
import { DatePicker } from '@kzui/core';

export default () => {
  const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  const [chosenDate, setChosenDate] = useState(today);
  return (
    <>
      <div>
        <div>选择时间：{chosenDate}</div>
        <DatePicker
          name="日期选择器"
          value={chosenDate}
          onChange={(value) => {
            setChosenDate(value.value);
          }}
        />
      </div>
    </>
  );
};
```

## 属性

| 属性名   | 类型             | 描述                    | 是否必须 | 默认值               | 字典 |
| -------- | ---------------- | ----------------------- | -------- | -------------------- | ---- |
| value    | number or string | 时间戳或时间字符串      | 否       | new Date().getTime() | -    |
| minDate  | string           | 最小可选日期 时间字符串 | 否       | 1970-1-1             | -    |
| maxDate  | string           | 最大可选日期 时间字符串 | 否       | 2117-12-31           | -    |
| error    | boolean          | 是否校验错误            | 否       | -                    | -    |
| disabled | boolean          | 是否禁用                | 否       | -                    | -    |
| name     | string           | 名字                    | 否       | ''                   | -    |

## 事件

| 属性名   | 类型 | 描述     | 是否必须 | 默认值 | 字典 |
| -------- | ---- | -------- | -------- | ------ | ---- |
| onChange | func | 改变时间 | 否       | null   | -    |
