import * as React from 'react'
import { KZUIComponent, UiSizeType, OptionListType } from './base/index'

interface onChangeArg {
  name: string
  value: string
  selectedText: string
  text: string
}

interface SelectProps extends KZUIComponent {
  defaultText?: string //默认显示文案,
  name?: string //表单项名,
  value?: string //当前值,
  size?: UiSizeType //大小,
  options?: OptionListType //可选项,
  disabled?: boolean //是否禁用
  onChange?: (e: onChangeArg) => void
  onExpand?: () => void
  maxHeight?: number,
  hasMore?: boolean,
  onLoadMore?: () => void,
  popoverCls?: string,
  popoverStyle?: React.CSSProperties,
}

export declare class Select extends React.Component<SelectProps> {}
