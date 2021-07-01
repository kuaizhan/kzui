# Table - 表格

## 属性

```jsx
/**
 * title: 基本用法
 */
import React, { useState } from 'react';
import { Table } from '@kzui/core';

 const originDataSource = [
    {
        one: '1',
        two: '1',
        three: '2',
        key: 1,
    },
    {
        one: '2',
        two: '2',
        three: '3',
        key: 2,
    },
    {
        one: '3',
        two: '3',
        three: '4',
        key: 3,
    },
    {
        one: '3',
        two: '3',
        three: '4',
        key: 4,
    },
    {
        one: '3',
        two: '3',
        three: '4',
        key: 5,
    }
];
export default () => {
    const [dataSource, setDataSource] = useState(originDataSource)
    const columns = [
        {
            title: 'col 1',
            key: 'col 1',
            dataIndex: 'one',
        },
        {
            title: 'col 2',
            key: 'col 2',
            dataIndex: 'two',
            render: ({ item }) => {
                const [value, setValue] = useState(0)
                return <p onClick={() => setValue(value + 1)}>{value}</p>
            }
        },
        {
            title: 'col 3',
            key: 'col 3',
            dataIndex: 'three',
            render: ({ data, item }) => {
                return { 
                    children: <p>{item}666</p>,
                    props: { colSpan: 2 }
                }
            }
        }
    ];

    const [selectedKeys, setSelectedKeys] = useState([])
    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                strip
                bordered
                rowSelectable
                rowSelection={{
                    selectedRowKeys: selectedKeys,
                    onChange: ({ selectedRowKeys }) => {
                        setSelectedKeys(selectedRowKeys)
                    },
                    type: 'checkbox'
                    // maxSelect: 3
                }}
            />
            <div onClick={() => setDataSource(source => source.slice(0, 4))}>删掉一条数据</div>
        </div>
    );
}

```

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
| stripe | 是否使用隔行样式 | boolean | false | 否 | 
| rowSelectable | 是否开启行选择 | boolean | false | 否 |
| rowSelection | 行选择的配置描述，具体项见下表 | [RowSelectionProps](#rowselection)\[] | - | 否 |
## Column

列描述数据对象，是 columns 中的一项。

| 参数 | 说明 | 类型 | 默认值 | 是否必须 |
| --- | --- | --- | --- | --- |
| align | 设置列的对齐方式 | `left` \| `right` \| `center` | `left` | 否 |
| colSpan | 表头列合并,设置为 0 时，不渲染 | number | 1 | 否 |
| dataIndex | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 | string | - | 是 |
| key | React 需要的 key | string | - | 是 |
| render | 生成复杂数据的渲染函数，参数分别为当前行数据，（当前行的值，如果有 dataIndex 的话)，行索引，@return 里面可以设置表格行/列合并，看示例) | Function({ data, item, index }) {} | - | 否 |
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
| size | 分页尺寸 | `normal` \| `small` | `normal` | 否

## RowSelection

行选择配置。

| 参数 | 说明 | 类型 | 默认值 | 是否必须 |
| --- | --- | --- | --- | --- |
| selectionKey | 根据每行数据中的哪个字段来表示该行被选中，相当于选中行id | string | 'key' | 否
| selectedRowKeys | 选中行的 `data[selectionKey]` 的集合，完全受控 | any[] | [] | 是 |
| type | 当前页面，页面从 1 开始 | `checkbox` \| `radio` | `checkbox` | 否 |
| maxSelect | 当 type 为多选时，最多可以选中的行数 | number | - | 否 |
| onChange | 选中或取消选中行的回调 | (args: { selectedRowKeys: RowSelectionProps['selectedRowKeys'], selectedRows: TableProps['dataSource'] }) => void | - | 否 |
