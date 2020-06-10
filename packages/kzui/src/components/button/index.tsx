import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import { UiSizeType } from '../../../types/base';
import './index.less';

interface ButtonProps {
    type?: 'normal' | 'confirm' | 'danger' | 'dashed'  //按钮类型
    size?: UiSizeType //按钮尺寸
    status?: 'normal' | 'loading' //按钮状态
    last?: boolean //是否为最后一个按钮, 用于清除多个按钮并排时最后一个margin
    disabled?: boolean //是否禁用
    onClick?: () => void //按钮点击事件
    loading?: boolean // 按钮的loading状态 是status的快捷用法
    shadow?: boolean // 是否有阴影
}

class Button extends KZUIComponent<ButtonProps> {

    static defaultProps = {
        ...baseDefaultProps,
        type: 'normal',
        status: 'normal',
        size: 'normal',
        shadow: false,
        disabled: false,
        last: false,
        onClick: null,
        loading: false,
    };

    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }

    handleClick() {
        if (this.props.onClick && !this.props.disabled) {
            // 组件为加载类型
            if (this.props.status === 'loading' || this.props.loading) return;
            this.props.onClick();
        }
    }

    render() {
        const prefixCls = 'kui-button';
        const { loading, className, style, shadow, type, size, status, disabled, children } = this.props;

        const cls = classNames({
            [prefixCls]: true,
            [`${prefixCls}-${type}`]: true,
            [`${prefixCls}-${size}`]: true,
            [`${prefixCls}-${status}`]: true,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}__shadow`]: shadow,
        }, className);
        // icon button
        let iconEl = null;
        switch (status) {
        case 'loading':
            iconEl = <i className={`${prefixCls}-load-icon kz-e-loading-button`} />;
            break;
        default:
            iconEl = null;
        }

        if (loading) {
            iconEl = <i className={`${prefixCls}-load-icon kz-e-loading-button`} />;
        }

        return (
            <button
                className={cls}
                onClick={this.handleClick}
                style={style}
            >
                { iconEl }
                {children}
            </button>
        );
    }
}

export default Button;
