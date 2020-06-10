import * as React from 'react';
import { render } from 'react-dom';
import PromptContainer from './PromptContainer';
import './style.less';

let promptInst = null;

interface PromptType {
  alert: (msg?: string | React.ReactNode, onConfirm?: () => void, buttonText?: string) => void,
  confirm: (msg?: string | React.ReactNode, onConfirm?: () => void, onCancel?: () => void, confirmText?: string, cancelText?: string) => void
}

const getPromptInst = () => {
    if (!promptInst) {
        const div = document.createElement('div');
        document.body.appendChild(div);
        promptInst = render(<PromptContainer />, div);
    }

    return promptInst;
};

const prompt: PromptType = {
    alert: (msg, onConfirm, buttonText) => {
        const inst = getPromptInst();
        inst.add({
            msg,
            onConfirm,
            type: 'alert',
            buttonText,
        });
    },
    confirm: (msg, onConfirm, onCancel, confirmText, cancelText) => {
        const inst = getPromptInst();
        inst.add({
            msg,
            onConfirm,
            onCancel,
            type: 'confirm',
            confirmText,
            cancelText,
        });
    },
};


export default prompt;
