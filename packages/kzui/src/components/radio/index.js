import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KZUIComponent from '../base/index';
import { optionListType, valueType } from '../base/types';
import './style.less';

// TODO Radio 应该单独写一个文件，Radio定义的props与下面RadioGroup使用有冲突
export class Radio extends KZUIComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props);
        }
    }

    render() {
        const clsPrefix = 'kui-radio';
        const { className, style, children, checked, disabled, type } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-checked`]: type === 'radio' && checked,
            [`${clsPrefix}-disabled`]: disabled,
            [`${clsPrefix}-btn`]: type === 'button',
            [`${clsPrefix}-btn--checked`]: type === 'button' && checked,
        }, className);

        return (
            <div
                className={cls}
                disabled={disabled}
                onClick={this.handleClick}
                style={style}
                role="button"
                tabIndex={0}
            >
                { type === 'radio' && <span className={`${clsPrefix}-indicator`} /> }
                <span>{children}</span>
            </div>
        );
    }
}

Radio.defaultProps = {
    disabled: false,
    name: '',
    checked: false,
    type: 'radio',
};

Radio.propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    checked: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'radio']),
};

// 完全受控
class RadioGroup extends KZUIComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }

    handleClick({ value }) {
        if (this.props.disabled) {
            return;
        }
        if (this.props.onChange) {
            this.props.onChange({ value, name: this.props.name });
        }
    }

    render() {
        const clsPrefix = 'kui-radio-group';
        const { className, style, disabled, layout, options, type, radioStyle } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-disabled`]: disabled,
            [`${clsPrefix}-${layout}`]: true,
        }, className);

        return (
            <div className={cls} style={style}>
                {options.map(
                    option => (
                        <Radio
                            key={`radio-${option.value}`}
                            value={option.value}
                            onClick={this.handleClick}
                            checked={option.value === this.props.value}
                            type={type}
                            style={radioStyle}
                            className={option.className}
                        >
                            {option.text}
                        </Radio>
                    ),
                )}
            </div>
        );
    }
}

RadioGroup.defaultProps = {
    disabled: false,
    name: '',
    value: null,
    options: [],
    onChange: null,
    layout: 'vertical',
    type: 'radio',
    radioStyle: {},
};

RadioGroup.propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    value: valueType,
    options: optionListType,
    onChange: PropTypes.func,
    layout: PropTypes.oneOf(['vertical', 'horizontal']),
    type: PropTypes.oneOf(['radio', 'button']),
    radioStyle: PropTypes.shape({}),
};

export default RadioGroup;
