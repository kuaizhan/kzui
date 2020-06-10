import * as React from 'react'
import { KZUIComponent } from './base/index'

interface DialogProps extends KZUIComponent {
  hide?: boolean //是否隐藏,
  actions?: Array<React.ReactNode | React.ReactElement> //传入下方操作按钮,
  title?: string  | React.ReactNode //对话框标题,
  portal?: boolean //是否使用react16 portal
  onClose?: () => void // 关闭回调
  center?: boolean
  destoryOnClose?: boolean
  bodyStyle?: React.CSSProperties
}

export declare class Dialog extends React.Component<DialogProps> {}
