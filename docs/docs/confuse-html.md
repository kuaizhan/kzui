# 混淆HTML策略

## 目标

给使用`React`或者`Vue`等现代框架的web页面提供一种简单的混淆HTML结构的方案，可以达到简单的反爬虫的目标。

## document.createElement

无论是`React`还是`Vue`最后都要依赖[`document.createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)来创建DOM，于是我们可以通过重写`document.createElement`来实现。

```js
const createElement = document.createElement.bind(document);
document.createElement = function(tagName, options) {
    const elem = createElement(tagName, options);

    // todo more code
    // confuseElement(elem)

    return elem;
}
```

## 混淆策略

1. 对于每个混淆策略有一定概率应用到 `element` 上

    ```js
    function shouldConfuse(ratio = 0.5) {
        return Math.random() < ratio
    }
    ```

2. uuid 生成器

    ```js
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid.slice(0, 5);
    }
    ```

3. 有意义的英文 meaningName

    [develop-common-words](https://github.com/gauseen/develop-common-words/blob/master/README.md)


    ```js
    function getOneIntFromRange(range) {
        return Math.floor(Math.random() * range)
    }
    ```

    ```js
    function getOneMeaningName() {
        return 'duck'
    }
    ```

2. 添加类名

    - `[meaningName]-[uuid]`
    - `[uuid]-[meaningName]`
    - `[meaningName]_[uuid]`
    - `[uuid]_[meaningName]`
    - `[uuid]__[meaningName]`
    - `[meaningName]__[uuid]`

    ```js
    function getOneSplitFlag() {
        return ['-', '_', '__'][getOneIntFromRange(3)]
    }
    ```

    ```js
    function confuseElementClassName(element) {
        const className = getOneMeaningName() + getOneSplitFlag() + generateUUID();
        element.classList.add(className)
    }
    ```
3. 添加没有意义的节点(对代码使用`selector`有要求)

    ```js
        function getOneNode() {
            const randomElement = createElement('div');
            randomElement.innerHTML = generateUUID();
            randomElement.setAttribute('style', 'display:none');
            return randomElement
        }

        function confuseAppendChild(element) {
            element.appendChild(getOneNode());
        }
    ```

4. 重写`createTextNode`

    `<p>我爱祖国</p>` => `<p>我<p style="display:none;">看不到我</p>爱<p class="hh">no see</p>祖国</p>`

    * `.hh { display:none; }`

```js
    const createTextNode = document.createTextNode.bind(document)
    document.createTextNode = function(text) {
        const elem = createTextNode(text);

        // todo

        return elem;
    }
```