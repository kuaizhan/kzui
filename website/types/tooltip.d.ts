import * as React from 'react'
import { KZUIComponent } from './base/index'

export declare class TooltipProps extends KZUIComponent {
  trigger?: 'hover' | 'click'
  tip?: React.ReactNode
  tipStyle?: React.CSSProperties
  placement?: 'left' | 'right' | 'top' | 'bottom'
}

export declare class Tooltip extends React.Component<TooltipProps> {}
