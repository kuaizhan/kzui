import * as React from 'react'
import { KZUIComponent, UiSizeType } from './base/index'

interface InputProps extends KZUIComponent {
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

export declare class Input extends React.Component<InputProps> {}

