import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Notice, { NoticeProps } from '../notice';
import './style.less';

interface NoticeItemProps extends NoticeProps {
  key: number
}

interface NotificationStates {
  notices: NoticeItemProps[]
}

class Notification extends KZUIComponent<{}, NotificationStates> {
    keyIndex: number;

    static defaultProps = {
        ...baseDefaultProps,
        children: null,
        className: '',
        style: {},
    }

    constructor(props) {
        super(props);

        this.state = {
            notices: [],
        };
        this.autoBind('add', 'remove');
        this.keyIndex = 0;
    }

    add(noticeOption) {
        const notice = {
            ...noticeOption,
            key: this.keyIndex += 1,
        };

        this.setState({
            notices: [...this.state.notices, notice],
        });
    }

    remove(notice) {
        const newNotices = [];
        this.state.notices.forEach((cur) => {
            if (cur.key !== notice.key) {
                newNotices.push(cur);
            }
        });

        this.setState({
            notices: newNotices,
        });
    }

    render() {
        const clsPrefix = 'kui-notification';
        const { className, style } = this.props;
        const cls = classNames(clsPrefix, className);
        const { notices } = this.state;
        const noticeNodes = notices.map(notice => (
            <Notice
                key={notice.key}
                onClose={() => { this.remove(notice); }}
                content={notice.content}
                type={notice.type}
                duration={notice.duration}
            />
        ));

        return (
            <div className={cls} style={style}>
                { noticeNodes }
            </div>
        );
    }
}

export default Notification;
