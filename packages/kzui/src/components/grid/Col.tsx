import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import './style.less';

interface ColProps {
  span?: number // 栅格占位数目，范围0~12 0->display:none,
  offset?: number // 栅格与左侧间隔的数目,
}

class Col extends KZUIComponent<ColProps> {
    static defaultProps = {
      ...baseDefaultProps,
      className: '',
      span: 1,
      style: {},
      offset: 0,
    }

    render() {
        const prefixCls = 'kui-col';
        const { style, offset, className } = this.props;
        const classname = classNames({
            [prefixCls]: true,
            [`${prefixCls}-${this.props.span}`]: true,
            [`${prefixCls}-offset-${this.props.offset}`]: !!offset,
        }, className);
        return (
            <div style={style} className={classname}>{this.props.children}</div>
        );
    }
}

export default Col;
