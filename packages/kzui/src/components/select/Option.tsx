import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import { OptionType, valueType } from '../../../types/base/index';

interface OptionProps extends Partial<OptionType> {
  onClick?: ({ value, text }: { value: valueType, text: string | React.ReactNode }) => void
}

class Option extends KZUIComponent<OptionProps> {

    static defaultProps = {
      ...baseDefaultProps,
      selected: false,
      disable: false,
      value: null,
      style: {},
      isLabel: false,
      isSubOption: false,
      isMultiple: false
    }

    constructor(props: OptionProps) {
        super(props);
        this.state = {
            selected: this.props.selected,
        };
        this.autoBind('handleClick');
    }

    handleClick() {
        if (this.props.disabled) {
            return
        }
        if (this.props.onClick) {
            this.props.onClick({ value: this.props.value, text: this.props.children });
        }
    }

    render() {
        const clsPrefix = 'kui-select-option';
        const { className, style } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-selected`]: this.props.selected,
            [`${clsPrefix}-disabled`]: this.props.disabled,
            [`${clsPrefix}-labeled`]: this.props.isLabel,
            [`${clsPrefix}-suboption`]: this.props.isSubOption,
            [`${clsPrefix}--multi`]: this.props.isMultiple,
        }, className);
        return (
            <div style={style} className={cls} onClick={this.handleClick} role="button" tabIndex={0}>
                {this.props.children}
            </div>
        );
    }
}

export default Option;
