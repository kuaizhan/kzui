import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Dialog from '../dialog/index';
import Button from '../button/index';
import './style.less';

interface AlertProps {
    hide?: boolean //是否隐藏,
    buttonText?: string //显示内容,
    onClick?: () => void //点击回调
    position?: string
}

export default class Alert extends KZUIComponent<AlertProps> {

    static defaultProps = {
        ...baseDefaultProps,
        onClick: () => {},
        hide: false,
        buttonText: '确定',
    }

    render() {
        const clsPrefix = 'kui-alert';
        const { className, style, position, hide, children, buttonText, onClick } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-${position}`]: !!position,
        }, className);
        return (
            <Dialog portal hide={hide} style={style} className={cls}>
                <div className={`${clsPrefix}-msg`}>
                    {children}
                </div>
                <Button
                    type="confirm"
                    last
                    onClick={onClick}
                >
                    {buttonText}
                </Button>
            </Dialog>
        );
    }
}