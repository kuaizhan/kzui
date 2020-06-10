# richtext-editor - 富文本编辑器


* RichTextEditor

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
name | string | 组件名 | 否 | '' | - |
value | string | 初始化插入编辑框的html字符串 | 否 | '' | - |
afterInit | func | 执行组件内部方法的回调函数 | 否 | emptyFunc | - |


其中：
* emptyFunc为：
```js
() => {}
```

TIPS： afterInit 会将组件内部函数通过参数的形式暴露出来，这样外部可以控制执行该组件方法的时机。


1. 引入组件
```html
<RichTextEditor value="初始化文本内容" afterInit={this.handleAfterInit} />
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
this.command('INSERT_HTML', { html: '插入到编辑框的html字符串' });

// 拿到编辑框的内容
this.command('GET_HTML', (html) => {
    // html参数是编辑框的innerHTML
    // code here
});

// 清空编辑器的内容
this.command('CLEAR_HTML');
```

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |  
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 编辑框change事件 | 否 | emptyFunc | - |
onKeyPress | func | 编辑框keyPress事件 | 否 | emptyFunc | - |
onPaste | func | 编辑框paste事件 | 否 | emptyFunc | - |

其中：
* onChange传出的对象为`{name, value}`, value为编辑框的文本内容innerHTML值。
* onKeyPress和onPaste 传出的对象为 React 包装的 proxy event，用法与原生写法一样。
