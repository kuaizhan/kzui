import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import Icon from '../icon';
import TimePanel from './TimePanel';
import './style.less';

const paddingZero = number => (number < 10 ? `0${number}` : `${number}`);

interface TimePickerProps {
    name?: string,
    value?: {
        hour: number,
        minute: number,
        second: number,
    }
    onChange?: (Props: { name: TimePickerProps['name'], value: TimePickerProps['value'] }) => void, 
    size?: string,
    disabled?: boolean
    error?: boolean
}

class TimePicker extends KZUIComponent<TimePickerProps, {
  hide: boolean,
  hour: number,
  minute: number,
  second: number
}> {
    static defaultProps = {
        ...baseDefaultProps,
        size: 'normal',
        name: '',
        value: {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds(),
        },
        onChange: null,
    };

    constructor(props: TimePickerProps) {
        super(props);
        this.autoBind('handleClick', 'handleTimeSelect', 'handleClose');
    }

    initStateFromProps(props) {
        const date = props.value;
        return {
            hide: true,
            hour: date.hour,
            minute: date.minute,
            second: date.second,
        };
    }

    handleClick() {
        this.setState({
            hide: !this.state.hide,
        });
    }

    handleTimeSelect(time) {
        this.setState(time, () => {
            if (this.props.onChange) {
                const { hour, minute, second } = this.state;
                this.props.onChange({
                    name: this.props.name,
                    value: { hour, minute, second },
                });
            }
        });
    }

    handleClose() {
        this.setState({
            hide: true,
        });
    }

    render() {
        const clsPrefix = 'kui-time-picker';
        const { className, style, size, disabled, error } = this.props;
        const { hide, minute, hour, second } = this.state;
        const cls = classNames(clsPrefix, className, {
            [`${clsPrefix}-${size}`]: true,
            [`${clsPrefix}-error`]: error,
            [`${clsPrefix}-disabled`]: disabled,
        });
        const time = [paddingZero(hour), paddingZero(minute), paddingZero(second)].join(':');

        return (
            <div className={cls} style={style}>
                <div className={`${clsPrefix}-time-display`} onClick={this.handleClick}>
                    <input type="text" name=""value={time} readOnly />
                    <Icon type="time" />
                </div>
                <div className={`${clsPrefix}-time-popover`} style={{ display: hide ? 'none' : 'block' }}>
                    <TimePanel
                        hour={this.state.hour}
                        minute={this.state.minute}
                        second={this.state.second}
                        onChange={this.handleTimeSelect}
                        onClose={this.handleClose}
                    />
                </div>
            </div>
        );
    }
}


export default TimePicker;
