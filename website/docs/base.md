# Base - 基础配置



* KZUIComponent - 基础UI库组件类
* types - PropTypes的可重用类型定义

## KZUIComponent 类
### 方法

#### initStateFromProps(props)

从组件属性初始化组件内部状态。默认在构造函数中会调用该函数一次。为兼容redux状态管理，在组件声明周期函数`componentWillReceiveProps`中也会调用该函数一次。

*注意* 该函数会多次调用，请避免在函数中写耗时操作（例如调用接口，操作DOM等）。

#### autoBind(...args)

给事件处理函数绑定this。默认在构造函数中会调用一次`autoBind('handleClick')`, 这个行为参考`handleClick` 的说明。

可以有如下调用：`this.autoBind('handleClick', 'handleSelect');` 来处理多个事件处理函数的this绑定。

关于为什么不直接在render中写bind？[参考](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

#### storeRef(name)

保存DOM节点的引用到this。
示例：

```js
render() {
    return (<div ref={this.storeRef('wrp')} className={className} />)
}
// now you can use this.wrp to get the DOM
```

#### raiseError(code, message)

错误处理函数。该函数会创建一个KZUIError的Error对象，使用组件时，如果定义了onError属性时，会调用这个onError函数处理错误，传入该错误对象。没有定义onError属性时，会直接抛出这个错误。

## types 常量对象
### uiSizeType

UI控件尺寸取值枚举

### valueType

表单域值类型

### optionListType

选项列表类型

### dimensionType

坐标尺寸类型

### singleChildNode

单节点类型

### childrenType

子节点类型

### textNavItemsType

文本导航项列表类型

### iconNavItemsType

包含图标的导航项列表类型

