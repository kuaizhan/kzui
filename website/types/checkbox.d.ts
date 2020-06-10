import * as React from 'react'
import { KZUIComponent } from './base/index'

interface CheckboxProps extends KZUIComponent {
  disabled?: boolean //是否被禁用,
  name?: string //表单项名,
  checked?: boolean //是否选中,
  partialChecked?: boolean //是否部分选择,
  size?: 'normal' | 'small' | 'large' //大小
  onChange?:  ({ name: string, checked:boolean }) => void  //值改变事件
}

export declare class Checkbox extends React.Component<CheckboxProps> {}
