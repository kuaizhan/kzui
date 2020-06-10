import * as React from 'react';
import classNames from 'classnames';
import Pager from '../pager';
import Empty from '../empty';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
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
  pageSize: number
  totalPage: number //总页数,
  curPage: number //当前页面，页面从 1 开始
  onPageChange?: (value: number) => void //页码改变事件
  position?: 'left' | 'center' | 'right' // 分页的位置， 默认"center"
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
}) => {
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

    return (
        <>
            <table className={cls} style={style || {}}>
                {children || (
                    <>
                        {
                            showHeader ? (
                              <TableHeader columns={columns} style={headerStyle} />
                            ) : null
                        }
                        <TableBody
                          columns={columns}
                          dataSource={_dataSource}
                          style={bodyStyle}
                          onRowClick={onRowClick}
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
