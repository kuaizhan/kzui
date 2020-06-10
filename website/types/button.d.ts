import * as React from 'react'
import { KZUIComponent } from './base/index'

interface ButtonProps extends KZUIComponent {
    type?: 'normal' | 'confirm' | 'danger' | 'dashed'  //按钮类型
    size?: 'normal' | 'small' | 'large' | 'huge' //按钮尺寸
    status?: 'normal' | 'loading' //按钮状态
    last?: boolean //是否为最后一个按钮, 用于清除多个按钮并排时最后一个margin
    disabled?: boolean //是否禁用
    onClick?: () => void //按钮点击事件
    loading?: boolean // 按钮的loading状态 是status的快捷用法
}

export declare class Button extends React.Component<ButtonProps> {}
