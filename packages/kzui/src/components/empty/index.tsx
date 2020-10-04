import * as React from 'react';
import classNames from 'classnames';
import './style.less';
import { KZUIComponent } from '../../../types/base';

export interface EmptyProps extends KZUIComponent {
  emptyText?: string
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
        <img src={emptyImg} alt="" />
      </div>
      <p className={`${clsPrefix}__text`}>{emptyText || '暂无数据'}</p>
    </div>
  );
}

export default Empty;