# 发布日志

## v2.0.4

- 2020.03.11
- konglingxing
- konglx90@gmail.com

1. 添加了IconTypes的类型声明
2. 修改 dialog 默认固定在top的某个位置(之前是默认居中的), 添加支持 centered


## v2.0.3

- 2020.03.09
- konglingxing
- konglx90@gmail.com

1. ~~删除 Dialog body 的 `overflow-y: auto;`~~

    - 由于(select 组件有在dialog 下，超出dialog的部分会看不见, 设置z-index也没有用)，保留 下个版本修复
2. 给 Dialog 添加

    - `@dialog-min-height: 90px;`
    - `@dialog-min-width: 300px;`
3. 固定 select 的默认宽度为 `@select-default-width: 120px;`
4. ~~添加 Upload 组件~~

    - 可以使用 FileSelect 组件, 修改了 children 的位置


## v2.0.0

- 2020.03.08
- konglingxing
- konglx90@gmail.com

1. 删除 Poptip，请用功能更加齐全的 tooltip 替代
2. 删除 Popover，请使用功能更加齐全的 tooltip 替代
3. 删除 PopDialog，请使用PopConfirm
4. 改造 PopConfirm

    - ~~原来使用 hide 作为组件的隐藏语义，改成 visible~~
    - 不需要手动控制显示与否
    - 简化使用

    ```js
    const [isHide, setIsHide] = useState(true)
    return (
      <div style={{ position: 'relative', width: 'fit-content'}}>
        <Button type='confirm' onClick={() => setIsHide(false)}>点击展示 popConfirm</Button>
        <PopConfirm
          hide={isHide}
          onConfirm={() => setIsHide(true)}
          onCancel={() => setIsHide(true)}
        >
          This ia a PopConfirm
        </PopConfirm>
      </div>
    ```

    ```jsx
    const App = (
      <PopConfirm
          onConfirm={() => console.log('onConfirm')}
          onCancel={() => console.log('onCancel')}
          title={
            <Button>fish</Button>
          }
        >
        <Button>点击展示 popConfirm</Button>
      </PopConfirm>
    )
    ```