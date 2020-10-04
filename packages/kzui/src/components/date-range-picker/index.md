# DateRangePicker - 选择日期段的日期选择器组件

- DateRangePicker

```jsx
/**
 * title: 日期范围选择
 * desc: 最简单的用法。
 */
import React, { useState } from "react";
import { DateRangePicker } from "@kzui/core";

export default () => {
  const [start, setStart] = useState("2020-2-13");
  const [end, setEnd] = useState("2020-2-14");
  return (
    <>
      <div>
        选择日期：{start} ~ {end}
      </div>
      <DateRangePicker
        start={start}
        end={end}
        name="date-range"
        onChange={(value) => {
          setStart(value.start);
          setEnd(value.end);
        }}
      />
    </>
  );
};
```

## 属性

| 属性名   | 类型    | 描述               | 是否必须 | 默认值 |
| -------- | ------- | ------------------ | -------- | ------ |
| start    | string  | 时间, 如 2017-5-1  | 否       | ""     |
| end      | string  | 时间, 如 2020-2-11 | 否       | ""     |
| name     | string  |                    | 否       | ""     |
| error    | boolean | 是否校验错误       | 否       | -      |
| disabled | boolean | 是否禁用           | 否       | -      |

## 事件

| 属性名   | 类型 | 描述     | 是否必须 | 默认值   | 参数说明                                   |
| -------- | ---- | -------- | -------- | -------- | ------------------------------------------ |
| onChange | func | 改变时间 | 否       | () => {} | 回调函数第一个参数为包含 start, end 的对象 |
