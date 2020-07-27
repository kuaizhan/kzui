import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import PopTip from '../poptip';
import './style.less';

interface TooltipProps {
  trigger?: 'hover' | 'click'
  tip?: React.ReactNode
  tipStyle?: React.CSSProperties
  placement?: 'left' | 'right' | 'top' | 'bottom'
  theme?: 'dark' | 'light'
}

class Tooltip extends KZUIComponent<TooltipProps> {
    static defaultProps = {
      ...baseDefaultProps,
      trigger: 'hover',
      children: null,
      tip: '',
      placement: 'bottom',
      theme: 'dark',
      tipStyle: {}
    }

    render() {
        const clsPrefix = 'kui-tooltip';
        const { className, style, tip, children, placement, trigger, theme, tipStyle } = this.props;
        const cls = classNames(clsPrefix, className);

        return (
            <PopTip
                tip={tip}
                placement={placement}
                trigger={trigger}
                theme={theme}
                style={style}
                className={cls}
                tipStyle={tipStyle}
            >
                {children}
            </PopTip>
        );
    }
}

export default Tooltip;
