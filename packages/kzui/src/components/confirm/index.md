# Confirm - 确认弹出框组件

- Confirm

```jsx
/**
 * title: 确认弹框
 */
import React, { useState } from "react";
import { Button, Confirm } from "@kzui/core";

export default () => {
  const [isConfirmHide, setIsConfirmHide] = useState(true);
  return (
    <div>
      <Button type="confirm" onClick={() => setIsConfirmHide(false)}>
        点击展示 Confirm{" "}
      </Button>
      <Confirm
        hide={isConfirmHide}
        onCancel={() => setIsConfirmHide(true)}
        onConfirm={() => setIsConfirmHide(true)}
        confirmText="确定"
        cancelText="取消"
      >
        This is a Confirm
      </Confirm>
    </div>
  );
};
```

```jsx
/**
 * title: no footer
 */
import React, { useState } from "react";
import { Button, Confirm } from "@kzui/core";

export default () => {
  const [isConfirmHide, setIsConfirmHide] = useState(true);
  return (
    <div>
      <Button type="confirm" onClick={() => setIsConfirmHide(false)}>
        点击展示 Confirm{" "}
      </Button>
      <Confirm
        hide={isConfirmHide}
        onCancel={() => setIsConfirmHide(true)}
        onConfirm={() => setIsConfirmHide(true)}
        footer={null}
      >
        This is a Confirm
      </Confirm>
    </div>
  );
};
```

## 属性

| 属性名      | 类型   | 描述         | 是否必须 | 默认值 | 字典 |
| ----------- | ------ | ------------ | -------- | ------ | ---- |
| hide        | bool   | 是否隐藏     | 否       | false  | -     |
| confirmText | string | 确认按钮文案 | 否       | '确定' | -      |
| cancalText  | string | 取消按钮文案 | 否       | '取消' | -      |
| footer  | React.ReactNode | 自定义footer | 否       | undefined | -      |

## 方法

| 属性名    | 类型 | 描述         | 是否必须 | 默认值 | 字典 |
| --------- | ---- | ------------ | -------- | ------ | ---- |
| onConfirm | func | 确认按钮回调 | 否       | null   | -      |
| onCancel  | func | 取消按钮回调 | 否       | null   | -      |
| onClose   | func | 关闭键回调  |  否       | null   | -      |
