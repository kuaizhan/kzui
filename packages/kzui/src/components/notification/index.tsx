import * as React from 'react';
import { render } from 'react-dom';
import NotificationContainer from './notificationContainer';
import './style.less';

type Notification = {
  success: (
      config: {content: string, duration?: number} | string,
      duration?: number
   ) => void,
  warn:  (
      config: {content: string, duration?: number} | string,
      duration?: number
   ) => void,
  error:  (
      config: {content: string, duration?: number} | string,
      duration?: number
   ) => void,
}

let notificationInst = null;

const getNotificationInst = () => {
    if (!notificationInst) {
        const div = document.createElement('div');
        document.body.appendChild(div);
        notificationInst = render(<NotificationContainer />, div);
    }

    return notificationInst;
};

const notification: Notification = {
    success: (config, duration) => {
        const inst = getNotificationInst();

        inst.add({
            content: typeof config === 'string' ? config : config.content,
            duration: typeof config === 'object' ? config.duration : duration,
            type: 'success',
        });
    },
    warn: (config, duration) => {
        const inst = getNotificationInst();
        inst.add({
            content: typeof config === 'string' ? config : config.content,
            duration: typeof config === 'object' ? config.duration : duration,
            type: 'warn',
        });
    },
    error: (config, duration) => {
        const inst = getNotificationInst();
        inst.add({
            content: typeof config === 'string' ? config : config.content,
            duration: typeof config === 'object' ? config.duration : duration,
            type: 'error',
        });
    },
};


export default notification;
