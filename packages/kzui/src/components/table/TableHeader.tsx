import * as React from 'react';
import classNames from 'classnames';
import Checkbox from '../checkbox';
import { ColumnsProps, TableProps } from './index';

const clsPrefix = 'kui-new-table';

const TableHeader:React.FC<{
  columns: ColumnsProps[]
  style?: React.CSSProperties
  rowSelectable?: boolean
  rowSelection?: TableProps['rowSelection']
  selectedAll?: boolean
  partialSelected?: boolean
  onSelectAllClick?: () => void
  selectAllDisable?: boolean
}> = ({
  columns = [],
  style = {},
  rowSelectable,
  rowSelection,
  selectedAll,
  partialSelected,
  onSelectAllClick,
  selectAllDisable,
}) => {
  const  { type = 'checkbox' } = rowSelection || {}
  return (
    <div className={`${clsPrefix}__header-container`}>
        <table>
            <colgroup>
                {columns?.map(column => <col style={column?.width ? { width: column?.width } : {}} />)}
            </colgroup>
            <thead className={`${clsPrefix}__header`}>
                {
                rowSelectable ? <th
                    className={classNames(`${clsPrefix}__header-cell`, {[`${clsPrefix}__select-all-cell`]: rowSelectable })}
                    style={{ ...style }}
                >
                    { type === 'checkbox' && 
                        <Checkbox disabled={selectAllDisable} checked={selectedAll} onChange={onSelectAllClick}/>
                    }
                </th> : null
                }
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
        </table>
    </div>
  )
}

export default TableHeader;
