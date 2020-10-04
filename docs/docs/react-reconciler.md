# react-reconciler介绍

## react-reconciler

`react-reconciler` 是 `react` 团队开发的一个可以用以复用 `react` 大部分逻辑(特性)的库。可以理解为一个 api 的适配器，或者是 hook 的中心。

通过实现一些方法就可以自定义自己的 react 渲染器。复用 `react` 的一些特性的工作会由 `react-reconciler` 来处理协调(reconciler)。比如说(以 react@16.13.x 为例):

- function components
- class components
- props, state
- effects, lifecycle
- key, ref, context
- React.lazy, error boundaries
- concurrent mode, suspense
- ...

如果把这些理解为 `react` 的运行时的特性，那么 `jsx` 可以理解为编译时的特性，配合合适的编译工具也是可以支持的。这项工作(`react-reconciler`)极大地方便了 react 在不同平台之间的使用。我们只需要在不同的平台实现相应的渲染器(renderer)即可。 比如说:

- web 平台的 `react-dom`
- mobile 平台的 `react-native`
- wechat 平台的 `remax`/`taro@3.x`
- more: [awesome-react-renderer](https://github.com/chentsulin/awesome-react-renderer)

其实不光是不同的平台都可以使用 react，即使是 web 平台可以出现很多的 renderer，如:

- [react-canvas](https://github.com/Flipboard/react-canvas) - 基于 `react` 组件的高性能 `canvas` 渲染器
- [react-three](https://github.com/Izzimach/react-three) - 基于 `react` 和 `three.js` 的 3d 渲染

总结下来就是如果你希望一项工作从命令式的使用方式转变为声明式的方式，并且利用到 `react` 一些先进的特性(或者生态，`react` 的开发者现在也很多)，那么你都可以自定义你的 renderer。

小小展望: 未来很有可能一想到写UI，就会想到 `react`。新出的平台或者工具可能会考虑自己提供 `react` 的 renderer。

## custom renderer

接下来我们自定义一个简单的 [renderer](https://codesandbox.io/s/wild-field-i2m6l?file=/src/renders/index.tsx)

### 目标

替换 `React hello world app` 中的 `ReactDOM`

```js 
// ## React hello world app ##

import React from "react";
import ReactDOM from "react-dom"; // => import MyCustomRenderer from "./renderer";

function App() {
  return <div>hello world!</div>
}

const rootElement = document.getElementById("root"); 
ReactDOM.render(<App />, rootElement); // => MyCustomRenderer.render(<App />, rootElement);
```

### renderer

- 创建 hostComponent 实例
- 处理事件
- todo

```js
import ReactReconciler from "react-reconciler";

// 调试用: 当 hostConfig 里的方法调用前 console.trace(key);
function traceWrap(hostConfig) {
  let traceWrappedHostConfig = {};
  Object.keys(hostConfig).forEach(key => {
    const func = hostConfig[key];
    traceWrappedHostConfig[key] = (...args) => {
      console.trace(key);
      return func(...args);
    };
  });
  return traceWrappedHostConfig;
}

const rootHostContext = {};
const childHostContext = {};

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: (type, props) => {
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },
  /**
   This is where react-reco-nciler wants to create an instance of UI element in terms of the target. 
   Since our target here is the DOM, we will create document.createElement and type is the argument that contains the type string like div or img or h1 etc. 
   The initial values of domElement attributes can be set in this function from the newProps argument.
   */
  createInstance: (
    type,
    newProps,
    rootContainerInstance,
    _currentHostContext,
    workInProgress
  ) => {
    const domElement = document.createElement(type);
    // debugger;
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (typeof propValue === "string" || typeof propValue === "number") {
          domElement.textContent = propValue;
        }
      } else if (propName === "onClick") {
        domElement.addEventListener("click", propValue);
      } else if (propName === "className") {
        domElement.setAttribute("class", propValue);
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });
    return domElement;
  },
  createTextInstance: text => {
    return document.createTextNode(text);
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  finalizeInitialChildren: (domElement, type, props) => {},
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child);
  },
  prepareUpdate(domElement, oldProps, newProps) {
    return true;
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
    console.log(newProps, "newProps");

    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (typeof propValue === "string" || typeof propValue === "number") {
          domElement.textContent = propValue;
        }
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  }
};

const ReactReconcilerInst = ReactReconciler(traceWrap(hostConfig));

export default {
  render: (reactElement, domElement, callback) => {
    // Create a root Container if it doesnt exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(
        domElement,
        false
      );
    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(
      reactElement,
      domElement._rootContainer,
      null,
      callback
    );
  }
};
```

## Remax hostConfig 

[hostConfig/index.ts](https://github.com/remaxjs/remax/blob/v2.6.0/packages/remax-runtime/src/hostConfig/index.ts)


## 资料

- [awesome-list: awesome-react-renderer](https://github.com/chentsulin/awesome-react-renderer)
- [video: Building a Custom React Renderer | Sophie Alpert](https://www.youtube.com/watch?v=CGpMlWVcHok)
- [post: Exploring React Reconciler API](https://www.codementor.io/@manasjayanth/exploring-react-reconciler-api-ldbg9tgql)
- [post: 自己写个React渲染器: 以 Remax 为例(用React写小程序)](https://juejin.im/post/5d8395646fb9a06ad16faa57#%E8%87%AA%E5%AE%9A%E4%B9%89react%E6%B8%B2%E6%9F%93%E5%99%A8)