import * as React from 'react';
import classNames from 'classnames';
import './style.less';
// @ts-ignore
const EmptyImage = require('./images/empty-image.jpg')

export interface EmptyProps {
  emptyText?: string
  style?: React.CSSProperties,
  className?: string,
  emptyImg?: string
}

const clsPrefix = 'kui-empty-status';

const Empty: React.FC<EmptyProps> = ({
  emptyText,
  emptyImg,
  className = '',
  style = {}
}) => {
  const cls = classNames(clsPrefix, className)
  return (
    <div className={cls} style={style}>
      <div className={`${clsPrefix}__image`}>
        <img src={emptyImg || EmptyImage} alt="" />
      </div>
      <p className={`${clsPrefix}__text`}>{emptyText || '暂无数据'}</p>
    </div>
  );
}

export default Empty;