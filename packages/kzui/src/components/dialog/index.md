# Dialog - 弹框组件

- Dialog

```jsx
/**
 * title: 对话框
 * desc: 最简单的用法。（很丑）
 */

import React, { useState } from "react";
import { Dialog, Button } from "@kzui/core";

export default () => {
  const [isDialogHide, setIsDialogHide] = useState(true);
  function handleClose() {
    setIsDialogHide(true);
  }
  return (
    <div>
      <Button type="confirm" onClick={() => setIsDialogHide(false)}>
        点击展示对话框
      </Button>
      <Dialog
        hide={isDialogHide}
        title="Header"
        actions={[
          <Button onClick={handleClose}>取消</Button>,
          <Button type="confirm" onClick={handleClose}>
            确认
          </Button>,
        ]}
        onClose={handleClose}
      >
        <div>这是个对话框</div>
      </Dialog>
    </div>
  );
};
```

## 属性

| 属性名  | 类型   | 描述                    | 是否必须 | 默认值 | 字典 |
| ------- | ------ | ----------------------- | -------- | ------ | ---- |
| hide    | bool   | 是否隐藏                | 否       | false  | -    |
| actions | array  | 传入下方操作按钮        | 否       | []     | -    |
| title   | string | 对话框标题              | 否       | ''     | -    |
| portal  | bool   | 是否使用 react16 portal | 否       | false  | -    |

## 方法

| 方法名  | 类型 | 描述 | 是否必须 | 默认值   | 字典 |
| ------- | ---- | ---- | -------- | -------- | ---- |
| onClose | func | 否   | 关闭回调 | () => {} | -    |
