import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import { UiSizeType } from '../../../types/base';
import './style.less';

interface InputProps {
  type?: 'text' | 'password' //输入类型,
  size?: UiSizeType //按钮尺寸,
  disabled?: boolean //是否禁用输入,
  error?: boolean //是否输入验证出错,
  name?: string //表单输入项名,
  value?: string //初始值,
  placeholder?: string //输入默认显示
  onChange?: (e: { value: string, name?: string }) => void
  uncontroled?: boolean
  onKeyPress?: (e: any, value: string) => void
  onBlur?: (e: { value: string, name?: string }) => void
}

class Input extends KZUIComponent<InputProps, {
  value?: string,
}> {
    textInput: any;
    static defaultProps = {
        ...baseDefaultProps,
        type: 'text',
        size: 'normal',
        disabled: false,
        error: false,
        name: '',
        placeholder: '',
        uncontroled: false,
        value: '',
        onBlur: null,
        onChange: null,
        onKeyPress: null,
        style: {},
    }
  
    constructor(props) {
        super(props);
        this.autoBind('handleChange', 'handleKeyPress', 'handleBlur', 'toFocus');

        if (props.uncontroled) {
            this.state = {
                value: props.value,
            };
        }
    }

    toFocus() {
        this.textInput.focus();
    }

    initStateFromProps(props) {
        if (props.uncontroled) return undefined;

        return {
            value: props.value,
        };
    }

    handleBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur({ value: event.target.value, name: this.props.name });
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
        if (this.props.onChange) {
            this.props.onChange({ value: event.target.value, name: this.props.name });
        }
    }

    handleKeyPress(event) {
        if (this.props.onKeyPress) {
            this.props.onKeyPress(event, this.state.value);
        }
    }
    render() {
        const clsPrefix = 'kui-input';
        const {
            type,
            disabled,
            placeholder,
            error,
            name,
            className,
            style,
        } = this.props;
        const cls = classNames({
            [clsPrefix]: true,
            [`${clsPrefix}-disabled`]: !!disabled,
            [`${clsPrefix}-error`]: !!error,
            [`${clsPrefix}-${this.props.size}`]: true,
        }, className);

        return (
            <input
                className={cls}
                type={type}
                name={name}
                value={this.state.value}
                placeholder={placeholder}
                disabled={disabled}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}
                ref={(input) => { this.textInput = input; }}
                style={style}
            />
        );
    }
}

export default Input;
