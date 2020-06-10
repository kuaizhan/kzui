import * as React from 'react'
import { KZUIComponent, UiSizeType } from './base/index'

interface SearchProps extends KZUIComponent {
  size?: UiSizeType //按钮尺寸,
  disabled?: boolean //是否禁用输入,
  error?: boolean //是否输入验证出错,
  name?: string //表单输入项名,
  value?: string //初始值,
  placeholder?: string //输入默认显示,
  hasMore?: boolean //是否下拉加载更多
  onChange?: (e: {name: string, value: string}) => void //回调函数第一个参数为一个包含 name, value属性的对象
  onSearch?: (e: {name: string, value: string}) => void //回调函数第一个参数为一个包含 name, value属性的对象
}

export declare class Search extends React.Component<SearchProps> {}
