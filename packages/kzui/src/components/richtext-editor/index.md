# richtext-editor - 富文本编辑器

```jsx
/**
 * title: 基本使用
 * desc: 这个文本编辑器可以直接对其文本直接编辑
 */

import React from "react";
import RichtextEditor from "./index.tsx";

export default () => {
  return <RichtextEditor value="初始化文本内容" />;
};
```

```jsx
/**
 * title: 控制文本编辑器
 * desc: 组件内部函数通过参数的形式暴露出来，这样外部可以控制执行该组件方法的时机。
 */
import React, { useRef } from "react";
import { Button, notification } from "@kzui/core";
import RichtextEditor from "./index.tsx";

export default () => {
  const command = useRef((command, value) => null);
  function handleAfterInit(commander) {
    command.current = commander;
  }
  function handleAddClick() {
    command.current("INSERT_HTML", { html: "插入到编辑框的html字符串" });
  }
  function handleGetClick() {
    command.current("GET_HTML", (html) => {
      notification.success(html);
    });
  }
  function handleClearClick() {
    command.current("CLEAR_HTML");
  }
  return (
    <div>
      <RichtextEditor value="初始化文本内容" afterInit={handleAfterInit} />
      <div>
        向编辑框插入内容 <Button onClick={() => handleAddClick()}>插入</Button>
      </div>
      <div>
        获取编辑框的内容 <Button onClick={() => handleGetClick()}>获取</Button>
      </div>
      <div>
        清空编辑器的内容{" "}
        <Button onClick={() => handleClearClick()}>清空</Button>
      </div>
    </div>
  );
};
```

## 属性

| 属性名    | 类型   | 描述                           | 是否必须 | 默认值    | 字典 |
| --------- | ------ | ------------------------------ | -------- | --------- | ---- |
| name      | string | 组件名                         | 否       | ''        | -    |
| value     | string | 初始化插入编辑框的 html 字符串 | 否       | ''        | -    |
| afterInit | func   | 执行组件内部方法的回调函数,    | 否       | emptyFunc | -    |
| linkBreak | 0 / 1  | Crtl+Enter 换行， 1 Enter 换行 | 否       | 0         | -    |

其中：

- emptyFunc 为：

```js
() => {};
```

TIPS： afterInit 会将组件内部函数通过参数的形式暴露出来，这样外部可以控制执行该组件方法的时机。

1. 引入组件

```html
<RichTextEditor value="初始化文本内容" afterInit="{this.handleAfterInit}" />
```

2. 通过回调函数拿到内部方法

```js
handleAfterInit(commander) {
    this.command = commander;
}
```

3. 执行内部方法

```js
// 向编辑框插入内容
this.command("INSERT_HTML", { html: "插入到编辑框的html字符串" });

// 拿到编辑框的内容
this.command("GET_HTML", (html) => {
  // html参数是编辑框的innerHTML
  // code here
});

// 清空编辑器的内容
this.command("CLEAR_HTML");
```

## 事件

| 属性名     | 类型 | 描述                                           | 是否必须 | 默认值    | 事件处理函数说明 |
| ---------- | ---- | ---------------------------------------------- | -------- | --------- | ---------------- |
| onChange   | func | 编辑框 change 事件                             | 否       | emptyFunc | -                |
| onKeyPress | func | 编辑框 keyPress 事件                           | 否       | emptyFunc | -                |
| onPaste    | func | 编辑框 paste 事件                              | 否       | emptyFunc | -                |
| onBlur     | func | 编辑框失焦时间，第一参数事件对象，失焦前的选区       | 否       | emptyFunc | -                |
| onMouseUp  | func | 编辑框的鼠标抬起事件                             | 否      | emptyFunc | -                |

其中：

- onChange 传出的对象为`{name, value}`, value 为编辑框的文本内容 innerHTML 值。
- onKeyPress 和 onPaste 传出的对象为 React 包装的 proxy event，用法与原生写法一样。

## TODO

- 可以深入学习`window.selection()`这个函数尝试实现直接编辑HTML，而不是转译成字符串，来实现智能文本（快站公众号的智能文本）