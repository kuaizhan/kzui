## 安装

可以在npm网站上获取 [npm package](https://www.npmjs.com/package/kzui/core).

```sh
// 使用 npm
npm install @kzui/core

// 使用 yarn
yarn add @kzui/core
```

## 使用

一个最简单的例子:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@kzui/core';
import '@kzui/core/dist/styles.css';
 
function App() {
  return (
    <Button type="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```