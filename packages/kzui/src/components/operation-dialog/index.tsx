import * as React from 'react';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Button from '../button/index';
import Dialog, { DialogProps } from '../dialog/index';

interface OperationDialogProps {
  hide?: boolean
  title?: string | React.ReactNode
  onConfirm?: () => void,
  onCancel?: () => void
  center?: boolean
  destoryOnClose?: boolean
  portal?: boolean
  actions?: Array<React.ReactNode>
}

interface OperationDialogStates {
  hide: boolean
}

class OperationDialog extends KZUIComponent<OperationDialogProps, OperationDialogStates> {
    
    static defaultProps = {
        ...baseDefaultProps,
        hide: true,
        title: '操作对话框',
        onConfirm: () => {},
        onCancel: () => {},
        style: {},
        center: false,
        destoryOnClose: false,
        portal: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            hide: props.hide,
        };
        this.autoBind('handleClick', 'handleCancel', 'handleConfirm');
    }

    initStateFromProps(props) {
        return {
            ...this.state,
            hide: props.hide,
        };
    }

    handleCancel() {
        this.setState({
            hide: true,
        }, () => {
            this.props.onCancel();
        });
    }

    handleConfirm() {
        this.setState({
            hide: true,
        });
        this.props.onConfirm();
    }

    render() {
        const { hide } = this.state;
        const { children, title, center, destoryOnClose, portal, actions } = this.props;

        let _actions: DialogProps['actions'] = [
                <Button
                    key="cancel"
                    size="large"
                    onClick={this.handleCancel}
                >
                    取消
            </Button>,
                <Button
                    key="confirm"
                    onClick={this.handleConfirm}
                    size="large"
                    type="confirm"
                    status="normal"
                >
                    确定
            </Button>,
        ];
        if (actions) {
            _actions = actions
        }

        const style: React.CSSProperties = {
            boxSizing: 'border-box',
            overflow: 'hidden',
            padding: 0,
            ...this.props.style
        };

        return (
            <Dialog
                title={title}
                hide={hide}
                actions={_actions}
                style={style}
                center={center}
                destoryOnClose={destoryOnClose}
                onClickOverLay={this.handleCancel}
                onClose={this.handleCancel}
                className={this.props.className}
                portal={portal}
            >
                {children}
            </Dialog>
        );
    }
}

export default OperationDialog;
