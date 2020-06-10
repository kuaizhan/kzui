# Tab - tab导航

## export
* Tab
* TabBar

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
