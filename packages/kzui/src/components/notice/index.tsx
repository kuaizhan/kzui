import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Icon from '../icon/index';
import './style.less';

export interface NoticeProps {
  type: 'success' | 'warn' | 'error' //提示类型
  content?: string // 提示语
  duration?: number // 展示时长，单位为秒
  onClose?: () => void // duration 时间到后回调，主要用来让提示消失
}


const getIconClass = (type) => {
    if (type === 'success') {
        return 'kz-e-check--new--1';
    } else if (type === 'warn') {
        return 'kz-e-warn2';
    } else if (type === 'error') {
        return 'kz-e-close-3';
    }
};

class Notice extends KZUIComponent<NoticeProps> {
    timer: any;
    duration: number;

    static defaultProps = { 
      ...baseDefaultProps,
      duration: 2,
      children: null,
      className: '',
      content: '',
      onClose: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            hide: false,
        };
        this.timer = null;
        this.duration = 2;
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.onClose();
            clearTimeout(this.timer);
        }, this.props.duration * 1000);
    }

    render() {
        const clsPrefix = 'kui-notice';
        const { className, style, content, type } = this.props;
        const cls = classNames(clsPrefix, `${clsPrefix}-${type}`, className);
        const iconCls = getIconClass(type);
        return (
            <div className={cls} style={style}>
                <div className={`${clsPrefix}-content`}>
                    <Icon className={`${iconCls} ${clsPrefix}-icon`} />
                    <span>{content}</span>
                </div>
            </div>
        );
    }
}

export default Notice;
