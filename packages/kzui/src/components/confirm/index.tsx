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
        this.autoBind('handleCancelClick', 'handleConfirmClick');
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

    render() {
        const clsPrefix = 'kui-confirm';
        const { className, style, hide, confirmText, cancelText, children } = this.props;
        const cls = classNames(clsPrefix, className);
        return (
            <Dialog portal hide={hide} style={style} className={cls}>
                <i
                    className={`${clsPrefix}-close-btn kz-e-close-4`}
                    onClick={this.handleCancelClick}
                    role="button"
                    tabIndex={0}
                />

                <div className={`${clsPrefix}-msg`}>
                    {children}
                </div>
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
            </Dialog>
        );
    }
}

export default Confirm;
