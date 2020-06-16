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
    return new Promise((resolve) => {
        if (!notificationInst) {
            const div = document.createElement('div');
            document.body.appendChild(div);
    
            // render will be async
            render(
                <NotificationContainer ref={el => {
                    notificationInst = el
                    resolve()
                }} />, 
                div
            );    
        } else {
            resolve()
        }
    })
};

const notification: Notification = {
    success: (config, duration) => {
        getNotificationInst().then(() => {
            notificationInst.add({
                content: typeof config === 'string' ? config : config.content,
                duration: typeof config === 'object' ? config.duration : duration,
                type: 'success',
            });
        });
    },
    warn: (config, duration) => {
        getNotificationInst().then(() => {
            notificationInst.add({
                content: typeof config === 'string' ? config : config.content,
                duration: typeof config === 'object' ? config.duration : duration,
                type: 'warn',
            });
        });
    },
    error: (config, duration) => {
        getNotificationInst().then(() => {
            notificationInst.add({
                content: typeof config === 'string' ? config : config.content,
                duration: typeof config === 'object' ? config.duration : duration,
                type: 'error',
            });
        });
    },
};


export default notification;
