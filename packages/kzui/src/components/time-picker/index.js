import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent from '../base/index';
import Icon from '../icon/index.tsx';
import TimePanel from './TimePanel';
import './style.less';

const paddingZero = number => (number < 10 ? `0${number}` : `${number}`);

class TimePicker extends KZUIComponent {
    constructor(props) {
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

TimePicker.propTypes = {
    name: PropTypes.string,
    value: PropTypes.shape({
        hour: PropTypes.number,
        minute: PropTypes.number,
        second: PropTypes.number,
    }),
    onChange: PropTypes.func,
    size: PropTypes.string,
};

TimePicker.defaultProps = {
    size: 'normal',
    name: '',
    value: {
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds(),
    },
    onChange: null,
};

export default TimePicker;
