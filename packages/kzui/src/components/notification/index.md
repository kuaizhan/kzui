# notification 消息通知

```jsx
/**
 * title: 调用式的消息通知组件
 */


import React from 'react';
import { notification, Button } from '@kzui/core';

export default () => {
    return (
          <>
            <Button onClick={() => notification.success('success')}>success</Button>
            <Button onClick={() => notification.warn('warn')}>warn</Button>
            <Button onClick={() => notification.error('error')}>error</Button>
        </>
    )
}
```


