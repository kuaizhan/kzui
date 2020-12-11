# Tab - tab导航

## export
* Tab
* TabBar

```jsx
/**
 * title: 基本用法
 */
import React, { useState } from 'react'
import { Tab } from '@kzui/core'

export default () => {
    const [curTab, setCurTab] = useState(0)
    return (
        <Tab
            tabTitles={['tab 1', 'tab 2', 'tab 3']}
            curIndex={curTab}
            onChange={curIndex => setCurTab(curIndex)}
        >
            <div>tab 1 的内容</div>
            <div>tab 2 的内容</div>
            <div>tab 3 的内容</div>
        </Tab>
    )
}

```

## Tab 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |
------- | ------- | ------- | ------- | ------- | ------- |
tabTitles | array[string] | 标题列表 | 否 | [] | - |
curIndex | number | 选中tab序号 | 否 | 0 | - |
tabStyle | React.CSSProperties | tab样式 | 否 | {} | - |
tabBarStyle | React.CSSProperties | 每个tabBar的样式 | 否 | {} | - |
tabPanelStyle | React.CSSProperties | tabPanel 样式 | 否 | {} | - |
defaultIndex? | number | 默认选中的tab序号 | 否 | 0 | - |

## Tab 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 切换事件 | 否 | null | 参数是tabIndex |


## TabBar 属性

属性名 | 类型 | 描述 | 是否必须 | 默认值 | 字典 |
------- | ------- | ------- | ------- | ------- | ------- |
tabTitles | array[string] | 标题列表 | 否 | [] | - |
curIndex | number | 选中tab序号 | 否 | 0 | - |
type | \|`normal` \| `card` | tab 类型 | 否 | `normal` | \|`normal` \| `card` |
tabBarStyle | React.CSSProperties | 每个tabBar的样式 | 否 | {} | - |

## TabBar 事件
属性名 | 类型 | 描述 | 是否必须 | 默认值 | 事件处理函数说明 |
------- | ------- | ------- | ------- | ------- | ------- |
onChange | func | 切换事件 | 否 | null | 参数是tabIndex |
