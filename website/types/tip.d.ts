import * as React from 'react'
import { KZUIComponent, TipType } from './base/index'

export declare class TipProps<T = string> extends KZUIComponent {
  type?: TipType
  hideIcon?: boolean
}

export declare class Tip<T = string> extends React.Component<TipProps<T>> {}
