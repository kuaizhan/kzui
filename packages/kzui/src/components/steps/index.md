# Steps - 步骤导航组件

```jsx
/**
 * title: 步骤导航组件基本用法
 */


import React from 'react';
import { Steps, Button } from '@kzui/core';

export default () => {
    const [step, setStep] = React.useState(1)
    return (
        <>
            <Steps size={"normal"} curStep={step} stepTitles={['step1', 'step2']}>
            <div style={{border: '1px solid #000'}}>content1</div>
            <div style={{border: '1px solid #000'}}>content2</div>
            </Steps>
            <Button style={{marginTop: '10px'}} onClick={() => setStep(2)}>下一步</Button>
        </>
    )
}
```

* Steps

## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
size | enum | 尺寸 | 否 | normal | normal 普通大小；small 小号 |
curStep | number | 当前步骤 | 否 | 1 | - |
stepTitles | array | 标题 | 否 | － | - |
children | array | 子节点 | 否 | － | - |
