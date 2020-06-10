import * as React from 'react'
import { KZUIComponent } from './base/index'

interface RowProps extends KZUIComponent {
  gutter?: number // 两个栅格之间的间距 //Number
}

interface ColProps extends KZUIComponent {
  span?: number // 栅格占位数目，范围0~12 0->display:none,
  offset?: number // 栅格与左侧间隔的数目,
}

export declare class Row extends React.Component<RowProps> {}
export declare class Col extends React.Component<ColProps> {}
