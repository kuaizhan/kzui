import * as React from 'react';
import classNames from 'classnames';
import KZUIComponent, { baseDefaultProps } from '../base/component';
import { UiSizeType } from '../../../types/base';

import './style.less';

interface CheckboxProps {
  disabled?: boolean //是否被禁用,
  name?: string //表单项名,
  checked?: boolean //是否选中,
  partialChecked?: boolean //是否部分选择,
  size?: UiSizeType //大小
  uncontroled?: boolean // 是否非受控
  onChange?:  ({ name: string, checked:boolean }) => void  //值改变事件
}

class Checkbox extends KZUIComponent<CheckboxProps, {
  checked: boolean,
  partialChecked: boolean,
}> {

    static defaultProps = {
      ...baseDefaultProps,
      size: 'normal',
      disabled: false,
      name: '',
      checked: false,
      uncontroled: false,
      partialChecked: false,
      onChange: null,
    }

    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }
    initStateFromProps(props) {
        return {
            checked: props.checked,
            partialChecked: props.partialChecked,
        };
    }

    handleClick() {
        
        if (this.props.disabled) {
            return;
        }
        if (!this.props.uncontroled) {
            const { checked, name } = this.props;
            this.props.onChange && this.props.onChange({
                checked: !checked,
                name,
            })
            return
        }
        const checked = !this.state.checked;
        this.setState({
            checked,
            partialChecked: false,
        });
        if (this.props.onChange) {
            this.props.onChange({
                checked,
                name: this.props.name,
            });
        }
    }

    render() {
        const clsPrefix = 'kui-checkbox';
        const { className, style, disabled, children, uncontroled, checked } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-checked`]: uncontroled? this.state.checked : checked,
            [`${clsPrefix}-disabled`]: disabled,
            [`${clsPrefix}-partial-checked`]: this.state.partialChecked,
        }, className);

        return (
            <div
                className={cls}
                style={style}
                onClick={this.handleClick}
                role="button"
                tabIndex={0}
            >
                <span className={`${clsPrefix}-indicator`} />
                <span className={`${clsPrefix}-label`}>{children}</span>
            </div>
        );
    }
}

export default Checkbox;
