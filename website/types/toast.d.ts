import * as React from 'react'
import { KZUIComponent } from './base/index'

export declare class ToastProps extends KZUIComponent {
    hide?: boolean
    onHide?: () => void
}

export declare class Toast extends React.Component<ToastProps> { }
