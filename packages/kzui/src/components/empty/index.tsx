import * as React from 'react';
import classNames from 'classnames';
import './style.less';
import { KZUIComponent } from '../../../types/base';

export interface EmptyProps extends KZUIComponent {
  emptyText?: string | React.ReactNode
  emptyImg?: string
  imgStyle?: React.CSSProperties
}

const clsPrefix = 'kui-empty-status';

const Empty: React.FC<EmptyProps> = ({
  emptyText,
  emptyImg,
  className = '',
  style = {},
  imgStyle = {},
  children
}) => {
  const cls = classNames(clsPrefix, className)
  return (
    <div className={cls} style={style}>
      <div className={`${clsPrefix}__image`}>
        <img src={emptyImg} alt="" style={imgStyle} />
      </div>
      <p className={`${clsPrefix}__text`}>{emptyText || '暂无数据'}</p>
      {children}
    </div>
  );
}

export default Empty;