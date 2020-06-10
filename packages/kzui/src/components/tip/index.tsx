import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Icon from '../icon/index';
import { TipType } from '../../../types/base';
import './style.less';

interface TipProps {
  type?: TipType
  hideIcon?: boolean
}

const iconClassMap = {
    inline: 'kz-e-help',
    info: 'kz-e-warn2',
    warn: 'kz-e-warn2',
    error: 'kz-e-error-solid',
    success: 'kz-e-success-solid',
};

class Tip extends KZUIComponent<TipProps> {

    static defaultProps = {
        ...baseDefaultProps,
        type: 'inline',
        hideIcon: false
    };
    render() {
        const clsPrefix = 'kui-tip';
        const { className, style, type, children, hideIcon } = this.props;
        const cls = classNames(clsPrefix, `${clsPrefix}-${type}`, className);

        const iconClass = iconClassMap[type];
        return (
            <div
                className={cls}
                style={style}
            >
                {hideIcon ? null : <Icon iconClass={iconClass} />}
                <span className={`${clsPrefix}-text`}>{children}</span>
            </div>
        );
    }
}

export default Tip;
