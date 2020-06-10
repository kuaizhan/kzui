import * as React from 'react'
import { KZUIComponent } from './base/index'

interface AlertProps extends KZUIComponent {
  hide?: boolean //是否隐藏,
  buttonText?: string //显示内容,
  onClick?: () => void //点击回调
}

export declare class Alert extends React.Component<AlertProps> {}

