import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Dialog from '../dialog/index';
import Button from '../button/index';
import './style.less';

interface ConfirmProps {
  hide?: boolean //是否隐藏,
  confirmText?: string //确认按钮文案,
  cancelText?: string //取消按钮文案
  onConfirm?: () => void //确认按钮回调,
  onCancel?: () => void //取消按钮回调
  onClose?: () => void // 关闭 icon 回调
  footer?: any
}


class Confirm extends KZUIComponent<ConfirmProps> {

    static defaultProps = {
        ...baseDefaultProps,
        hide: false,
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: null,
        onCancel: null,
    };

    constructor(props) {
        super(props);
        this.autoBind('handleCancelClick', 'handleConfirmClick', 'handleClose');
    }

    handleCancelClick() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    handleConfirmClick() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

    handleClose() {
        if (this.props.onClose) {
            this.props.onClose();
            return;
        }
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    render() {
        const clsPrefix = 'kui-confirm';
        const { className, style, hide, confirmText, cancelText, children, footer } = this.props;
        const cls = classNames(clsPrefix, className);

        let footerElement : JSX.Element | null = (
            <>
                <Button
                    type="normal"
                    size="large"
                    onClick={this.handleCancelClick}
                >
                    {cancelText}
                </Button>
                <Button
                    type="confirm"
                    size="large"
                    last
                    onClick={this.handleConfirmClick}
                >
                    {confirmText}
                </Button>
            </>
        )

        if (footer === null) {
            footerElement = null
        }

        if (footer) {
            footerElement = footer
        }

        return (
            <Dialog portal hide={hide} style={style} className={cls}>
                <i
                    className={`${clsPrefix}-close-btn kz-e-close-4`}
                    onClick={this.handleClose}
                    role="button"
                    tabIndex={0}
                />

                <div className={`${clsPrefix}-msg`}>
                    {children}
                </div>
                {footerElement}
            </Dialog>
        );
    }
}

export default Confirm;
