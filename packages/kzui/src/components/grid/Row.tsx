import  * as React from 'react';
import { Children, cloneElement } from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import './style.less';


interface RowProps {
  gutter?: number // 两个栅格之间的间距 //Number
}

class Row extends KZUIComponent<RowProps> {
    static defaultProps = {
        ...baseDefaultProps,
        className: '',
        gutter: 0,
        children: [],
        style: {},
    };

    render() {
        const prefixCls = 'kui-row';
        const { gutter, children, className, style } = this.props;
        const classname = classNames({
            [prefixCls]: true,
        }, className);
        const cols = gutter ? Children.map(children, (col: React.ReactElement) => (
            cloneElement(col, {
                style: {
                    paddingLeft: gutter / 2,
                    paddingRight: gutter / 2,
                    ...col.props.style,
                },
            })
        )) : children;
        return (
            <div className={classname} style={style} >{cols}</div>
        );
    }
}

export default Row;
