import * as React from 'react'
import { KZUIComponent } from './base/index'

interface NoticeProps extends KZUIComponent {
    type: 'success' | 'warn' | 'error' //提示类型
    content?: string // 提示语
    duration?: number // 展示时长，单位为秒
    onClose?: () => void // duration 时间到后回调，主要用来让提示消失
}

export declare class Notice extends React.Component<NoticeProps> {}
