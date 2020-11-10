import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Alert from '../alert';
import Confirm from '../confirm';
import './style.less';

interface PromptItemProps {
  type: 'alert' | 'confirm',
  msg?: string,
  onConfirm?: () => void,
  onCancel?: () => void,
  confirmText?: string,
  cancelText?: string,
  key: number,
  buttonText?: string
  onClose?: () => void
}

interface PromptContainerStates {
  prompts: PromptItemProps[]
}

class PromptContainer extends KZUIComponent<{}, PromptContainerStates> {
    keyIndex: number;

    static defaultProps ={
      ...baseDefaultProps,
      className: '',
      style: {},
    }

    constructor(props) {
        super(props);
        this.autoBind('add', 'remove');
        this.state = {
            prompts: [],
        };
        this.keyIndex = 0;
    }
    add(opt) {
        const newPrompt = {
            ...opt,
            key: this.keyIndex += 1,
        };

        this.setState({
            prompts: [...this.state.prompts, newPrompt],
        });
    }

    remove(key) {
        const newPrompts = [];
        this.state.prompts.forEach((cur) => {
            if (cur.key !== key) {
                newPrompts.push(cur);
            }
        });

        this.setState({
            prompts: newPrompts,
        });
    }

    render() {
        const clsPrefix = 'kui-prompt';
        const { className, style } = this.props;
        const { prompts } = this.state;
        const cls = classNames(clsPrefix, className);
        return (
            <div className={cls} style={style}>
                {
                    prompts.map(({
                        type,
                        msg,
                        onConfirm,
                        onCancel,
                        confirmText,
                        cancelText,
                        key,
                        buttonText,
                        onClose
                    }, index) => {
                        switch (type) {
                        case 'alert': {
                            return (
                                <Alert
                                    key={index}
                                    onClick={() => {
                                        if (onConfirm) {
                                            onConfirm();
                                        }
                                        this.remove(key);
                                    }}
                                    buttonText={buttonText}
                                >
                                    {msg}
                                </Alert>
                            );
                        }
                        case 'confirm': {
                            return (
                                <Confirm
                                    key={index}
                                    onConfirm={() => {
                                        if (onConfirm) {
                                            onConfirm();
                                        }
                                        this.remove(key);
                                    }}
                                    onCancel={() => {
                                        if (onCancel) {
                                            onCancel();
                                        }
                                        this.remove(key);
                                    }}
                                    confirmText={confirmText}
                                    cancelText={cancelText}
                                    onClose={() => {
                                        if (onClose) {
                                            onClose();
                                        }
                                        this.remove(key);
                                    }}
                                >
                                    {msg}
                                </Confirm>
                            );
                        }
                        default: {
                            return null;
                        }
                        }
                    })
                }
            </div>
        );
    }
}

export default PromptContainer;
