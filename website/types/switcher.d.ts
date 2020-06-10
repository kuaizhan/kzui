import * as React from 'react'
import { KZUIComponent } from './base/index'

interface SwitcherProps extends KZUIComponent {
  titles: string[],
  curIndex: number,
  onChange: (index: number) => void,
  style: React.CSSProperties,
  className: string,
  itemStyle: React.CSSProperties,
  itemClassName: string,
}


export declare class Switcher extends React.Component<SwitcherProps> {}

