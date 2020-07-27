
# HTML拆分工具

### 把html页面源代码拆分成head和body两个部分

```jsx
/**
 * title: 说明
 * desc: 把html页面源代码拆分成head和body
*/
import React, { useState, useRef } from 'react';
import { TextArea, Button, notification } from '@kzui/core';

export default () => {
  const iframeRef = useRef(null);
  const [html, setHtml] = useState('');
  const [result, setResult] = useState({
    head: '',
    body:''
  });

  function handleConfirm() {
    if (iframeRef.current.contentDocument) {
      setResult({
        head: iframeRef.current.contentDocument.head.innerHTML,
        body: iframeRef.current.contentDocument.body.innerHTML,
      })
    }
  }

  function copyTextToClipboard(input) {
    input.select();
    input.setSelectionRange(0, input.value.length);
    document.execCommand('copy', true);
    try {
      document.execCommand('copy');
    } catch (err) { }
    notification.success('复制成功');
  }

  function createFakeInput(code) {
    const fakeInput = document.createElement('input');
    fakeInput.style.fontSize = "12pt";
    fakeInput.style.border = "0";
    fakeInput.style.padding = "0";
    fakeInput.style.margin = "0";
    fakeInput.style.position = 'absolute';
    fakeInput.style.right = '-9999px';
    fakeInput.setAttribute("readonly", "");
    fakeInput.setAttribute("id", "xyzb_copy_text" + (Math.random() * 10000).toFixed());
    fakeInput.value = code;
    document.body.appendChild(fakeInput);
    return fakeInput;
  }

  function copyDirect(code) {
    const fakeInput = createFakeInput(code);
    copyTextToClipboard(fakeInput);
  }


  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', 
        columnGap: '20px',
        textAlign: 'right'
      }}
    >
      <div>
        <TextArea value={html} onChange={e => setHtml(e.value)} style={{height: '600px', marginBottom: '5px'}}/>
        <Button type="normal" onClick={() => handleConfirm()} last>确定</Button>
      </div>
      <div>
        <TextArea value={result.head} disabled style={{height: '280px', margin: '0 0 5px 0'}} />
        <Button type="confirm" onClick={() => copyDirect(result.head)} last>复制head代码</Button>
        <TextArea value={result.body} disabled style={{height: '280px', margin: '5px 0'}} />
        <Button type="confirm" onClick={() => copyDirect(result.body)} last>复制body代码</Button>
      </div>
      
      <div style={{display: 'none'}}>
        <iframe srcDoc={html}  ref={iframeRef}/>
      </div>
    </div>
  )
}


```