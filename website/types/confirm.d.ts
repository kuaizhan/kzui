import * as React from 'react'
import { KZUIComponent } from './base/index'
interface ConfirmProps extends KZUIComponent {
  hide?: boolean //是否隐藏,
  confirmText?: string //确认按钮文案,
  cancelText?: string //取消按钮文案
  onConfirm?: () => void //确认按钮回调,
  onCancel?: () => void //取消按钮回调
}

export declare class Confirm extends React.Component<ConfirmProps> {}

