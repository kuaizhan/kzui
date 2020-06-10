import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent from '../base/index';
import PopTip from '../_poptip/index.tsx';
import Icon from '../icon/index';
import DatePanel from './DatePanel';
import './style.less';

const format = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].join('-');
};

class DatePicker extends KZUIComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleDateSelect', 'handleBlur');
    }

    initStateFromProps(props) {
        return {
            expand: false,
            value: props.value,
        };
    }

    handleBlur(e) {
        if (e.relatedTarget && this.date_picker.contains(e.relatedTarget)) {
            e.preventDefault();
            return;
        }
        this.setState({
            expand: false,
            ...this.state,
        });
    }

    handleDateSelect(value) {
        this.setState({
            expand: false,
            value,
        });
        if (this.props.onChange) {
            this.props.onChange({ name: this.props.name, value });
        }
    }

    render() {
        const clsPrefix = 'kui-date-picker';
        const { className, style, error, disabled, minDate, maxDate } = this.props;
        const { expand } = this.state;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-error`]: error,
            [`${clsPrefix}-disabled`]: disabled,
        }, className);

        return (
            <div
                className={cls}
                style={style}
                onBlur={this.handleBlur}
                ref={this.storeRef('date_picker')}
            >
                <PopTip
                    isPopover
                    theme="light"
                    trigger="click"
                    className={`${clsPrefix}-date-popover`}
                    style={{ width: 'auto', zIndex: '999999' }}
                    visible={expand}
                    onVisibleChange={visible => this.setState({ expand: visible })}
                    tip={
                        <DatePanel
                            value={this.state.value}
                            onChange={this.handleDateSelect}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    }
                >
                    <div className={`${clsPrefix}-date-display`}>
                        <input type="text" name="" value={format(this.state.value)} readOnly />
                        <Icon type="calendar" />
                    </div>
                </PopTip>
            </div>
        );
    }
}

DatePicker.defaultProps = {
    value: new Date().getTime(),
    name: '',
    minDate: '1970-1-1',
    maxDate: '2117-12-31',
};

DatePicker.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
};

export default DatePicker;
