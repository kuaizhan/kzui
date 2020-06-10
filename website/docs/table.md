# Table - 表格


* Table

## 属性
## Table

| 参数 | 说明 | 类型 | 默认值 | 是否必须 |
| --- | --- | --- | --- | --- |
| tableLayout | 表格元素的 [table-layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout) 属性，设为 `fixed` 表示内容不会影响列的布局 | - \| `auto` \| `fixed` | `fixed` | 否 |
| bordered | 是否展示外边框和单元格边框 | boolean | false | 否 |
| columns | 表格列的配置描述，具体项见下表 | [ColumnProps](#Column)\[] | - | 是 |
| dataSource | 数据数组 | any\[] | - | 是 |
| pagination | 分页器，参考[配置项](#pagination)或，不设定配置时不展示和进行分页 | object | - | 否 |
| className | 自定义表格样式类名 | string | '' | 否 |
| bodyStyle | 自定义表格主体样式，作用于单元格 | React.CSSProperties | {} | 否 |
| headerStyle | 自定义表头样式，作用于单元格 | React.CSSProperties | {} | 否 |
| style | 自定义表格样式 | React.CSSProperties | {} | 否 |
| children | 覆盖默认的 table 标签内的元素 | React.ReactNode | - | 否 |
| onRowClick | 行点击事件 | (arg?: any) => void | () => null | 否 |
| showHeader | 是否展示表头 | boolean | true | 否 |

## Column

列描述数据对象，是 columns 中的一项。

| 参数 | 说明 | 类型 | 默认值 | 是否必须 |
| --- | --- | --- | --- | --- |
| align | 设置列的对齐方式 | `left` \| `right` \| `center` | `left` | 否 |
| colSpan | 表头列合并,设置为 0 时，不渲染 | number | 1 | 否 |
| dataIndex | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 | string | - | 是 |
| key | React 需要的 key | string | - | 是 |
| render | 生成复杂数据的渲染函数，参数分别为当前行数据，（当前行的值，如果有 dataIndex 的话)，行索引，@return 里面可以设置表格[行/列合并](#components-table-demo-colspan-rowspan) | Function({ data, item, index }) {} | - | 否 |
| title | 列头显示文字 | string | - | 是 |
| width | 列宽度 | string\|number | - | 否 |

## Pagination

分页器配置，基于Pager组件。

| 参数 | 说明 | 类型 | 默认值 | 是否必须 |
| --- | --- | --- | --- | --- |
| pageSize | 每页条数 | number | - | 是
| totalPage | 总页数 | number | - | 是 |
| curPage | 当前页面，页面从 1 开始 | number | 1 | 是 |
| onPageChange | 页码改变事件 | (value: number) => void | - | 否 |
| position | 分页的位置 | `left` \| `center` \| `right` |  `center` | 否