import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import './style.less';
import { OptionListType, valueType } from '../../../types/base';
import { Radio, RadioProps } from './Radio';

interface RadioGroupProps<T = valueType> {
  disabled?: boolean
  name?: string
  value?: T
  options: OptionListType
  onChange?: (value: { value: T, name: string}) => void
  layout?: 'vertical' | 'horizontal'
  type?: 'radio' | 'button'
  radioStyle?: React.CSSProperties
}

// 完全受控
class RadioGroup extends KZUIComponent<RadioGroupProps> {
    
    static defaultProps = {
        ...baseDefaultProps,
        disabled: false,
        name: '',
        value: null,
        options: [],
        onChange: null,
        layout: 'vertical',
        type: 'radio',
        radioStyle: {},
    }

    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }

    handleClick({ value }: RadioProps) {
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

export default RadioGroup;

export { Radio }
