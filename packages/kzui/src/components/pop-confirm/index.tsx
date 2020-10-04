import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Button from '../button';
import PopTip from '../poptip';
import './style.less';

interface PopConfirmProps {
  status?: 'normal' | 'loading' //确认按钮状态
  onConfirm?: (e?: Event) => void //确认回调,
  onCancel?: (e?: Event) => void //取消回调,
  onBlur?: () => void //失焦回调
  title?: React.ReactNode | string
  placement?: 'left' | 'right' | 'top' | 'bottom'
}

interface PopConfirmStates {
    visible: boolean
}

class PopConfirm extends KZUIComponent<PopConfirmProps, PopConfirmStates> {
    
    static defaultProps = {
        ...baseDefaultProps,
        onBlur: () => null,
        onCancel: () => null,
        onConfirm: () => null,
        status: 'normal',
        placement: 'right',
    }

    constructor(props) {
        super(props);
        this.autoBind(
            'handleConfirm',
            'handleCancel',
            'handleClick',
        );
        this.state = {
            visible: false,
        };
    }

    handleConfirm(e) {
        e.stopPropagation();
        this.setState({ visible: false });
        if (this.props.onConfirm) {
            this.props.onConfirm(e);
        }
    }

    handleCancel(e) {
        e.stopPropagation();
        this.setState({ visible: false });
        if (this.props.onCancel) {
            this.props.onCancel(e);
        }
    }

    render() {
        const clsPrefix = 'kui-popconfirm';
        const { visible } = this.state;
        const { className, style, children, title, placement } = this.props;
        const contentWrapCls = classNames(`${clsPrefix}-content-inner`, className);

        return (
            <PopTip
                theme="light"
                trigger="click"
                style={style}
                placement={placement}
                visible={visible}
                className={clsPrefix}
                onVisibleChange={visibleValue => this.setState({ visible: visibleValue })}
                tip={
                    <div className={contentWrapCls}>
                        <div className={`${clsPrefix}-intro`}>
                            {title}
                        </div>
                        <div className={`${clsPrefix}-buttons`}>
                            <Button size="small" onClick={this.handleCancel}>取消</Button>
                            <Button
                                size="small"
                                onClick={this.handleConfirm}
                                type="confirm"
                                status={this.props.status}
                                className={`${clsPrefix}-confirm-btn`}
                            >
                                确定
                            </Button>
                        </div>
                    </div>
                }
            >
                {children}
            </PopTip>
        );
    }
}

export default PopConfirm;
