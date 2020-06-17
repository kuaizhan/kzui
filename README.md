<p align="center">
  <a href="https://material-ui.com/" rel="noopener" target="_blank"><img width="150" src="https://www.kuaizhan.com/v3/homepage/images/logo-kz.f6c18915.png" alt="kzui logo"></a></p>
</p>

<h1 align="center">kzui</h1>

<div align="center">

[React](https://reactjs.org/) 组件库，提高web开发效率，适合B端快速搭建web平台，不断改进，持续更新。

[![npm package](https://img.shields.io/npm/v/@kzui/core/latest.svg)](https://www.npmjs.com/package/@kzui/core)
[![npm downloads](https://img.shields.io/npm/dm/@kzui/core.svg)](https://www.npmjs.com/package/kzui/core)

</div>

## 安装

可以在npm网站上获取 [npm package](https://www.npmjs.com/package/kzui/core).

**[稳定版](http://cloud.kuaizhan.com/kzui)**
```sh
// 使用 npm
npm install @kzui/core

// 使用 yarn
yarn add @kzui/core
```

## 谁支持了kzui?

<p style="display: flex; justify-content: center;">
  <a href="http://www.kuaizhan.com" rel="noopener" target="_blank" style="margin-right: 16px;"><img height="80" src="https://www.kuaizhan.com/v3/homepage/images/logo-kz.f6c18915.png" alt="kuaizhan" title="UI Components for Productive Dev Teams" loading="lazy" /></a>
</p>

## 使用

一个最简单的例子:

```jsx
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

交互式demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/kzui-button-96rtb?file=/src/App.js)

## License

[MIT license](/LICENSE).
