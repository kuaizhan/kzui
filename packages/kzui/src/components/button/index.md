# Button 按钮组件


```jsx
/**
 * title: 按钮尺寸
 * desc: 按钮有特大、大、中、小四种尺寸。通过设置 size 为 huge large small 分别把按钮设为特大、大、小尺寸。若不设置 size，则尺寸为中。
 */


import React from 'react';
import { Button } from '@kzui/core';

export default () => (
  <>
    <Button size='small'>小型按钮</Button>
    <Button size='large'>大号按钮</Button>
    <Button size='huge'>特大按钮</Button>
  </>
);
```

```jsx
/**
 * title: 按钮类型
 * desc: 除了默认类型，按钮还有确认、危险、虚线边框。通过设置 type 为 confirm danger dashed 分别把按钮设为确认、危险、虚线边框类型。若不设置 type，则类型为普通。
 */


import React from 'react';
import { Button } from '@kzui/core';

export default () => (
  <>
    <Button type='confirm'>确认按钮</Button>
    <Button type='danger'>危险按钮</Button>
    <Button type='dashed'>虚线边框按钮</Button>
  </>
);
```

```jsx
/**
 * title: 按钮状态
 * desc: 除了默认类型，按钮还有loading，以及不可点击 disabled
 */


import React from 'react';
import { Button } from '@kzui/core';

export default () => (
  <>
    <Button status="normal">普通按钮</Button>
    <Button status='loading'>加载中...</Button>
    <Button disabled>不可点击</Button>
  </>
);
```

```jsx
/**
 * title: last
 * desc: 每个按钮都默认有margin，如果每个按钮是最后一个可以通过last来清除margin
 */


import React from 'react';
import { Button } from '@kzui/core';

export default () => (
  <div style={{ background: 'yellow', display: 'inline-block' }}>
    <Button>1</Button>
    <Button>2</Button>
    <Button last>3</Button>
  </div>
);
```


## 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |
------- | ------- | ------- | ------- | ------- | ------- |
type | enum | 按钮类型 | 否 | normal | normal 普通按钮; confirm 确认按钮; danger 删除按钮; dashed 虚线边框按钮|
size | enum | 按钮尺寸 | 否 | normal | normal 普通大小; small 小号; large 大尺寸; huge 超大尺寸 |
status | string | 按钮状态 | 否 | normal | normal 正常状态; loading 加载中; | 
last | bool | 是否为最后一个按钮, 用于清除多个按钮并排时最后一个margin | 否 | false | - |
disabled | bool | 是否禁用 | 否 | false | - |

## 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |  
------- | ------- | ------- | ------- | ------- | ------- |
onClick | (e: React.MouseEvent) => void | 按钮点击事件 | 否 | null | - |
