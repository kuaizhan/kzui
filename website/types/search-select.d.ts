import * as React from 'react'
import { KZUIComponent, UiSizeType, OptionListType } from './base/index'

interface onChangeArg {
  name: string
  value: string
  selectedText: string
  text: string
}

interface onSearchArg {
  name: "search-text"
  value: string
}

interface SearchSelectProps extends KZUIComponent {
  defaultText?: string //默认显示文案,
  emptyWarning?: string //搜索结果为空的提示文案,
  name?: string //表单项名,
  value?: string //当前值,
  size?: UiSizeType //大小,
  options?: OptionListType //可选项,
  disabled?: boolean //是否禁用
  onChange?: (e: onChangeArg) => void
  onSearch?: (e: onSearchArg) => void
  onExpand?: () => void
}

export declare class SearchSelect extends React.Component<SearchSelectProps> {}
