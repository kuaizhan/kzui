# FileSelect - 文件选择按钮

```jsx
/**
 * title: 文件选择按钮
 * desc: 上传文件等
 */

import React, { useState } from "react";
import { FileSelect } from "@kzui/core";

export default () => {
  const [fileList, setFileList] = useState([])
  return (
    <>
      <FileSelect
         fileList={fileList}
         onChange={e => setFileList(e)}
      >
        上传图片
      </FileSelect>
    </>
  );
};
```

## 属性

| 属性名       | 类型   | 描述                       | 是否必须 | 默认值  | 字典 |
| ------------ | ------ | -------------------------- | -------- | ------- | ---- |
| disabled     | bool   | 是否禁用                   | 否       | false   | -    |
| last         | bool   | 是否是最后一个按钮         | 否       | false   | -    |
| accept       | string | 文件类型 MIME              | 否       | '_/_'   | -    |
| multiple     | bool   | 是否支持多选               | 否       | false   | -    |
| maxFileSize  | number | 单个文件最大尺寸，以字节计 | 否       | 4194304 | -    |
| maxFileCount | number | 可选取的文件数目           | 否       | 1       | -    |
| fileList     | Array<{ url: string }> | 已上传的文件 |   否   |  null  |  -   |
## 事件

| 属性名   | 类型 | 描述               | 是否必须 | 默认值 | 参数说明                                    |
| -------- | ---- | ------------------ | -------- | ------ | ------------------------------------------- |
| onSelect | func | 文件选取事件       | 否       | null   | 第一个参数传入选取的文件列表(FileList 对象) |
| onError  | func | 处理错误的回调函数 | 否       | null   | 第一个参数传入 KZUIError 错误对象           |

## 错误定义

| 错误码 | 错误描述             |
| ------ | -------------------- |
| 1      | 超过文件数目上限     |
| 2      | 超过单个文件大小上限 |
