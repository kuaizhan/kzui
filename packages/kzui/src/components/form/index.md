# Form - 表单

```jsx
/**
 * title: 表单
 * desc: 规范表单的格式
 */

import React from "react";
import { Form, FormRow, Input, Button } from "@kzui/core";

export default () => {
  return (
    <Form>
      <FormRow label="验证码">
        <Input style={{ width: "120px", marginRight: "12px" }} />
        <Button type="confirm" last>
          获取验证码
        </Button>
      </FormRow>
      <FormRow label=" ">
        <Button type="confirm" last>
          登录
        </Button>
      </FormRow>
    </Form>
  );
};
```

## Form 属性

| 属性名   | 类型 | 描述       | 是否必须 | 默认值 | 字典 |
| -------- | ---- | ---------- | -------- | ------ | ---- |
| children | node | 表单行节点 | 否       | ''     | -    |

## FormRow 属性

| 属性名   | 类型   | 描述         | 是否必须 | 默认值 | 字典 |
| -------- | ------ | ------------ | -------- | ------ | ---- |
| label    | String | 表单行 label | 否       | ''     | -    |
| children | node   | 表单控件节点 | 否       | ''     | -    |
