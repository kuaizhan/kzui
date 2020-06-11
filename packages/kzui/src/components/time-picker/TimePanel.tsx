import * as React from 'react';
// import classNames from 'classnames';
import Icon from '../icon';
import KZUIComponent from '../base/component';

const animateScrollTop = (element, value, duration) => {
    const targetDom = element;
    const createTime = () => (new Date().getTime());

    const startPosition = element.scrollTop;
    const endPosition = parseInt(value, 10) * 28;
    const offset = endPosition - startPosition;
    const startTime = createTime();

    let timerId = setInterval(() => {
        const remaining = Math.max(0, (startTime + duration) - createTime());
        const percent = 1 - (remaining / duration || 0);
        const now = (offset * percent) + startPosition;
        targetDom.scrollTop = now;
        if (percent === 1) {
            clearInterval(timerId);
            timerId = null;
        }
    }, 16);
};

const paddingZero = number => (number < 10 ? `0${number}` : `${number}`);

interface TimePanelProps {
    hour: number,
    minute: number,
    second: number,
    onChange: (value: { hour: number } | { minute: number } | { second: number }) => void,
    onClose: () => void,
}

class TimePanel extends KZUIComponent<TimePanelProps, {
    hour: number,
    minute: number,
    second: number,
}> {
    hours: number[];
    minutes: number[];
    seconds: number[];
    hourParent: HTMLElement;
    minuteParent: HTMLElement;
    secondParent: HTMLElement;

    constructor(props: TimePanelProps) {
        super(props);
        this.autoBind('handleClose', 'handleHourClick', 'handleMinuteClick', 'handleSecondClick');

        this.hours = [];
        for (let i = 0; i < 24; i += 1) {
            this.hours.push(i);
        }
        this.minutes = [];
        for (let i = 0; i < 60; i += 1) {
            this.minutes.push(i);
        }
        this.seconds = this.minutes.slice();
    }

    initStateFromProps(props) {
        return {
            hour: props.hour,
            minute: props.minute,
            second: props.second,
        };
    }

    componentDidUpdate() {
        animateScrollTop(this.hourParent, this.state.hour, 200);
        animateScrollTop(this.minuteParent, this.state.minute, 200);
        animateScrollTop(this.secondParent, this.state.second, 200);
    }

    handleClose() {
        this.props.onClose?.();
    }

    handleHourClick(value: number) {
        this.setState({
            hour: value,
        });
        this.props.onChange?.({ hour: value });
    }

    handleMinuteClick(value: number) {
        this.setState({
            minute: value,
        });
        this.props.onChange?.({ minute: value });
    }

    handleSecondClick(value: number) {
        this.setState({
            second: value,
        });
        this.props.onChange?.({ second: value });
    }

    render() {
        const clsPrefix = 'kui-time-picker';
        return (
            <div className={`${clsPrefix}-time-panel`}>
                <div className={`${clsPrefix}-panel-header`}>
                    <span className={`${clsPrefix}-panel-header-title`}>选择时间</span>
                    <Icon type="close-new" onClick={this.handleClose} />
                </div>
                <div className={`${clsPrefix}-panel-body`}>
                    <div className={`${clsPrefix}-panel-body-item`} ref={(c) => { this.hourParent = c; }}>
                        <div className={`${clsPrefix}-item-container`}>
                            {this.hours.map(item => (
                                <PickItem
                                    key={`hour-${item}`}
                                    onClick={this.handleHourClick}
                                    value={item}
                                    active={item === this.state.hour}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={`${clsPrefix}-panel-body-item`} ref={(c) => { this.minuteParent = c; }}>
                        <div className={`${clsPrefix}-item-container`}>
                            {this.minutes.map(item => (
                                <PickItem
                                    key={`minute-${item}`}
                                    onClick={this.handleMinuteClick}
                                    value={item}
                                    active={item === this.state.minute}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={`${clsPrefix}-panel-body-item`} ref={(c) => { this.secondParent = c; }}>
                        <div className={`${clsPrefix}-item-container`}>
                            {this.seconds.map(item => (
                                <PickItem
                                    key={`second-${item}`}
                                    onClick={this.handleSecondClick}
                                    value={item}
                                    active={item === this.state.second}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

interface PickItemProps {
  active: boolean,
  value: number,
  onClick: ( value: PickItemProps['value']) => void,
}

const PickItem: React.FC<PickItemProps> = ({ active, value, onClick }) => {
    const handleClick = () => {
        onClick(value);
    };
    if (active) {
        return <span className="active" onClick={handleClick}>{paddingZero(value)}</span>;
    }
    return <span onClick={handleClick}>{paddingZero(value)}</span>;
};

export default TimePanel;
