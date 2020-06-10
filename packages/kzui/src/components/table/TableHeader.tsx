import * as React from 'react';
import { ColumnsProps } from './index';

const clsPrefix = 'kui-new-table';

const TableHeader:React.FC<{
  columns: ColumnsProps[]
  style?: React.CSSProperties
}> = ({
  columns = [],
  style = {}
}) => {
  return (
    <thead className={`${clsPrefix}__header`}>
        {
            columns?.map(column => (
                column.colSpan !== 0 ? (
                    <th
                        style={{ textAlign: column.align, width: column.width, ...style }}
                        className={`${clsPrefix}__header-cell`}
                        key={column.key}
                        colSpan={column.colSpan}
                    >
                        {column.title}
                    </th>
                ) : null
            ))
        }
    </thead>
  )
}

export default TableHeader;
