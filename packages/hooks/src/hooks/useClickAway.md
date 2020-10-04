# useClickAway

## 目标

非目标元素点击时触发回调，可以解决模态框非模态框部分点击时模态框不消失的问题。

## 安装

`npm install @kzui/hooks`

```ts
export default () => {
  const [modal, setModal] = React.useState(false);
  const clickRef = React.useRef("");

  // 点击非clickRef部分触发 setModal(false) 的回调
  useClickAway(clickRef, () => {
    setModal(false);
  });

  return (
    <div className="container">
      <button onClick={() => setModal(true)}>Show Modal</button>
      {modal && <div ref={clickRef} className="modal">Modal Content</div>}
    </div>
  );
}

```