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
    return new Promise((resolve) => {
        if (!promptInst) {
            const div = document.createElement('div');
            document.body.appendChild(div);
            render(
                <PromptContainer ref={el => {
                    promptInst = el
                    resolve()
                }} />,
                div
            )
        } else {
            resolve()
        }
    })
};

const prompt: PromptType  = {
    alert: (msg, onConfirm, buttonText) => {
        getPromptInst().then(() => {
            promptInst.add({
                msg,
                onConfirm,
                type: 'alert',
                buttonText,
            })
        })
    },
    confirm: (msg, onConfirm, onCancel, confirmText, cancelText) => {
        getPromptInst().then(() => {
            promptInst.add({
                msg,
                onConfirm,
                onCancel,
                type: 'confirm',
                confirmText,
                cancelText,
            })
        })
    },
};


export default prompt;
