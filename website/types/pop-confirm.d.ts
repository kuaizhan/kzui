import * as React from 'react'
import { KZUIComponent } from './base'

interface PopConfirmProps extends KZUIComponent {
  status?: 'normal' | 'loading' //确认按钮状态
  onConfirm?: () => void //确认回调,
  onCancel?: () => void //取消回调,
  onBlur?: () => void //失焦回调
  title?: React.ReactNode | string
  placement?: 'left' | 'right' | 'top' | 'bottom'
}

export declare class PopConfirm extends React.Component<PopConfirmProps> {}
