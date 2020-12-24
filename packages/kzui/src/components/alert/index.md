# Alert 提示组件


```jsx
/**
 * title: 按钮尺寸
 * desc: 按钮有特大、大、中、小四种尺寸。通过设置 size 为 huge large small 分别把按钮设为特大、大、小尺寸。若不设置 size，则尺寸为中。
 */


import React, { useState } from 'react';
import { Button, Alert, notification } from '@kzui/core';

export default () => {
    const [visible, setVisble] = useState(false)
    return (
        <>
            <Button onClick={() => setVisble(true)}>打开alert</Button>
            <Alert
                hide={!visible}
                buttonText="关闭alert"
                onClick={() => {
                    setVisble(false)
                    notification.success('点击成功')
                }}
            >duck最棒了!</Alert>
        </>
    );
}
```


## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
hide | bool | 是否隐藏 | 否 | false | - |
buttonText | string | 显示内容 | 否 | 确定 | － |
onClick | func | 点击回调 | 否 | () => {} | - |
childern | React.ReactNode | 弹框内容 | 否 | undefined | - |

