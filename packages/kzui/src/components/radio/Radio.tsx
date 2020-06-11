import * as React from 'react'
import classNames from 'classnames'
import KZUIComponent, { baseDefaultProps } from '../base/component'
import './style.less'
import { valueType } from '../../../types/base'

export interface RadioProps<T = valueType> {
  disabled?: boolean
  name?: string
  checked?: boolean
  onClick?: (arg: RadioProps) => void
  type?: 'radio' | 'button'
  value?: T
}

// TODO Radio 应该单独写一个文件，Radio定义的props与下面RadioGroup使用有冲突
export class Radio extends KZUIComponent<RadioProps> {
  static defaultProps = {
    ...baseDefaultProps,
    disabled: false,
    name: '',
    checked: false,
    type: 'radio'
  }
  constructor (props) {
    super(props)
    this.autoBind('handleClick')
  }

  handleClick () {
    if (this.props.onClick) {
      this.props.onClick(this.props)
    }
  }

  render () {
    const clsPrefix = 'kui-radio'
    const { className, style, children, checked, disabled, type } = this.props
    const cls = classNames(
      clsPrefix,
      {
        [`${clsPrefix}-checked`]: type === 'radio' && checked,
        [`${clsPrefix}-disabled`]: disabled,
        [`${clsPrefix}-btn`]: type === 'button',
        [`${clsPrefix}-btn--checked`]: type === 'button' && checked
      },
      className
    )

    return (
      <div
        className={cls}
        onClick={this.handleClick}
        style={style}
        role='button'
        tabIndex={0}
      >
        {type === 'radio' && <span className={`${clsPrefix}-indicator`} />}
        <span>{children}</span>
      </div>
    )
  }
}
