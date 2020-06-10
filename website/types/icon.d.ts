import * as React from 'react'
import { KZUIComponent } from './base/index'
import { IconTypes } from './base/icon-types'
interface IconProps extends KZUIComponent {
    iconClass?: string,
    onClick?: () => void,
    type?: IconTypes,
    title?: string,
}

export declare class Icon extends React.Component<IconProps> {}
