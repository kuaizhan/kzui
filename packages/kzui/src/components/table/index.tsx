import * as React from 'react';
import classNames from 'classnames';
import Pager from '../pager';
import Empty from '../empty';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import produce from 'immer'
import './style.less';

// https://ant.design/components/table-cn/#components-table-demo-colspan-rowspan 行合并、列合并的例子
export interface ColumnsProps {
  title: string | React.ReactNode,  // 列标题（列表头内容）
  key: string,    // React map 时需要的 key
  dataIndex?: string, // 列数据在数据项中对应的 key
  render?: (props: {data?: any, item?: any, index?: number}) => React.ReactNode | { children: React.ReactNode, props?: any },   // 生成复杂数据的渲染函数，参数分别为当前行数据，(当前行的值，如果有 dataIndex 的话)行索引，@return 里面可以设置表格行/列合并
  align?: 'left' | 'center' | 'right',    // TODO 设置列的对齐方式
  colSpan?: number, // 表头列合并,设置为 0 时，不渲染
  width?: string | number, // 列宽度
}

export interface PaginationProps {
  pageSize?: number
  totalPage: number //总页数,
  curPage: number //当前页面，页面从 1 开始
  onPageChange?: (value: number) => void //页码改变事件
  position?: 'left' | 'center' | 'right' // 分页的位置， 默认"center"
  size?: 'normal' | 'small'
}

export interface RowSelectionProps {
    selectionKey?: string // 根据行数据中的哪个字段来表示该行被选中
    selectedRowKeys: any[]   // 选中行的 data[selectionKey] 的集合
    onChange?: (value: {
        selectedRowKeys: RowSelectionProps['selectedRowKeys'],
        selectedRows: TableProps['dataSource'] // 选中行的全部数据
    }) => void
    type?: 'checkbox' | 'radio'
    maxSelect?: number
}
export interface TableProps {
    columns?: Array<ColumnsProps>, // 每一列的属性
    dataSource?: Array<any> // 数据源
    headerStyle?: React.CSSProperties, // thead 中每一个单元格的样式
    bodyStyle?: React.CSSProperties,    // tbody 中每一个单元格样式
    bordered?: boolean, // 表格是否带完整边框
    className?: string, // 自定义 className
    tableLayout?: 'auto' | 'fixed', // 单元格的宽度是否随内容变化，fixed 为固定宽度，auto 则会变化
    pagination?: PaginationProps // 分页
    style?: React.CSSProperties // 自定义表格样式
    children?: React.ReactNode // 替换掉整个表格内容
    onRowClick?: (arg?: any) => void // 行点击事件
    showHeader?: boolean
    stripe?: boolean // 是否使用隔行样式
    rowSelection?: RowSelectionProps // 行选择配置
    rowSelectable?: boolean // 是否开启行选择
}

const clsPrefix = 'kui-new-table';
const compatiblePrefix = 'kui-table--compatible';
const Table:React.FC<TableProps> = ({
    columns = [],
    dataSource = [],
    headerStyle = {},
    bodyStyle = {},
    bordered = false,
    className = '',
    tableLayout = 'fixed',
    pagination,
    style = {},
    children = null,
    onRowClick = () => null,
    showHeader = true,
    stripe = false,
    rowSelectable = false,
    rowSelection = {
        type: 'checkbox', 
        selectionKey: 'key',
        selectedRowKeys: [],
    }
}) => {
    const { selectionKey = 'key', selectedRowKeys = [], maxSelect, type = 'checkbox' } = rowSelection || {}
    const [selectedRows, setSelectedRows] = React.useState([]);
    const { pageSize, curPage } = typeof pagination === 'object' && pagination;
    const _dataSource = (
        typeof pagination === 'object' &&
        curPage &&
        dataSource.length > pageSize
    ) ? (
            dataSource.slice((curPage - 1) * pageSize, curPage * pageSize)
        ) : [...dataSource];

    const cls = children ? classNames(
        className,
        compatiblePrefix,
    ) : classNames(
        clsPrefix,
        className,
        { [`${clsPrefix}--bordered`]: bordered },
        [`${clsPrefix}--tb-layout-${tableLayout}`],
    )

    React.useEffect(() => {
        if (selectedRowKeys?.length !== selectedRows?.length) {
            console.log(selectedRowKeys, selectedRows, '外部改变 selectedRowKeys，改变 selectedRows')
            if (selectedRows?.length > selectedRowKeys?.length) {
                setSelectedRows(selectedRows?.filter(row => selectedRowKeys.indexOf(row[selectionKey]) > -1))
            } else {
                const newSelectedRows = [...selectedRows]
                selectedRowKeys.forEach(rowKey => {
                    if (!selectedRows.find(row => row[selectionKey] === rowKey)) {
                        newSelectedRows.push(dataSource?.find(item => item[selectionKey] === rowKey))
                    }
                })
                setSelectedRows(newSelectedRows)
            }
        }
    }, [selectedRowKeys])

    function handleSelect(index, rowKey, checked) {
        if (!rowSelectable) return
        let newSelectedRowKeys = []
        let newSelectedRows = []
        // 单选
        if (type === 'radio') {
            newSelectedRowKeys = [rowKey]
            newSelectedRows = [dataSource[index]]
        }

        //多选
        if (type === 'checkbox') {
            newSelectedRowKeys = produce(selectedRowKeys || [], draftState => {
                const originIndex = selectedRowKeys?.indexOf(rowKey)
                if (checked && originIndex < 0) {
                    draftState.push(rowKey)
                } else {
                    draftState.splice(originIndex, 1)
                }
            })
            newSelectedRows = produce(selectedRows || [], draftState => {
                const originIndex = selectedRows?.findIndex(row => row[selectionKey] === rowKey)
                if (checked && originIndex < 0) {
                    draftState.push(dataSource[index])
                } else {
                    draftState.splice(originIndex, 1)
                }
            })
        }

        setSelectedRows(newSelectedRows)
        rowSelection?.onChange?.({
            selectedRowKeys: newSelectedRowKeys,
            selectedRows: newSelectedRows,
        })
    }

    const dataSourceSelectedLength = React.useMemo(() => {
        return dataSource?.reduce((dataSourceSelectedLength, item) => {
            if (selectedRowKeys.indexOf(item[selectionKey]) > -1) {
                dataSourceSelectedLength += 1
            }
            return dataSourceSelectedLength
        }, 0)
    }, [dataSource, selectedRowKeys, selectionKey])
    const isSelectedAll = dataSourceSelectedLength === dataSource?.length
    // 选择要考虑到多页数据的情况
    function handleSelectAll() {
        if (isSelectedAll) {
            // 应该在 selectedRows、selectedRowKeys 里去掉当前 datasource 的items
            setSelectedRows(selectedRows => {
                const filteredSelectedRows = selectedRows.filter(item => !dataSource.find(dataItem => dataItem[selectionKey] === item[selectionKey]))
                const _selectedRowKeys = filteredSelectedRows.map(item => item[selectionKey])
                rowSelection?.onChange?.({
                    selectedRowKeys: _selectedRowKeys,
                    selectedRows: filteredSelectedRows,
                })
                return filteredSelectedRows 
            })
        } else {
            setSelectedRows(selectedRows => {
                const filledSelectedRow = [...selectedRows]
                const filledSelectedRowKeys = [...selectedRowKeys]
                dataSource?.forEach(dataItem => {
                    if (selectedRowKeys.indexOf(dataItem[selectionKey]) === -1) {
                        filledSelectedRow.push(dataItem)
                        filledSelectedRowKeys.push(dataItem[selectionKey])
                    }
                })
                rowSelection?.onChange?.({
                    selectedRowKeys: filledSelectedRowKeys,
                    selectedRows: filledSelectedRow,
                })
                return filledSelectedRow
            })
        }
    }

    return (
        <>
            <table className={cls} style={style || {}}>
                {children || (
                    <>
                        {
                            showHeader ? (
                                <TableHeader
                                    columns={columns}
                                    style={headerStyle}
                                    rowSelectable={rowSelectable}
                                    rowSelection={rowSelection}
                                    onSelectAllClick={handleSelectAll}
                                    selectedAll={isSelectedAll}
                                    // partialSelected={selectedRowKeys?.length > 0 && dataSource?.length !== selectedRowKeys?.length}
                                    selectAllDisable={typeof maxSelect === 'number' ? dataSource?.length > maxSelect : false}
                                />
                            ) : null
                        }
                        <TableBody
                            columns={columns}
                            dataSource={_dataSource}
                            style={bodyStyle}
                            onRowClick={onRowClick}
                            stripe={stripe}
                            rowSelectable={rowSelectable}
                            rowSelection={rowSelection}
                            onSelect={handleSelect}
                        />
                    </>
                )}
            </table>
            {
                !dataSource.length && !children && <Empty />
            }
            {pagination && (
                <div
                    className={`${clsPrefix}__pagination`}
                    style={pagination.position ? { textAlign: pagination.position } : {}}
                >
                    <Pager {...pagination} />
                </div>
            )}
        </>
    );
};

export default Table;
