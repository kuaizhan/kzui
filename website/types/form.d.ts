import * as React from 'react'
import { KZUIComponent } from './base/index'
interface FormProps extends KZUIComponent {
  children?: React.ReactNode //表单行节点
}

interface FormRowProps extends KZUIComponent {
    children?: React.ReactNode //表单行节点
    label?: string | React.ReactNode // 表单行label	
    labelStyle?: React.CSSProperties,
    isRequired?: boolean
}

export declare class Form extends React.Component<FormProps> {}
export declare class FormRow extends React.Component<FormRowProps> {}
