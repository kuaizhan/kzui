import * as React from 'react';
import { TableProps } from './index';

const clsPrefix = 'kui-new-table';

const TableBody:React.FC<{
  dataSource: TableProps['dataSource'],
  onRowClick?: TableProps['onRowClick'],
  columns: TableProps['columns']
  style?: React.CSSProperties
}> = ({
  dataSource = [],
  columns = [],
  style = {},
  onRowClick = () => null
}) => {
  return (
    <tbody className={`${clsPrefix}__body`}>
        {dataSource.length ? dataSource.map((data, index) => (
            <tr
                className={`${clsPrefix}__body-row`}
                onClick={() => {
                    onRowClick(data);
                }}
            >
                {columns.map((item) => {
                    if (item.render) {
                        const component = item.dataIndex ?
                            item.render({ data, item: data[item.dataIndex], index }) :
                            item.render({ data, index });
                        // @ts-ignore
                        const { children, props } = component
                        if (children !== undefined) {
                            if (props?.colSpan === 0) {
                                return null;
                            }
                            return (
                                <td
                                    style={{ textAlign: item.align, ...style, width: item.width }}
                                    className={`${clsPrefix}__body-cell`}
                                    key={item.key}
                                    {...props}
                                >
                                    {children}
                                </td>
                            );
                        } else {
                            return (
                                <td
                                    style={{ textAlign: item.align, ...style }}
                                    className={`${clsPrefix}__body-cell`}
                                    key={item.key}
                                >
                                    {component}
                                </td>
                            )
                        }
                    } 
                    return (
                        <td
                            style={{ textAlign: item.align, ...style }}
                            className={`${clsPrefix}__body-cell`}
                            key={item.key}
                        >
                            {data[item['dataIndex']]}
                        </td>
                    );
                })}
            </tr>
        )) : null
        }
    </tbody>
  )
}

export default TableBody;