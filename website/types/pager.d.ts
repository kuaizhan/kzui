import * as React from 'react'
import { KZUIComponent } from './base'
export interface PagerProps extends KZUIComponent {
  totalPage: number //总页数,
  curPage: number //当前页面，页面从 1 开始
  onPageChange?: (value: number) => void //页码改变事件
}

export declare class Pager extends React.Component<PagerProps> {}
