import * as React from 'react'
import classNames from 'classnames'
import KZUIComponent, { baseDefaultProps } from '../base/component'
import Icon from '../icon'
import './style.less'
import { UiSizeType } from '../../../types/base'
import notification  from '../notification/index';

interface NumberInputProps {
  size: UiSizeType
  disabled: boolean
  error: boolean
  name: string
  value: number
  step: number
  min: number
  max: number
  onChange: (props: { value: number; name?: string }) => void
  onBlur?: (e: Event) => void
  placeholder?: string
}

class NumberInput extends KZUIComponent<
  NumberInputProps,
  {
    value: number
  }
> {
  static defaultProps = {
    ...baseDefaultProps,
    size: 'normal',
    disabled: false,
    error: false,
    name: '',
    value: 0,
    step: 1,
    min: 0,
    max: 100,
    onChange: null,
    placeholder: ''
  }
  constructor (props) {
    super(props)
    this.autoBind('onIncrease', 'onDecrease', 'setValue', 'handleInput', 'handleBlur')
  }

  initStateFromProps (props) {
    const { value } = props
        if (typeof value == 'undefined') {
            return {
                value
            }
        }
        if (typeof value !== 'undefined' && isNaN(value) && value !== 0) {
            notification.error('请输入数字')
            return {
                value: undefined,
            };
        }

    return {
      value: Number(value),
    }
  }

  setValue (value) {
    const { min, max } = this.props;
    if (typeof value !== 'undefined' && isNaN(value) && value !== 0) {
        notification.error('请输入数字')
        this.setState({
            value: null,
        });
        if (this.props.onChange) {
            this.props.onChange({ value: null, name: this.props.name });
        }
        return 
    }

    if ((min && value >= this.props.min) || (max && value <= this.props.max)) {
      this.setState({
        value
      })
      if (this.props.onChange) {
        this.props.onChange({ value: Number(value), name: this.props.name })
      }
    }
  }

  onIncrease (e) {
    e.stopPropagation()
    this.setValue(this.state.value + this.props.step)
  }

  onDecrease (e) {
    e.stopPropagation()
    this.setValue(this.state.value - this.props.step)
  }

  handleInput(e) {
      this.setValue(e.target.value)
  }

  handleBlur(e) {
      this.props.onBlur?.(e)
  }

  render () {
    const clsPrefix = 'kui-number-input'
    const {
      className,
      style,
      disabled,
      error,
      size,
      name,
      min,
      max,
      step,
      onBlur,
      placeholder
    } = this.props
    const cls = classNames(clsPrefix, className, {
      [`${clsPrefix}-error`]: error,
      [`${clsPrefix}-disabled`]: disabled,
      [`${clsPrefix}-${size}`]: true
    })

    const noIncrease = (typeof max === 'number') ? Number(this.state.value) + step > Number(max) : false;
    const noDecrease = (typeof min === 'number') ? Number(this.state.value) - step < Number(min) : false;
    const noIncreaseCls = noIncrease ? `${clsPrefix}-disabled` : ''
    const noDecreaseCls = noDecrease ? `${clsPrefix}-disabled` : ''
    console.log(noDecrease, min)
    return (
      <div
        className={cls}
        style={style}
        // disabled={disabled}
      >
        <input
          type='text'
          name={name}
          value={this.state.value}
          disabled={disabled}
          placeholder={placeholder}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
        />
        <div className={`${clsPrefix}-controls`}>
          <div
            className={`${clsPrefix}-increase ${noIncreaseCls}`}
            onClick={this.onIncrease}
            role='button'
            tabIndex={0}
          >
            <Icon type='drop-up' />
          </div>
          <div
            className={`${clsPrefix}-decrease ${noDecreaseCls}`}
            onClick={this.onDecrease}
            role='button'
            tabIndex={0}
          >
            <Icon type='drop-down' />
          </div>
        </div>
      </div>
    )
  }
}

export default NumberInput
