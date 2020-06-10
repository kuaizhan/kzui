import * as React from 'react'
import { KZUIComponent } from './base/index'

interface OperationDialogProps extends KZUIComponent {
  hide?: boolean
  title?: string | React.ReactNode
  onConfirm?: () => void,
  onCancel?: () => void
  center?: boolean
  destoryOnClose?: boolean
  portal?: boolean
  actions?: Array<React.ReactNode>
}

export declare class OperationDialog extends React.Component<OperationDialogProps> {}
