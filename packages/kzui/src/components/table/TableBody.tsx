import * as React from 'react';
import classNames from 'classnames';
import { RowSelectionProps, TableProps } from './index';
import Checkbox from '../checkbox';
import { Radio } from '../radio';

const clsPrefix = 'kui-new-table';

const isSelected = (selectionId, selectionIds = []) => selectionIds?.indexOf(selectionId) > -1

const TableBody:React.FC<{
    dataSource: TableProps['dataSource'],
    onRowClick?: TableProps['onRowClick'],
    columns: TableProps['columns']
    style?: React.CSSProperties
    stripe?: boolean
    rowSelectable?: boolean
    rowSelection?: RowSelectionProps
    onSelect?:(rowIndex: number, rowKey: any, checked: boolean) => void
}> = ({
    dataSource = [],
    columns = [],
    style = {},
    onRowClick = () => null,
    stripe,
    rowSelectable,
    rowSelection,
    onSelect,
}) => {
    const { selectedRowKeys = [], type = 'checkbox', selectionKey = 'key', maxSelect } = rowSelection || {};

    return (
        <tbody className={`${clsPrefix}__body`}>
            {dataSource?.length ? dataSource?.map((data, index) => {
                const selected = isSelected(data[selectionKey], selectedRowKeys)
                return (
                    <tr
                        className={classNames(`${clsPrefix}__body-row`, { [`${clsPrefix}__body-row--stripped`]: stripe })}
                        onClick={() => {
                            onRowClick(data);
                        }}
                    >   
                        {
                            rowSelectable ? (
                                <td
                                    className={classNames(`${clsPrefix}__body-cell`, {[`${clsPrefix}__select-row-cell`]: rowSelectable })}
                                >
                                    {
                                        type === 'checkbox' &&
                                            <Checkbox   
                                                disabled={!selected && (typeof maxSelect === 'number' ? selectedRowKeys?.length >= maxSelect : false)}
                                                checked={selected}
                                                onChange={({ checked }) => onSelect?.(index, data[selectionKey], checked)}
                                            />
                                    }
                                    {
                                        type === 'radio' && <Radio
                                            checked={isSelected(data[selectionKey], selectedRowKeys)}
                                            onClick={(e) => {
                                                onSelect?.(index, data[selectionKey], !e.checked)
                                            }}
                                        />
                                    }
                                </td>
                            ) : null
                        }
                        {columns?.map((item) => {
                            // if (item.render) {
                            //     const component =
                            //         item.render( item.dataIndex ? {
                            //             data,
                            //             item: data[item.dataIndex],
                            //             index
                            //         } : {
                            //             data,
                            //             index
                            //         }) 
                            //     // @ts-ignore
                            //     const { children, props } = component || {}
                            //     console.log(props, 'render children props?')
                            //     if (children !== undefined) {
                            //         if (props?.colSpan === 0) {
                            //             return null;
                            //         }
                            //         return (
                            //             <td
                            //                 style={{ textAlign: item.align, ...style, width: item.width }}
                            //                 className={`${clsPrefix}__body-cell`}
                            //                 key={item.key}
                            //                 {...(props || {})}
                            //             >
                            //                 {children}
                            //             </td>
                            //         );
                            //     } else {
                            //         return (
                            //             <td
                            //                 style={{ textAlign: item.align, ...style, width: item.width }}
                            //                 className={`${clsPrefix}__body-cell`}
                            //                 key={item.key}
                            //             >
                            //                 {component}
                            //             </td>
                            //         )
                            //     }
                            // } 
                            // 简化上面的逻辑，解决 render 中使用 hook 会报错的问题。
                            const component =
                                item.render?.(item.dataIndex ? {
                                    data,
                                    item: data[item.dataIndex],
                                    index
                                } : {
                                    data,
                                    index
                                }) 
                            // @ts-ignore
                            const { props, children } = component || {}
                            return  props?.colSpan == 0 ? null : (
                                <td
                                    style={{ textAlign: item.align, ...style, width: item.width }}
                                    className={`${clsPrefix}__body-cell`}
                                    key={item.key}
                                    colSpan={props.colSpan}
                                    rowSpan={props.rowSpan}
                                >
                                    {
                                        item.render ? (
                                            (children || component)
                                        ) : data[item['dataIndex']]
                                    }
                                </td>
                            );
                        })}
                    </tr>
                )
            }) : null
            }
        </tbody>
    )
}

export default TableBody;

