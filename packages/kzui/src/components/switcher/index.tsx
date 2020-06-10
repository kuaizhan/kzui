import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import './style.less';

interface SwitcherProps {
  titles: string[],
  curIndex: number,
  onChange: (index: number) => void,
  style: React.CSSProperties,
  className: string,
  itemStyle: React.CSSProperties,
  itemClassName: string,
}

class Switcher extends KZUIComponent<Partial<SwitcherProps>> {
    static defaultProps = {
      ...baseDefaultProps,
      titles: [],
      curIndex: 0,
      onChange: null,
      style: {},
      className: '',
      itemStyle: {},
      itemClassName: '',
    }

    constructor(props) {
        super(props);
        this.autoBind('handleChange');
    }

    handleChange(index) {
        if (this.props.onChange) {
            this.props.onChange(index);
        }
    }

    render() {
        const clsPrefix = 'kui-switcher';
        const { className, style, itemStyle, itemClassName, titles, curIndex } = this.props;
        const cls = classNames(clsPrefix, className);

        return (
            <div className={cls} style={style}>
                {
                    titles.map((title, index) => (
                        <div
                            role="presentation"
                            key={index}
                            style={itemStyle}
                            onClick={() => this.handleChange(index)}
                            className={index === curIndex ?
                                `${clsPrefix}-item ${clsPrefix}-cur ${itemClassName}`
                                : `${clsPrefix}-item ${itemClassName}`}
                        >
                            {title}
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Switcher;
